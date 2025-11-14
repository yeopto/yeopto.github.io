import React from 'react';
import { cn } from '@/lib/utils/cn';

export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
	orientation?: DividerOrientation;
	label?: string;
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
	({ orientation = 'horizontal', label, className, ...props }, ref) => {
		if (orientation === 'vertical') {
			return (
				<div
					className={cn('w-px h-full bg-border', className)}
					role="separator"
					aria-orientation="vertical"
					{...props}
				/>
			);
		}

		if (label) {
			return (
				<div className={cn('relative flex items-center py-4', className)} {...props}>
					<hr ref={ref} className="flex-1 border-t border-border" aria-label={label} />
					<span className="px-4 text-sm text-muted-foreground">{label}</span>
					<hr className="flex-1 border-t border-border" />
				</div>
			);
		}

		return (
			<hr
				ref={ref}
				className={cn('border-t border-border', className)}
				role="separator"
				aria-orientation="horizontal"
				{...props}
			/>
		);
	}
);

Divider.displayName = 'Divider';
