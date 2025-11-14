/**
 * 디자인 시스템 토큰
 * 모던하고 다채로운 블로그 디자인을 위한 디자인 토큰 정의
 */

export const colors = {
	light: {
		background: '#ffffff',
		foreground: '#0a0a0a',
		primary: '#4263eb',
		primaryHover: '#364fc7',
		secondary: '#868e96',
		muted: '#f1f3f5',
		mutedForeground: '#495057',
		accent: '#4263eb',
		accentHover: '#364fc7',
		border: '#dee2e6',
		input: '#e9ecef',
		ring: '#4263eb',
		card: '#ffffff',
		cardForeground: '#0a0a0a',
		popover: '#ffffff',
		popoverForeground: '#0a0a0a',
		// 다채로운 색상 팔레트
		gradient: {
			from: '#667eea',
			to: '#764ba2',
		},
		success: '#51cf66',
		warning: '#ffd43b',
		error: '#ff6b6b',
		info: '#4263eb',
	},
	dark: {
		background: '#0a0a0a',
		foreground: '#fafafa',
		primary: '#5c7cfa',
		primaryHover: '#4263eb',
		secondary: '#adb5bd',
		muted: '#2d2d2d',
		mutedForeground: '#ced4da',
		accent: '#5c7cfa',
		accentHover: '#4263eb',
		border: '#343a40',
		input: '#495057',
		ring: '#5c7cfa',
		card: '#1a1a1a',
		cardForeground: '#fafafa',
		popover: '#1a1a1a',
		popoverForeground: '#fafafa',
		// 다채로운 색상 팔레트
		gradient: {
			from: '#667eea',
			to: '#764ba2',
		},
		success: '#51cf66',
		warning: '#ffd43b',
		error: '#ff6b6b',
		info: '#5c7cfa',
	},
} as const;

export const typography = {
	fontFamily: {
		sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
		serif: ['var(--font-serif)', 'serif'],
		mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
	},
	fontSize: {
		xs: ['0.75rem', { lineHeight: '1rem' }],
		sm: ['0.875rem', { lineHeight: '1.25rem' }],
		base: ['1rem', { lineHeight: '1.5rem' }],
		lg: ['1.125rem', { lineHeight: '1.75rem' }],
		xl: ['1.25rem', { lineHeight: '1.75rem' }],
		'2xl': ['1.5rem', { lineHeight: '2rem' }],
		'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
		'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
		'5xl': ['3rem', { lineHeight: '1' }],
		'6xl': ['3.75rem', { lineHeight: '1' }],
	},
	fontWeight: {
		normal: '400',
		medium: '500',
		semibold: '600',
		bold: '700',
		extrabold: '800',
	},
} as const;

export const spacing = {
	0: '0',
	1: '0.25rem', // 4px
	2: '0.5rem', // 8px
	3: '0.75rem', // 12px
	4: '1rem', // 16px
	5: '1.25rem', // 20px
	6: '1.5rem', // 24px
	8: '2rem', // 32px
	10: '2.5rem', // 40px
	12: '3rem', // 48px
	16: '4rem', // 64px
	20: '5rem', // 80px
	24: '6rem', // 96px
	32: '8rem', // 128px
} as const;

export const borderRadius = {
	none: '0',
	sm: '0.125rem', // 2px
	base: '0.25rem', // 4px
	md: '0.375rem', // 6px
	lg: '0.5rem', // 8px
	xl: '0.75rem', // 12px
	'2xl': '1rem', // 16px
	'3xl': '1.5rem', // 24px
	full: '9999px',
} as const;

export const shadows = {
	sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
	base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
	md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
	lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
	xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
	'2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
	inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
	none: 'none',
} as const;

export const transitions = {
	duration: {
		fast: '150ms',
		base: '200ms',
		slow: '300ms',
		slower: '500ms',
	},
	easing: {
		easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
		easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
		easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
	},
} as const;

export const zIndex = {
	dropdown: 1000,
	sticky: 1020,
	fixed: 1030,
	modalBackdrop: 1040,
	modal: 1050,
	popover: 1060,
	tooltip: 1070,
} as const;
