'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';

export interface CategoryFilterProps {
	categories: Record<string, number>;
	selectedCategory?: string | null;
	className?: string;
}

/**
 * 카테고리 필터 컴포넌트
 * 카테고리별로 포스트를 필터링할 수 있는 UI 제공
 */
export function CategoryFilter({ categories, selectedCategory, className }: CategoryFilterProps) {
	const searchParams = useSearchParams();
	const currentCategory = selectedCategory ?? searchParams.get('category');

	const categoryEntries = Object.entries(categories).sort((a, b) => b[1] - a[1]); // 포스트 개수 기준 내림차순

	const createCategoryUrl = (category: string | null) => {
		const params = new URLSearchParams(searchParams.toString());
		if (category) {
			params.set('category', category);
		} else {
			params.delete('category');
		}
		const queryString = params.toString();
		return queryString ? `/?${queryString}` : '/';
	};

	return (
		<div className={cn('flex flex-wrap items-center gap-3', className)}>
			<Link href={createCategoryUrl(null)}>
				<Badge
					variant={currentCategory === null ? 'primary' : 'secondary'}
					size="md"
					className="cursor-pointer transition-all duration-fast hover:scale-105"
				>
					전체 ({Object.values(categories).reduce((sum, count) => sum + count, 0)})
				</Badge>
			</Link>
			{categoryEntries.map(([category, count]) => (
				<Link key={category} href={createCategoryUrl(category)}>
					<Badge
						variant={currentCategory === category ? 'primary' : 'secondary'}
						size="md"
						className="cursor-pointer transition-all duration-fast hover:scale-105"
					>
						{category} ({count})
					</Badge>
				</Link>
			))}
		</div>
	);
}
