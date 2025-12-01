import React from 'react';
import { cn } from '@/lib/utils/cn';

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
	variant?: BadgeVariant;
	size?: BadgeSize;
	children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
	default: 'bg-muted text-muted-foreground',
	primary: 'bg-primary text-white',
	secondary: 'bg-secondary text-white',
	success: 'bg-success text-white',
	warning: 'bg-warning text-foreground',
	error: 'bg-error text-white',
};

const sizeStyles: Record<BadgeSize, string> = {
	sm: 'px-2 py-0.5 text-xs',
	md: 'px-2.5 py-1 text-sm',
	lg: 'px-3 py-1.5 text-base',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
	({ variant = 'default', size = 'md', className, children, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={cn(
					'inline-flex items-center rounded-full font-medium',
					variantStyles[variant],
					sizeStyles[size],
					className
				)}
				{...props}
			>
				{children}
			</span>
		);
	}
);

Badge.displayName = 'Badge';
