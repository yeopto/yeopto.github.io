import React from 'react';
import { cn } from '@/lib/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
	children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
	primary:
		'bg-primary text-white hover:bg-primary-hover active:bg-primary-hover shadow-md hover:shadow-lg transition-all duration-fast',
	secondary:
		'bg-secondary text-white hover:bg-secondary/90 active:bg-secondary/80 shadow-md hover:shadow-lg transition-all duration-fast',
	outline:
		'border-2 border-primary text-primary hover:bg-primary hover:text-white active:bg-primary-hover transition-all duration-fast',
	ghost: 'text-foreground hover:bg-muted active:bg-muted/80 transition-colors duration-fast',
};

const sizeStyles: Record<ButtonSize, string> = {
	sm: 'px-3 py-1.5 text-sm',
	md: 'px-4 py-2 text-base',
	lg: 'px-6 py-3 text-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ variant = 'primary', size = 'md', loading = false, disabled, className, children, ...props },
		ref
	) => {
		const isDisabled = disabled || loading;

		return (
			<button
				ref={ref}
				disabled={isDisabled}
				className={cn(
					'inline-flex items-center justify-center rounded-lg font-medium',
					'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
					'disabled:opacity-50 disabled:cursor-not-allowed',
					'disabled:pointer-events-none',
					variantStyles[variant],
					sizeStyles[size],
					className
				)}
				aria-busy={loading}
				{...props}
			>
				{loading && (
					<svg
						className="mr-2 h-4 w-4 animate-spin"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
				)}
				{children}
			</button>
		);
	}
);

Button.displayName = 'Button';
