'use client';

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchBar, SearchResults, useSearch } from '@/features/search';
import { PostList } from '@/features/post/components/PostList';
import { PostListItem } from '@/features/post/post.types';

export interface PostListWithSearchProps {
	posts: PostListItem[];
}

/**
 * 검색 기능이 포함된 포스트 리스트 컴포넌트
 * 검색어가 있으면 검색 결과를, 없으면 전체 포스트 리스트를 표시
 */
export function PostListWithSearch({ posts }: PostListWithSearchProps) {
	const searchParams = useSearchParams();
	const category = searchParams.get('category');
	const { query, results, updateQuery, clearQuery, isSearching } = useSearch({ posts });

	// 검색 결과에 카테고리 필터 적용
	const filteredSearchResults = useMemo(() => {
		if (!isSearching) return [];
		if (!category) return results;
		return results.filter((result) => result.item.frontmatter.categories.includes(category));
	}, [results, category, isSearching]);

	// 검색 중이면 검색 결과 표시
	if (isSearching) {
		return (
			<div className="space-y-6">
				<SearchBar query={query} onQueryChange={updateQuery} onClear={clearQuery} />
				<SearchResults results={filteredSearchResults} query={query} />
			</div>
		);
	}

	// 검색 중이 아니면 일반 포스트 리스트 표시 (카테고리 필터링 포함)
	return (
		<div className="space-y-6">
			<SearchBar query={query} onQueryChange={updateQuery} onClear={clearQuery} />
			<PostList posts={posts} />
		</div>
	);
}
