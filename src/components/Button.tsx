import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

const variants = {
  primary: 'bg-indigo-500 text-white hover:bg-indigo-600',
  secondary:
    'bg-transparent text-inherit border-2 border-indigo-500 hover:text-white hover:bg-indigo-600',
};

const sizes = {
  sm: 'text-sm px-3 py-1',
  md: 'text-normal px-4 py-2',
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  isLoading?: boolean;
  size?: keyof typeof sizes;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      className = '',
      ...props
    }: ButtonProps,
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed rounded shadow font-medium px-4 py-2 transition-colors',
          variants[variant],
          sizes[size],
          className,
        )}
        disabled={isLoading}
        {...props}
      >
        <span>{isLoading ? 'Loading' : props.children}</span>
      </button>
    );
  },
);
