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
		<Link href={`/posts/${post.slug}`} className={cn('block', className)}>
			<Card className="h-full transition-all duration-fast hover:shadow-lg hover:-translate-y-1">
				{post.frontmatter.thumbnail && (
					<div className="relative h-48 w-full overflow-hidden rounded-t-xl">
						<Image
							src={post.frontmatter.thumbnail}
							alt={post.frontmatter.title}
							fill
							className="object-cover transition-transform duration-fast hover:scale-105"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</div>
				)}
				<CardHeader>
					<div className="mb-2 flex flex-wrap gap-2">
						{post.frontmatter.categories.map((category) => (
							<Badge key={category} variant="secondary" size="sm">
								{category}
							</Badge>
						))}
					</div>
					<CardTitle className="line-clamp-2">{post.frontmatter.title}</CardTitle>
					<CardDescription className="line-clamp-2">{post.frontmatter.summary}</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center gap-4 text-sm text-muted-foreground">
						<span>{formattedDate}</span>
						<span>•</span>
						<span>{readingTime}분 읽기</span>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
