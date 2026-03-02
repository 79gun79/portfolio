import type { HTMLAttributes } from 'react';

type SkeletonProps = {
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded bg-slate-100 ${className ?? ''}`}
      {...props}
    />
  );
}
