import Fuse, { type IFuseOptions, type FuseResultMatch } from 'fuse.js';
import type { PostListItem } from '@/features/post/post.types';

/**
 * Fuse.js 검색 옵션 설정
 */
export const searchOptions: IFuseOptions<PostListItem> = {
	keys: [
		{ name: 'frontmatter.title', weight: 0.7 },
		{ name: 'frontmatter.summary', weight: 0.3 },
		{ name: 'content', weight: 0.1 },
	],
	threshold: 0.3, // 0.0 = 완전 일치, 1.0 = 모든 결과 반환
	minMatchCharLength: 2,
	includeScore: true,
	includeMatches: true,
};

/**
 * 포스트 리스트로부터 Fuse 인스턴스 생성
 */
export function createSearchIndex(posts: PostListItem[]): Fuse<PostListItem> {
	return new Fuse(posts, searchOptions);
}

/**
 * 검색 결과 타입
 */
export type SearchResult = {
	item: PostListItem;
	score?: number;
	matches?: readonly FuseResultMatch[];
};
