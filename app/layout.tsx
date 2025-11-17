import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/common/Footer';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-sans',
	display: 'swap',
});

export const metadata: Metadata = {
	title: "yeopto's Blog",
	description: '코린이의 성장모험',
	authors: [{ name: 'yeopto' }],
	openGraph: {
		title: "yeopto's Blog",
		description: '코린이의 성장모험',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: "yeopto's Blog",
		description: '코린이의 성장모험',
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
		<html lang="ko" className={inter.variable}>
			<body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
				<main className="flex-1">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
