/**
 * 목차 항목 타입
 */
export type TocItem = {
	id: string;
	text: string;
	level: number; // 1 = h1, 2 = h2, 3 = h3 등
};

/**
 * HTML 문자열에서 헤딩(h1~h6)을 추출하여 목차 항목 배열로 변환
 */
export function extractHeadingsFromHtml(html: string): TocItem[] {
	if (typeof window === 'undefined') {
		// Server-side에서는 DOM API를 사용할 수 없으므로 빈 배열 반환
		return [];
	}

	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
	const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

	const tocItems: TocItem[] = [];

	const idMap = new Map<string, number>(); // 중복 ID 추적

	headings.forEach((heading) => {
		const level = parseInt(heading.tagName.charAt(1), 10); // h1 -> 1, h2 -> 2 등
		const text = heading.textContent?.trim() || '';

		// 빈 텍스트는 건너뛰기
		if (!text) return;

		// ID가 없으면 생성
		let id = heading.id;
		if (!id) {
			id = generateIdFromText(text);
		}

		// 빈 ID가 생성된 경우 건너뛰기
		if (!id || id.trim() === '') {
			// 빈 ID인 경우 텍스트와 인덱스를 조합하여 고유 ID 생성
			id = `heading-${tocItems.length}`;
		}

		// 중복 ID 처리: 같은 ID가 이미 있으면 인덱스 추가
		if (idMap.has(id)) {
			const count = idMap.get(id)! + 1;
			idMap.set(id, count);
			id = `${id}-${count}`;
		} else {
			idMap.set(id, 0);
		}

		// DOM에 ID 설정 (아직 설정되지 않은 경우)
		if (!heading.id) {
			heading.id = id;
		}

		tocItems.push({
			id,
			text,
			level,
		});
	});

	return tocItems;
}

/**
 * 텍스트로부터 URL-safe ID 생성
 * 공통 유틸리티로 export하여 다른 곳에서도 사용 가능
 */
export function generateIdFromText(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '') // 특수문자 제거
		.replace(/\s+/g, '-') // 공백을 하이픈으로
		.replace(/-+/g, '-') // 연속된 하이픈을 하나로
		.replace(/^-|-$/g, ''); // 앞뒤 하이픈 제거
}

/**
 * 목차 항목들을 계층 구조로 변환
 */
export function buildTocHierarchy(items: TocItem[]): TocItem[] {
	if (items.length === 0) return [];

	const result: TocItem[] = [];
	const stack: TocItem[] = [];

	items.forEach((item) => {
		// 현재 항목보다 낮은 레벨의 항목들을 스택에서 제거
		while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
			stack.pop();
		}

		// 스택이 비어있으면 최상위 항목
		if (stack.length === 0) {
			result.push(item);
		} else {
			// 부모 항목에 자식으로 추가 (계층 구조는 컴포넌트에서 처리)
			// 여기서는 평면 구조로 반환
			result.push(item);
		}

		stack.push(item);
	});

	return result;
}
