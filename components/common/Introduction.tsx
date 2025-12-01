import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Avatar } from '@/components/ui/Avatar';
import { Typography } from '@/components/ui/Typography';
import { ThemeToggle } from '@/components/common/ThemeToggle';

const VELOG_ICON_LINK =
	'data:image/png;base64,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';

const GITHUB_ICON_LINK = 'https://cdn-icons-png.flaticon.com/512/25/25231.png';

export function Introduction() {
	return (
		<header className="border-b border-border bg-background">
			<Container className="py-16 md:py-20">
				<div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
					<Avatar
						src="/profile-image.png"
						alt="yeopto profile"
						size="xl"
						className="border-2 border-border shadow-sm"
					/>
					<div className="flex-1">
						<div className="mb-2 flex items-center justify-between gap-2">
							<Typography variant="h1" className="text-3xl font-bold md:text-4xl">
								yeopto 블로그
							</Typography>
							<ThemeToggle />
						</div>
						<Typography variant="body" className="mb-4 text-muted-foreground">
							코린이의 성장모험
						</Typography>
						<div className="flex items-center justify-center gap-4 md:justify-start">
							<Link
								href="https://velog.io/@yeopto"
								target="_blank"
								rel="noopener noreferrer"
								className="transition-opacity hover:opacity-70"
								aria-label="Velog"
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={VELOG_ICON_LINK}
									alt="Velog"
									width={32}
									height={32}
									className="rounded-full"
								/>
							</Link>
							<Link
								href="https://github.com/yeopto"
								target="_blank"
								rel="noopener noreferrer"
								className="transition-opacity hover:opacity-70"
								aria-label="GitHub"
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={GITHUB_ICON_LINK}
									alt="Github"
									width={32}
									height={32}
									className="rounded-full"
								/>
							</Link>
						</div>
					</div>
				</div>
			</Container>
		</header>
	);
}
