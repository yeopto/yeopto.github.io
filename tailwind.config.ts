import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./features/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				background: 'var(--color-background)',
				foreground: 'var(--color-foreground)',
				primary: {
					DEFAULT: 'var(--color-primary)',
					hover: 'var(--color-primary-hover)',
				},
				secondary: 'var(--color-secondary)',
				muted: {
					DEFAULT: 'var(--color-muted)',
					foreground: 'var(--color-muted-foreground)',
				},
				accent: {
					DEFAULT: 'var(--color-accent)',
					hover: 'var(--color-accent-hover)',
				},
				border: 'var(--color-border)',
				input: 'var(--color-input)',
				ring: 'var(--color-ring)',
				card: {
					DEFAULT: 'var(--color-card)',
					foreground: 'var(--color-card-foreground)',
				},
				popover: {
					DEFAULT: 'var(--color-popover)',
					foreground: 'var(--color-popover-foreground)',
				},
				success: 'var(--color-success)',
				warning: 'var(--color-warning)',
				error: 'var(--color-error)',
				info: 'var(--color-info)',
			},
			fontFamily: {
				sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
				serif: ['var(--font-serif)', 'serif'],
			},
			boxShadow: {
				sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
				DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
				md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
				lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
				xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
				'2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
				inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
			},
			transitionDuration: {
				fast: '150ms',
				base: '200ms',
				slow: '300ms',
				slower: '500ms',
			},
			transitionTimingFunction: {
				'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
				'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
				'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
		},
	},
	plugins: [],
};

export default config;
