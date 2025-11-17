'use client';

import React from 'react';
import { PostCard } from '@/features/post/components/PostCard';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/utils/cn';
import type { SearchResult } from '../utils/searchUtils';

export interface SearchResultsProps {
	results: SearchResult[];
	query: string;
	className?: string;
}

/**
 * 검색 결과를 표시하는 컴포넌트
 */
export function SearchResults({ results, query, className }: SearchResultsProps) {
	if (results.length === 0) {
		return (
			<div className={cn('py-12 text-center', className)}>
				<Typography variant="body" className="text-muted-foreground">
					&quot;{query}&quot;에 대한 검색 결과가 없습니다.
				</Typography>
				<Typography variant="body2" className="mt-2 text-muted-foreground">
					다른 검색어를 시도해보세요.
				</Typography>
			</div>
		);
	}

	return (
		<div className={cn('space-y-6', className)}>
			<div className="flex items-center justify-between">
				<Typography variant="h2" className="text-xl font-semibold">
					검색 결과
				</Typography>
				<Typography variant="body2" className="text-muted-foreground">
					총 {results.length}개의 포스트를 찾았습니다
				</Typography>
			</div>
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{results.map((result) => (
					<PostCard key={result.item.slug} post={result.item} />
				))}
			</div>
		</div>
	);
}
