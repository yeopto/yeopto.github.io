import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/markdown/getAllPosts';

const SITE_URL = 'https://yeopto.github.io';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await getAllPosts();

	const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
		url: `${SITE_URL}/posts/${post.slug}`,
		lastModified: new Date(post.frontmatter.date),
		changeFrequency: 'monthly',
		priority: 0.8,
	}));

	return [
		{
			url: SITE_URL,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1.0,
		},
		...postEntries,
	];
}
