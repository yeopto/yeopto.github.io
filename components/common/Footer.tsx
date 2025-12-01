import React from 'react';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';

export function Footer() {
	return (
		<footer className="mt-auto border-t border-border bg-muted/30 py-8">
			<Container>
				<Typography variant="body2" className="text-center text-muted-foreground">
					반갑습니다. 누군가에겐 도움이 되는 글을 쓰도록 노력하겠습니다.
					<br />
					<span className="mt-2 block">© October.2022 yeopto, Powered By Next.js.</span>
				</Typography>
			</Container>
		</footer>
	);
}
