'use client';

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { PostCard } from './PostCard';
import type { PostListItem } from '@/types/post.types';
import { cn } from '@/lib/utils/cn';

export interface PostListProps {
	posts: PostListItem[];
	className?: string;
	emptyMessage?: string;
}

/**
 * 포스트 리스트 컴포넌트
 * URL 쿼리 파라미터를 읽어서 카테고리 필터링 후 PostCard들을 그리드로 표시
 */
export function PostList({ posts, className, emptyMessage = '포스트가 없습니다.' }: PostListProps) {
	const searchParams = useSearchParams();
	const category = searchParams.get('category');

	const filteredPosts = useMemo(() => {
		if (!category) {
			return posts;
		}
		return posts.filter((post) => post.frontmatter.categories.includes(category));
	}, [posts, category]);

	if (filteredPosts.length === 0) {
		return (
			<div className={cn('py-12 text-center text-muted-foreground', className)}>
				<p>{emptyMessage}</p>
			</div>
		);
	}

	return (
		<div className={cn('grid grid-cols-1 gap-6', 'md:grid-cols-2', 'lg:grid-cols-3', className)}>
			{filteredPosts.map((post) => (
				<PostCard key={post.slug} post={post} />
			))}
		</div>
	);
}
