import { useMemo } from 'react';
import type { PostListItem } from '@/types/post.types';
import { getAllCategories } from '../utils/categoryUtils';

export interface UseCategoriesResult {
	categories: Record<string, number>;
	totalCount: number;
}

/**
 * 카테고리 목록과 통계를 반환하는 훅
 * @param posts 포스트 리스트
 * @returns 카테고리 목록과 전체 포스트 개수
 */
export function useCategories(posts: PostListItem[]): UseCategoriesResult {
	const categories = useMemo(() => getAllCategories(posts), [posts]);
	const totalCount = posts.length;

	return {
		categories,
		totalCount,
	};
}
