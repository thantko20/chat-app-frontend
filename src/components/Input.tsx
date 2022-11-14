import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  type: 'text' | 'email' | 'password';
  className?: string;
  registration?: Partial<UseFormRegisterReturn>;
};

export const Input = ({
  type = 'text',
  className = '',
  registration,
  ...props
}: InputProps) => {
  return (
    <input
      type={type}
      {...registration}
      {...props}
      className={clsx(
        'border-b-2 border-gray-200 w-full outline-none focus:border-indigo-500 p-1 text-neutral-700 transition-colors',
        className,
      )}
    />
  );
};
