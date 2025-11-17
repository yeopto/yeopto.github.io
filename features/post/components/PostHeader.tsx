import React from 'react';
import { Typography } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { formatDate, calculateReadingTime } from '../utils/postUtils';
import type { PostPageItem } from '@/types/post.types';
import { cn } from '@/lib/utils/cn';

export interface PostHeaderProps {
	post: PostPageItem;
	className?: string;
}

/**
 * 포스트 헤더 컴포넌트
 * 제목, 날짜, 카테고리, 읽기 시간 등을 표시
 */
export function PostHeader({ post, className }: PostHeaderProps) {
	const readingTime = calculateReadingTime(post.content);
	const formattedDate = formatDate(post.frontmatter.date);

	return (
		<header className={cn('mb-10 space-y-6', className)}>
			<div className="flex flex-wrap gap-2">
				{post.frontmatter.categories.map((category) => (
					<Badge key={category} variant="primary" size="md">
						{category}
					</Badge>
				))}
			</div>

			<div className="space-y-4">
				<Typography variant="h1" className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
					{post.frontmatter.title}
				</Typography>

				{post.frontmatter.summary && (
					<Typography variant="body" className="text-lg leading-relaxed text-muted-foreground">
						{post.frontmatter.summary}
					</Typography>
				)}
			</div>

			<div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
				<time dateTime={post.frontmatter.date}>{formattedDate}</time>
				<span aria-hidden="true">·</span>
				<span>{readingTime}분 읽기</span>
			</div>
		</header>
	);
}
