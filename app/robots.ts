import { MetadataRoute } from 'next';

const SITE_URL = 'https://yeopto.github.io';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/api/'],
		},
		sitemap: `${SITE_URL}/sitemap.xml`,
	};
}
