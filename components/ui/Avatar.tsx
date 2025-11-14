import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
	src?: string;
	alt?: string;
	size?: AvatarSize;
	fallback?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
	sm: 'h-8 w-8',
	md: 'h-10 w-10',
	lg: 'h-12 w-12',
	xl: 'h-16 w-16',
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
	({ src, alt = '', size = 'md', fallback, className, ...props }, ref) => {
		const sizeClass = sizeStyles[size];

		return (
			<div
				ref={ref}
				className={cn(
					'relative flex items-center justify-center overflow-hidden rounded-full bg-muted',
					sizeClass,
					className
				)}
				{...props}
			>
				{src ? (
					<Image
						src={src}
						alt={alt}
						fill
						className="object-cover"
						sizes={`${size === 'sm' ? '32' : size === 'md' ? '40' : size === 'lg' ? '48' : '64'}px`}
					/>
				) : (
					<span className="text-sm font-medium text-muted-foreground">
						{fallback || alt.charAt(0).toUpperCase()}
					</span>
				)}
			</div>
		);
	}
);

Avatar.displayName = 'Avatar';
