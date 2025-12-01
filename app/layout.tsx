import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/common/Footer';
import { ThemeProvider } from '@/components/common/ThemeProvider';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-sans',
	display: 'swap',
});

export const metadata: Metadata = {
	title: "yeopto's Blog",
	description: 'yeopto의 개발 성장 이야기',
	authors: [{ name: 'yeopto' }],
	openGraph: {
		title: "yeopto's Blog",
		description: 'yeopto의 개발 성장 이야기',
		type: 'website',
		url: 'https://yeopto.github.io',
		images: ['/profile-image.png'],
	},
	twitter: {
		card: 'summary_large_image',
		title: "yeopto's Blog",
		description: 'yeopto의 개발 성장 이야기',
	},
	verification: {
		google: 'ql22z_2Y_hxY79KKMHs_pLQVmom92VRl7YZ-86hVhZo',
		other: {
			'naver-site-verification': 'afb35c954ef587db6a8825631a9011d9d7652fdb',
		},
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko" className={inter.variable} suppressHydrationWarning>
			<body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<main className="flex-1">{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
