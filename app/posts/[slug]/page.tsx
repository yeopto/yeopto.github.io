import { notFound } from 'next/navigation';
import { getAllPosts } from '@/lib/markdown/getAllPosts';
import { getPostBySlug } from '@/lib/markdown/getPostBySlug';
import { PostHeader } from '@/features/post/components/PostHeader';
import { PostContent } from '@/features/post/components/PostContent';
import { RelatedPosts } from '@/features/post/components/RelatedPosts';
import { Container } from '@/components/ui/Container';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

export async function generateStaticParams() {
	const posts = await getAllPosts();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const post = await getPostBySlug(params.slug);

	if (!post) {
		return {
			title: 'Post Not Found',
		};
	}

	return {
		title: post.frontmatter.title,
		description: post.frontmatter.summary,
		openGraph: {
			title: post.frontmatter.title,
			description: post.frontmatter.summary,
			images: post.frontmatter.thumbnail ? [post.frontmatter.thumbnail] : [],
			type: 'article',
			publishedTime: post.frontmatter.date,
		},
		twitter: {
			card: 'summary_large_image',
			title: post.frontmatter.title,
			description: post.frontmatter.summary,
			images: post.frontmatter.thumbnail ? [post.frontmatter.thumbnail] : [],
		},
	};
}

export default async function PostPage({ params }: { params: { slug: string } }) {
	const post = await getPostBySlug(params.slug);

	if (!post) {
		notFound();
	}

	const allPosts = await getAllPosts();

	return (
		<Container className="my-12 max-w-4xl">
			<article>
				<PostHeader post={post} />
				<PostContent post={post} />
			</article>
			<RelatedPosts posts={allPosts} currentSlug={post.slug} />
		</Container>
	);
}
