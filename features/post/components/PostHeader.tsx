import React from 'react';
import Link from 'next/link';
import { Typography } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate, calculateReadingTime } from '../utils/postUtils';
import type { PostPageItem } from '@/features/post/post.types';
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
			<div className="flex items-center justify-between">
				<Link href="/">
					<Button variant="ghost" size="sm" className="gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
						홈으로
					</Button>
				</Link>
			</div>

			<div className="flex flex-wrap gap-2">
				{post.frontmatter.categories
					.filter((category) => category && category.trim() !== '') // 빈 문자열 제거
					.filter((category, index, self) => self.indexOf(category) === index) // 중복 제거
					.map((category, index) => (
						<Badge key={`${category}-${index}`} variant="primary" size="md">
							{category}
						</Badge>
					))}
			</div>

			<div className="space-y-4">
				<Typography
					variant="h1"
					className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl"
				>
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
