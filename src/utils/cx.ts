import { cx as cvaCX } from 'class-variance-authority';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cx = (...inputs: ClassValue[]): string => twMerge(cvaCX(inputs));
