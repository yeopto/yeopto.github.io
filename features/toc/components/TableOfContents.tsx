'use client';

import React from 'react';
import { useTableOfContents } from '../hooks/useTableOfContents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils/cn';
import type { TocItem } from '../utils/tocUtils';

export interface TableOfContentsProps {
	html: string;
	className?: string;
}

/**
 * 목차 컴포넌트
 * HTML 콘텐츠에서 헤딩을 추출하여 계층 구조로 표시
 */
export function TableOfContents({ html, className }: TableOfContentsProps) {
	const { tocItems, activeId, scrollToHeading, hasToc } = useTableOfContents({ html });

	if (!hasToc) {
		return null;
	}

	return (
		<Card className={cn('sticky top-24', className)}>
			<CardHeader className="pb-3">
				<CardTitle className="text-lg">목차</CardTitle>
			</CardHeader>
			<CardContent>
				<nav className="space-y-1">
					{tocItems.map((item) => (
						<TocItem
							key={item.id}
							item={item}
							isActive={activeId === item.id}
							onClick={() => scrollToHeading(item.id)}
						/>
					))}
				</nav>
			</CardContent>
		</Card>
	);
}

interface TocItemProps {
	item: TocItem;
	isActive: boolean;
	onClick: () => void;
}

function TocItem({ item, isActive, onClick }: TocItemProps) {
	const indentLevel = item.level - 1; // h1 = 0, h2 = 1, h3 = 2 등

	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				'block w-full text-left text-sm transition-colors',
				'rounded-md px-2 py-1.5',
				'hover:bg-muted',
				isActive && 'bg-primary/10 text-primary font-medium',
				!isActive && 'text-muted-foreground hover:text-foreground'
			)}
			style={{ paddingLeft: `${0.75 + indentLevel * 1}rem` }}
			aria-current={isActive ? 'true' : undefined}
		>
			{item.text}
		</button>
	);
}
