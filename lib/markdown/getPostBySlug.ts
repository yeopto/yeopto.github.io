import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkPrism from 'remark-prism';
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
		.use(remarkPrism)
		.process(post.content);

	const html = processedContent.toString();

	return {
		...post,
		html,
	};
}
