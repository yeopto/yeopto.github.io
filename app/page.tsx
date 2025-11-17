import { getAllPosts } from '@/lib/markdown/getAllPosts';
import { getAllCategories } from '@/features/category/utils/categoryUtils';
import { Introduction } from '@/components/common/Introduction';
import { Container } from '@/components/ui/Container';
import { CategoryFilter } from '@/features/category/components/CategoryFilter';
import { PostList } from '@/features/post/components/PostList';

export const dynamic = 'force-static';

export default async function HomePage() {
	const posts = await getAllPosts();
	const categories = getAllCategories(posts);

	return (
		<div className="flex min-h-screen flex-col">
			<Introduction />
			<Container className="my-12 space-y-10">
				<div className="space-y-6">
					<CategoryFilter categories={categories} />
					<PostList posts={posts} />
				</div>
			</Container>
		</div>
	);
}
