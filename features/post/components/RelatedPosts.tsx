import React from 'react';
import Link from 'next/link';
import { Typography } from '@/components/ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatDate } from '../utils/postUtils';
import type { PostListItem } from '@/types/post.types';
import { cn } from '@/lib/utils/cn';

export interface RelatedPostsProps {
	posts: PostListItem[];
	currentSlug: string;
	maxPosts?: number;
	className?: string;
}

/**
 * 관련 포스트 추천 컴포넌트
 * 같은 카테고리의 포스트를 추천
 */
export function RelatedPosts({ posts, currentSlug, maxPosts = 3, className }: RelatedPostsProps) {
	// 현재 포스트 제외
	const filteredPosts = posts.filter((post) => post.slug !== currentSlug).slice(0, maxPosts);

	if (filteredPosts.length === 0) {
		return null;
	}

	return (
		<section className={cn('mt-16 border-t border-border pt-12', className)}>
			<Typography variant="h2" className="mb-6 text-2xl font-bold">
				다른 포스트
			</Typography>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{filteredPosts.map((post) => (
					<Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
						<Card className="h-full transition-all duration-200 hover:border-primary/50 hover:shadow-md">
							<CardHeader>
								<CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
									{post.frontmatter.title}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">{formatDate(post.frontmatter.date)}</p>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</section>
	);
}
