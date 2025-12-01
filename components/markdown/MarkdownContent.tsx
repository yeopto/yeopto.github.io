'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { generateIdFromText } from '@/features/toc/utils/tocUtils';

export interface MarkdownContentProps {
	html: string;
	className?: string;
}

/**
 * 마크다운 HTML 콘텐츠를 렌더링하는 컴포넌트
 * 헤딩에 자동으로 ID를 추가하여 목차 링크가 작동하도록 함
 */
export function MarkdownContent({ html, className }: MarkdownContentProps) {
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!contentRef.current) return;

		// 모든 헤딩 요소에 ID 추가
		const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
		headings.forEach((heading) => {
			if (!heading.id) {
				const text = heading.textContent?.trim() || '';
				if (text) {
					heading.id = generateIdFromText(text);
				}
			}
		});

		// 외부 링크에 target="_blank" 및 rel="noopener noreferrer" 추가
		const links = contentRef.current.querySelectorAll('a[href]');
		links.forEach((link) => {
			const href = link.getAttribute('href');
			if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
				link.setAttribute('target', '_blank');
				link.setAttribute('rel', 'noopener noreferrer');
			}
		});

		// 이미지 요소 처리 (GIF 포함)
		// 이미지 경로는 서버 사이드에서 이미 처리되므로 여기서는 에러 핸들링만 수행
		const images = contentRef.current.querySelectorAll('img');
		images.forEach((img) => {
			// 이미지 로드 실패 시 처리
			img.addEventListener('error', () => {
				console.warn('이미지 로드 실패:', img.getAttribute('src'));
			});
		});
	}, [html]);

	return (
		<div
			ref={contentRef}
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
