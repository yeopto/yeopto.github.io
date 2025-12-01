'use client';

import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

export interface SearchBarProps {
	query: string;
	onQueryChange: (query: string) => void;
	onClear?: () => void;
	placeholder?: string;
	className?: string;
}

/**
 * 검색 입력 바 컴포넌트
 */
export function SearchBar({
	query,
	onQueryChange,
	onClear,
	placeholder = '포스트 검색...',
	className,
}: SearchBarProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	// ESC 키로 검색어 초기화
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && inputRef.current === document.activeElement) {
				onQueryChange('');
				if (onClear) {
					onClear();
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [onQueryChange, onClear]);

	const handleClear = () => {
		onQueryChange('');
		if (onClear) {
			onClear();
		}
		inputRef.current?.focus();
	};

	return (
		<div className={cn('relative w-full', className)}>
			<div className="relative flex items-center">
				<Input
					ref={inputRef}
					type="text"
					value={query}
					onChange={(e) => onQueryChange(e.target.value)}
					placeholder={placeholder}
					className="pr-10"
					aria-label="검색어 입력"
				/>
				{query && (
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={handleClear}
						className="absolute right-1 h-8 w-8 p-0"
						aria-label="검색어 지우기"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</Button>
				)}
			</div>
		</div>
	);
}

