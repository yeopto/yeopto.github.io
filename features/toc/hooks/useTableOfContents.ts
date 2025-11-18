'use client';

import { useEffect, useState } from 'react';
import { extractHeadingsFromHtml, buildTocHierarchy, type TocItem } from '../utils/tocUtils';

export interface UseTableOfContentsOptions {
	html: string;
}

/**
 * HTML 콘텐츠에서 목차를 추출하는 훅
 */
export function useTableOfContents({ html }: UseTableOfContentsOptions) {
	const [tocItems, setTocItems] = useState<TocItem[]>([]);
	const [activeId, setActiveId] = useState<string | null>(null);

	// HTML에서 헤딩 추출
	useEffect(() => {
		if (typeof window === 'undefined' || !html) {
			setTocItems([]);
			return;
		}

		const headings = extractHeadingsFromHtml(html);
		const hierarchy = buildTocHierarchy(headings);
		setTocItems(hierarchy);
	}, [html]);

	// 현재 활성화된 헤딩 감지 (스크롤 위치 기반)
	useEffect(() => {
		if (tocItems.length === 0) return;

		const handleScroll = () => {
			const scrollPosition = window.scrollY + 100; // offset

			// 모든 헤딩 요소 찾기
			const headingElements = tocItems
				.map((item) => {
					const element = document.getElementById(item.id);
					return element ? { id: item.id, element, top: element.offsetTop } : null;
				})
				.filter((item): item is { id: string; element: HTMLElement; top: number } => item !== null);

			if (headingElements.length === 0) return;

			// 현재 스크롤 위치보다 위에 있는 헤딩 중 가장 마지막 것 찾기
			let currentActiveId: string | null = null;
			for (let i = headingElements.length - 1; i >= 0; i--) {
				if (headingElements[i].top <= scrollPosition) {
					currentActiveId = headingElements[i].id;
					break;
				}
			}

			// 첫 번째 헤딩이 아직 보이지 않으면 첫 번째 항목 활성화
			if (!currentActiveId && scrollPosition < headingElements[0].top) {
				currentActiveId = headingElements[0].id;
			}

			setActiveId(currentActiveId);
		};

		// 초기 실행
		handleScroll();

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [tocItems]);

	// 헤딩 클릭 시 스크롤
	const scrollToHeading = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			const offset = 80; // 헤더 높이 고려
			const elementPosition = element.getBoundingClientRect().top + window.scrollY;
			const offsetPosition = elementPosition - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			});

			// URL 해시 업데이트 (선택사항)
			window.history.pushState(null, '', `#${id}`);
		}
	};

	return {
		tocItems,
		activeId,
		scrollToHeading,
		hasToc: tocItems.length > 0,
	};
}
