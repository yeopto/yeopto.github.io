import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post } from '@/types/post.types';

const contentsDirectory = path.join(process.cwd(), 'contents');

/**
 * 디렉토리에서 모든 마크다운 파일을 재귀적으로 찾기
 */
function getAllMarkdownFiles(dir: string, fileList: string[] = []): string[] {
	const files = fs.readdirSync(dir);

	files.forEach((file) => {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			getAllMarkdownFiles(filePath, fileList);
		} else if (file.endsWith('.md')) {
			fileList.push(filePath);
		}
	});

	return fileList;
}

/**
 * 파일 경로에서 slug 생성
 * 예: contents/JScontents/func_programming.md → JScontents/func_programming
 */
function getSlugFromPath(filePath: string): string {
	const relativePath = path.relative(contentsDirectory, filePath);
	const slug = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
	return slug;
}

/**
 * 모든 포스트 메타데이터 가져오기
 */
export async function getAllPosts(): Promise<Post[]> {
	const markdownFiles = getAllMarkdownFiles(contentsDirectory);

	const posts = markdownFiles
		.map((filePath) => {
			const fileContents = fs.readFileSync(filePath, 'utf-8');
			const { data, content } = matter(fileContents);
			const slug = getSlugFromPath(filePath);

			// thumbnail 경로 처리 (상대 경로를 절대 경로로 변환)
			let thumbnail = data.thumbnail || '';
			if (thumbnail && thumbnail.startsWith('../')) {
				// 상대 경로를 contents 기준으로 변환
				const fileDir = path.dirname(filePath);
				const relativePath = path.relative(contentsDirectory, fileDir);
				thumbnail = path
					.join('/contents', relativePath, thumbnail.replace('../', ''))
					.replace(/\\/g, '/');
			} else if (thumbnail && !thumbnail.startsWith('/')) {
				thumbnail = `/contents/${thumbnail}`;
			}

			return {
				slug,
				frontmatter: {
					title: data.title || '',
					date: data.date || '',
					categories: data.categories || [],
					summary: data.summary || '',
					thumbnail,
				},
				content,
			};
		})
		.filter((post) => post.frontmatter.title) // 제목이 있는 포스트만
		.sort((a, b) => {
			// 날짜 기준 내림차순 정렬
			const dateA = new Date(a.frontmatter.date).getTime();
			const dateB = new Date(b.frontmatter.date).getTime();
			if (dateB !== dateA) {
				return dateB - dateA;
			}
			// 날짜가 같으면 제목 기준 정렬
			return a.frontmatter.title.localeCompare(b.frontmatter.title);
		});

	return posts;
}
