import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface MarkdownContentProps {
	html: string;
	className?: string;
}

/**
 * 마크다운 HTML 콘텐츠를 렌더링하는 컴포넌트
 */
export function MarkdownContent({ html, className }: MarkdownContentProps) {
	return (
		<div
			className={cn(
				'markdown-content prose prose-slate dark:prose-invert',
				'max-w-none',
				'prose-headings:font-bold prose-headings:text-foreground',
				'prose-p:text-foreground prose-p:leading-relaxed',
				'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
				'prose-strong:text-foreground prose-strong:font-semibold',
				'prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm',
				'prose-pre:bg-muted prose-pre:border prose-pre:border-border',
				'prose-img:rounded-lg prose-img:shadow-md',
				'prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic',
				'prose-ul:list-disc prose-ol:list-decimal',
				'prose-hr:border-border',
				className
			)}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
