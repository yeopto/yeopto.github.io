import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDate, calculateReadingTime } from '../utils/postUtils';
import type { PostListItem } from '@/types/post.types';
import { cn } from '@/lib/utils/cn';

export interface PostCardProps {
	post: PostListItem;
	className?: string;
}

/**
 * 포스트 카드 컴포넌트
 * 포스트 목록에서 사용되는 카드 형태의 컴포넌트
 */
export function PostCard({ post, className }: PostCardProps) {
	const readingTime = calculateReadingTime(post.content);
	const formattedDate = formatDate(post.frontmatter.date);

	return (
		<Link href={`/posts/${post.slug}`} className={cn('group block', className)}>
			<Card className="h-full border-border transition-all duration-200 hover:border-primary/50 hover:shadow-md">
				{post.frontmatter.thumbnail && (
					<div className="relative h-48 w-full overflow-hidden rounded-t-lg">
						<Image
							src={post.frontmatter.thumbnail}
							alt={post.frontmatter.title}
							fill
							className="object-cover transition-transform duration-300 group-hover:scale-105"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</div>
				)}
				<CardHeader className="space-y-3">
					<div className="flex flex-wrap gap-2">
						{post.frontmatter.categories
							.filter((category) => category && category.trim() !== '') // 빈 문자열 제거
							.filter((category, index, self) => self.indexOf(category) === index) // 중복 제거
							.map((category, index) => (
								<Badge key={`${category}-${index}`} variant="secondary" size="sm">
									{category}
								</Badge>
							))}
					</div>
					<CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
						{post.frontmatter.title}
					</CardTitle>
					{post.frontmatter.summary && (
						<CardDescription className="line-clamp-2 text-sm">
							{post.frontmatter.summary}
						</CardDescription>
					)}
				</CardHeader>
				<CardContent>
					<div className="flex items-center gap-3 text-xs text-muted-foreground">
						<time dateTime={post.frontmatter.date}>{formattedDate}</time>
						<span aria-hidden="true">·</span>
						<span>{readingTime}분 읽기</span>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
