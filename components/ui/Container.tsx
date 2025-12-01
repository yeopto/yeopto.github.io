import React from 'react';
import { cn } from '@/lib/utils/cn';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: ContainerSize;
	children: React.ReactNode;
}

const sizeStyles: Record<ContainerSize, string> = {
	sm: 'max-w-screen-sm',
	md: 'max-w-screen-md',
	lg: 'max-w-screen-lg',
	xl: 'max-w-screen-xl',
	full: 'max-w-full',
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
	({ size = 'lg', className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn('mx-auto w-full px-4', sizeStyles[size], className)} {...props}>
				{children}
			</div>
		);
	}
);

Container.displayName = 'Container';
