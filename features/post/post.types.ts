/**
 * Post 관련 타입 정의
 */

export type PostFrontmatter = {
	title: string;
	date: string;
	categories: string[];
	summary: string;
	thumbnail: string; // 이미지 경로
};

export type Post = {
	slug: string;
	frontmatter: PostFrontmatter;
	content: string; // 마크다운 원문
	html?: string; // HTML로 변환된 내용
};

export type PostListItem = Post;

export type PostPageItem = Post & {
	html: string; // HTML로 변환된 내용 (필수)
};
