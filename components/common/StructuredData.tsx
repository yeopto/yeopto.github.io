import type { PostPageItem } from '@/features/post/post.types';

const SITE_URL = 'https://yeopto.github.io';

type WebSiteSchema = {
	'@context': 'https://schema.org';
	'@type': 'WebSite';
	name: string;
	description: string;
	url: string;
	author: {
		'@type': 'Person';
		name: string;
	};
};

type BlogPostingSchema = {
	'@context': 'https://schema.org';
	'@type': 'BlogPosting';
	headline: string;
	description: string;
	datePublished: string;
	dateModified: string;
	author: {
		'@type': 'Person';
		name: string;
	};
	url: string;
	image?: string;
	articleSection?: string[];
};

interface StructuredDataProps {
	type: 'website' | 'blogPosting';
	post?: PostPageItem;
}

/**
 * 구조화된 데이터(JSON-LD) 컴포넌트
 * SEO를 위한 스키마 마크업을 제공합니다.
 */
export function StructuredData({ type, post }: StructuredDataProps) {
	if (type === 'website') {
		const websiteSchema: WebSiteSchema = {
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			name: "yeopto's Blog",
			description: 'yeopto의 개발 성장 이야기',
			url: SITE_URL,
			author: {
				'@type': 'Person',
				name: 'yeopto',
			},
		};

		return (
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
			/>
		);
	}

	if (type === 'blogPosting' && post) {
		const blogPostingSchema: BlogPostingSchema = {
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			headline: post.frontmatter.title,
			description: post.frontmatter.summary || '',
			datePublished: post.frontmatter.date,
			dateModified: post.frontmatter.date,
			author: {
				'@type': 'Person',
				name: 'yeopto',
			},
			url: `${SITE_URL}/posts/${post.slug}`,
			...(post.frontmatter.thumbnail && {
				image: post.frontmatter.thumbnail.startsWith('http')
					? post.frontmatter.thumbnail
					: `${SITE_URL}${post.frontmatter.thumbnail}`,
			}),
			...(post.frontmatter.categories.length > 0 && {
				articleSection: post.frontmatter.categories,
			}),
		};

		return (
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
			/>
		);
	}

	return null;
}
