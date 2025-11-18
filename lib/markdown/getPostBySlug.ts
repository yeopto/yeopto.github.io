import { remark } from 'remark';
import remarkHtml from 'remark-html';
import type { PostPageItem } from '@/types/post.types';
import { getAllPosts } from './getAllPosts';

/**
 * slug로 특정 포스트 가져오기
 */
export async function getPostBySlug(slug: string): Promise<PostPageItem | null> {
	const posts = await getAllPosts();
	const post = posts.find((p) => p.slug === slug);
	if (!post) {
		return null;
	}

	// 마크다운을 HTML로 변환
	const processedContent = await remark()
		.use(remarkHtml, { sanitize: false })
		.process(post.content);

	let html = processedContent.toString();

	// 이미지 경로 수정: ../image/ -> /image/
	// 마크다운에서 상대 경로로 작성된 이미지를 절대 경로로 변환
	html = html.replace(/src="\.\.\/image\//g, 'src="/image/');

	return {
		...post,
		html,
	};
}
