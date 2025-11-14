import type { PostListItem } from '@/types/post.types';

/**
 * 모든 포스트에서 카테고리 목록 추출
 * @param posts 포스트 리스트
 * @returns 카테고리명과 포스트 개수를 담은 객체
 */
export function getAllCategories(posts: PostListItem[]): Record<string, number> {
	const categoryMap: Record<string, number> = {};

	posts.forEach((post) => {
		post.frontmatter.categories.forEach((category) => {
			if (categoryMap[category]) {
				categoryMap[category]++;
			} else {
				categoryMap[category] = 1;
			}
		});
	});

	return categoryMap;
}
