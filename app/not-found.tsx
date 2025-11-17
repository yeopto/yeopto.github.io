import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
	return (
		<Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
			<Typography variant="h1" className="text-8xl font-extrabold text-primary md:text-9xl">
				404
			</Typography>
			<Typography variant="h2" className="mt-4 text-2xl font-semibold md:text-3xl">
				찾을 수 없는 페이지입니다.
			</Typography>
			<Typography variant="body" className="mt-4 text-muted-foreground">
				메인페이지에서 다른 포스트를 확인해보세요!
			</Typography>
			<Link href="/" className="mt-8">
				<Button variant="primary" size="lg">
					메인으로
				</Button>
			</Link>
		</Container>
	);
}
