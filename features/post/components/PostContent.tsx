import React from 'react';
import Image from 'next/image';
import { MarkdownContent } from '@/components/markdown/MarkdownContent';
import type { PostPageItem } from '@/types/post.types';
import { cn } from '@/lib/utils/cn';

export interface PostContentProps {
	post: PostPageItem;
	className?: string;
}

/**
 * 포스트 본문 컴포넌트
 * 썸네일 이미지와 마크다운 콘텐츠를 표시
 */
export function PostContent({ post, className }: PostContentProps) {
	return (
		<article className={cn('space-y-8', className)}>
			{post.frontmatter.thumbnail && (
				<div className="relative aspect-video w-full overflow-hidden rounded-xl">
					<Image
						src={post.frontmatter.thumbnail}
						alt={post.frontmatter.title}
						fill
						className="object-cover"
						priority
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
					/>
				</div>
			)}

			{post.html && <MarkdownContent html={post.html} />}
		</article>
	);
}
