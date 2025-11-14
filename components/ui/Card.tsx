import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
	children: React.ReactNode;
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
	children: React.ReactNode;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					'rounded-xl border border-border bg-card text-card-foreground shadow-md',
					'hover:shadow-lg transition-shadow duration-fast',
					className
				)}
				{...props}
			>
				{children}
			</div>
		);
	}
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
				{children}
			</div>
		);
	}
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
	({ className, children, ...props }, ref) => {
		return (
			<h3
				ref={ref}
				className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
				{...props}
			>
				{children}
			</h3>
		);
	}
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
	({ className, children, ...props }, ref) => {
		return (
			<p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props}>
				{children}
			</p>
		);
	}
);
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn('p-6 pt-0', className)} {...props}>
				{children}
			</div>
		);
	}
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props}>
				{children}
			</div>
		);
	}
);
CardFooter.displayName = 'CardFooter';
