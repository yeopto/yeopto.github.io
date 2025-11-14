import { useState, useEffect } from 'react';
import type { PostPageItem } from '@/types/post.types';
import { getPostBySlug } from '@/lib/markdown/getPostBySlug';

export interface UsePostOptions {
	slug: string;
}

export interface UsePostResult {
	post: PostPageItem | null;
	loading: boolean;
	error: Error | null;
}

/**
 * 단일 포스트 훅
 *
 * ⚠️ SSG에서는 대부분 사용되지 않습니다!
 *
 * 사용 사례:
 * - Server Component에서는 직접 `getPostBySlug()` 사용 권장
 * - Client Component에서 동적으로 포스트를 로드해야 할 때만 사용
 *   예: 검색 결과에서 포스트 미리보기, 모달에서 포스트 표시 등
 *
 * 일반적인 SSG 블로그에서는:
 * - 포스트 상세 페이지: Server Component에서 `getPostBySlug()` 직접 사용
 * - 포스트 리스트: Server Component에서 `getAllPosts()` 직접 사용
 */
export function usePost({ slug }: UsePostOptions): UsePostResult {
	const [post, setPost] = useState<PostPageItem | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		async function fetchPost() {
			try {
				setLoading(true);
				const data = await getPostBySlug(slug);
				setPost(data);
			} catch (err) {
				setError(err instanceof Error ? err : new Error('Failed to fetch post'));
			} finally {
				setLoading(false);
			}
		}

		fetchPost();
	}, [slug]);

	return { post, loading, error };
}
