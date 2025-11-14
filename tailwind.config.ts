import type { Config } from 'tailwindcss';
import {
	typography,
	spacing,
	borderRadius,
	shadows,
	transitions,
	zIndex,
} from './lib/design-system/tokens';

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
			fontFamily: typography.fontFamily as unknown as Record<string, string[]>,
			fontSize: typography.fontSize as unknown as Record<string, [string, { lineHeight: string }]>,
			fontWeight: typography.fontWeight as unknown as Record<string, string>,
			spacing: spacing as unknown as Record<string, string>,
			borderRadius: borderRadius as unknown as Record<string, string>,
			boxShadow: shadows as unknown as Record<string, string>,
			transitionDuration: transitions.duration as unknown as Record<string, string>,
			transitionTimingFunction: {
				'ease-in': transitions.easing.easeIn,
				'ease-out': transitions.easing.easeOut,
				'ease-in-out': transitions.easing.easeInOut,
			},
			zIndex: Object.fromEntries(
				Object.entries(zIndex).map(([key, value]) => [key, String(value)])
			) as Record<string, string>,
		},
	},
	plugins: [],
};

export default config;
