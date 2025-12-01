/**
 * 디자인 시스템 토큰
 * 모던하고 다채로운 블로그 디자인을 위한 디자인 토큰 정의
 *
 * Tailwind 클래스명 매핑:
 * - spacing: p-{size}, m-{size}, gap-{size}, w-{size}, h-{size} 등
 *   예: p-2 → spacing[2], m-4 → spacing[4]
 * - fontSize: text-{size}
 *   예: text-sm → fontSize.sm, text-lg → fontSize.lg
 * - borderRadius: rounded-{size}
 *   예: rounded-lg → borderRadius.lg, rounded-base → borderRadius.base
 * - boxShadow: shadow-{size}
 *   예: shadow-md → boxShadow.md, shadow-lg → boxShadow.lg
 * - transitionDuration: duration-{size}
 *   예: duration-fast → transitionDuration.fast, duration-slow → transitionDuration.slow
 * - transitionTimingFunction: ease-{type}
 *   예: ease-in → transitionTimingFunction['ease-in']
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

/**
 * Typography 토큰
 * fontFamily: font-{name} (예: font-sans, font-serif)
 * fontSize: text-{size} (예: text-sm, text-lg, text-2xl)
 * fontWeight: font-{weight} (예: font-normal, font-bold)
 */
export const typography = {
	fontFamily: {
		sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'], // font-sans
		serif: ['var(--font-serif)', 'serif'], // font-serif
		mono: ['ui-monospace', 'SFMono-Regular', 'monospace'], // font-mono
	},
	fontSize: {
		xs: ['0.75rem', { lineHeight: '1rem' }], // text-xs
		sm: ['0.875rem', { lineHeight: '1.25rem' }], // text-sm
		base: ['1rem', { lineHeight: '1.5rem' }], // text-base
		lg: ['1.125rem', { lineHeight: '1.75rem' }], // text-lg
		xl: ['1.25rem', { lineHeight: '1.75rem' }], // text-xl
		'2xl': ['1.5rem', { lineHeight: '2rem' }], // text-2xl
		'3xl': ['1.875rem', { lineHeight: '2.25rem' }], // text-3xl
		'4xl': ['2.25rem', { lineHeight: '2.5rem' }], // text-4xl
		'5xl': ['3rem', { lineHeight: '1' }], // text-5xl
		'6xl': ['3.75rem', { lineHeight: '1' }], // text-6xl
	},
	fontWeight: {
		normal: '400', // font-normal
		medium: '500', // font-medium
		semibold: '600', // font-semibold
		bold: '700', // font-bold
		extrabold: '800', // font-extrabold
	},
} as const;

/**
 * Spacing 토큰
 * 사용 예: p-2, m-4, gap-6, w-8, h-12 등
 * 모든 spacing 관련 유틸리티 클래스에서 사용됨
 */
export const spacing = {
	0: '0',
	1: '0.25rem', // 4px - p-1, m-1
	2: '0.5rem', // 8px - p-2, m-2
	3: '0.75rem', // 12px - p-3, m-3
	4: '1rem', // 16px - p-4, m-4
	5: '1.25rem', // 20px - p-5, m-5
	6: '1.5rem', // 24px - p-6, m-6
	8: '2rem', // 32px - p-8, m-8
	10: '2.5rem', // 40px - p-10, m-10
	12: '3rem', // 48px - p-12, m-12
	16: '4rem', // 64px - p-16, m-16
	20: '5rem', // 80px - p-20, m-20
	24: '6rem', // 96px - p-24, m-24
	32: '8rem', // 128px - p-32, m-32
} as const;

/**
 * Border Radius 토큰
 * 사용 예: rounded-{size}
 * 예: rounded-sm, rounded-base, rounded-lg, rounded-full
 */
export const borderRadius = {
	none: '0', // rounded-none
	sm: '0.125rem', // 2px - rounded-sm
	base: '0.25rem', // 4px - rounded-base
	md: '0.375rem', // 6px - rounded-md
	lg: '0.5rem', // 8px - rounded-lg
	xl: '0.75rem', // 12px - rounded-xl
	'2xl': '1rem', // 16px - rounded-2xl
	'3xl': '1.5rem', // 24px - rounded-3xl
	full: '9999px', // rounded-full
} as const;

/**
 * Box Shadow 토큰
 * 사용 예: shadow-{size}
 * 예: shadow-sm, shadow-md, shadow-lg, shadow-none
 */
export const shadows = {
	sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)', // shadow-sm
	base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', // shadow (기본값)
	md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // shadow-md
	lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', // shadow-lg
	xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', // shadow-xl
	'2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)', // shadow-2xl
	inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)', // shadow-inner
	none: 'none', // shadow-none
} as const;

/**
 * Transition 토큰
 * duration: duration-{size} (예: duration-fast, duration-slow)
 * easing: ease-{type} (예: ease-in, ease-out, ease-in-out)
 */
export const transitions = {
	duration: {
		fast: '150ms', // duration-fast
		base: '200ms', // duration-base
		slow: '300ms', // duration-slow
		slower: '500ms', // duration-slower
	},
	easing: {
		easeIn: 'cubic-bezier(0.4, 0, 1, 1)', // ease-in
		easeOut: 'cubic-bezier(0, 0, 0.2, 1)', // ease-out
		easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-in-out
	},
} as const;

/**
 * Z-Index 토큰
 * 사용 예: z-{name}
 * 예: z-dropdown, z-sticky, z-modal, z-tooltip
 * 레이어 순서: dropdown < sticky < fixed < modalBackdrop < modal < popover < tooltip
 */
export const zIndex = {
	dropdown: 1000, // z-dropdown
	sticky: 1020, // z-sticky
	fixed: 1030, // z-fixed
	modalBackdrop: 1040, // z-modalBackdrop
	modal: 1050, // z-modal
	popover: 1060, // z-popover
	tooltip: 1070, // z-tooltip
} as const;
