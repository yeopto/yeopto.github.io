import { useMemo, useState, useCallback } from 'react';
import type { PostListItem } from '@/features/post/post.types';
import { createSearchIndex, type SearchResult } from '../utils/searchUtils';

export interface UseSearchOptions {
	posts: PostListItem[];
	initialQuery?: string;
}

/**
 * 검색 기능을 제공하는 훅
 * Fuse.js를 사용하여 포스트를 검색합니다.
 */
export function useSearch({ posts, initialQuery = '' }: UseSearchOptions) {
	const [query, setQuery] = useState<string>(initialQuery);

	// 검색 인덱스 생성 (메모이제이션)
	const searchIndex = useMemo(() => createSearchIndex(posts), [posts]);

	// 검색 결과 계산
	const results = useMemo<SearchResult[]>(() => {
		if (!query || !query.trim()) {
			return [];
		}

		try {
			const fuseResults = searchIndex.search(query);
			return fuseResults.map((result) => ({
				item: result.item,
				score: result.score,
				matches: result.matches,
			}));
		} catch (error) {
			console.error('검색 중 오류 발생:', error);
			return [];
		}
	}, [query, searchIndex]);

	// 검색어 업데이트
	const updateQuery = useCallback((newQuery: string) => {
		setQuery(newQuery);
	}, []);

	// 검색어 초기화
	const clearQuery = useCallback(() => {
		setQuery('');
	}, []);

	return {
		query,
		results,
		updateQuery,
		clearQuery,
		hasResults: results.length > 0,
		isSearching: query.trim().length > 0,
	};
}
