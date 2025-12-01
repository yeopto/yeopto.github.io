import React from 'react';
import { cn } from '@/lib/utils/cn';

export type TypographyVariant =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'body'
	| 'body2'
	| 'caption'
	| 'overline';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
	variant?: TypographyVariant;
	component?: React.ElementType;
	children: React.ReactNode;
}

const variantStyles: Record<TypographyVariant, string> = {
	h1: 'text-5xl font-extrabold tracking-tight',
	h2: 'text-4xl font-bold tracking-tight',
	h3: 'text-3xl font-bold tracking-tight',
	h4: 'text-2xl font-semibold tracking-tight',
	h5: 'text-xl font-semibold',
	h6: 'text-lg font-semibold',
	body: 'text-base leading-relaxed',
	body2: 'text-sm leading-relaxed',
	caption: 'text-xs text-muted-foreground',
	overline: 'text-xs font-semibold uppercase tracking-wider text-muted-foreground',
};

const defaultComponents: Record<TypographyVariant, React.ElementType> = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	h6: 'h6',
	body: 'p',
	body2: 'p',
	caption: 'span',
	overline: 'span',
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
	({ variant = 'body', component, className, children, ...props }, ref) => {
		const Component = component || defaultComponents[variant];

		return React.createElement(
			Component,
			{
				ref,
				className: cn(variantStyles[variant], className),
				...props,
			},
			children
		);
	}
);

Typography.displayName = 'Typography';
