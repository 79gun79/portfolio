import type { HTMLAttributes } from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerThickness = 'thin' | 'thick';

type SpinnerProps = {
  size?: SpinnerSize;
  thickness?: SpinnerThickness;
  className?: string;
  label?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'h-5 w-5',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
};

const thicknessClasses: Record<SpinnerThickness, string> = {
  thin: 'border-2',
  thick: 'border-4',
};

export function Spinner({
  size = 'md',
  thickness = 'thin',
  className,
  label = 'Loading',
  ...props
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={
        `${sizeClasses[size]} animate-spin rounded-full ` +
        `${thicknessClasses[thickness]} border-slate-200 border-t-emerald-600 ` +
        (className ?? '')
      }
      {...props}
    />
  );
}
