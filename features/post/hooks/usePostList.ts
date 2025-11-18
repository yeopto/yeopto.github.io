import { useState, useMemo } from 'react';
import type { PostListItem } from '@/features/post/post.types';

export interface UsePostListOptions {
	initialPosts: PostListItem[];
	categoryFilter?: string;
	searchQuery?: string;
}

/**
 * 포스트 리스트 훅
 * Client Component에서 포스트 필터링, 검색 등을 처리
 */
export function usePostList({ initialPosts, categoryFilter, searchQuery }: UsePostListOptions) {
	const [posts] = useState<PostListItem[]>(initialPosts);

	const filteredPosts = useMemo(() => {
		let result = [...posts];

		// 카테고리 필터링
		if (categoryFilter) {
			result = result.filter((post) => post.frontmatter.categories.includes(categoryFilter));
		}

		// 검색 필터링
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				(post) =>
					post.frontmatter.title.toLowerCase().includes(query) ||
					post.frontmatter.summary.toLowerCase().includes(query) ||
					post.content.toLowerCase().includes(query)
			);
		}

		return result;
	}, [posts, categoryFilter, searchQuery]);

	return {
		posts: filteredPosts,
		totalCount: filteredPosts.length,
	};
}
