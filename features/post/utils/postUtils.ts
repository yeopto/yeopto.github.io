import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 읽기 시간 계산 (분 단위)
 * 평균 읽기 속도: 200 단어/분
 */
export function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const words = content.trim().split(/\s+/).length;
	const minutes = Math.ceil(words / wordsPerMinute);
	return minutes;
}

/**
 * 날짜 포맷팅
 */
export function formatDate(dateString: string, formatStr: string = 'yyyy년 MM월 dd일'): string {
	try {
		const date = parseISO(dateString);
		return format(date, formatStr, { locale: ko });
	} catch {
		return dateString;
	}
}

/**
 * 상대 시간 포맷팅 (예: "3일 전", "2주 전")
 */
export function formatRelativeTime(dateString: string): string {
	try {
		const date = parseISO(dateString);
		const now = new Date();
		const diffInMs = now.getTime() - date.getTime();
		const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

		if (diffInDays === 0) return '오늘';
		if (diffInDays === 1) return '어제';
		if (diffInDays < 7) return `${diffInDays}일 전`;
		if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}주 전`;
		if (diffInDays < 365) return `${Math.floor(diffInDays / 30)}개월 전`;
		return `${Math.floor(diffInDays / 365)}년 전`;
	} catch {
		return dateString;
	}
}
