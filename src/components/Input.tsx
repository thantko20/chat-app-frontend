import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  UseFormRegister<FieldValues> & {
    type: 'text' | 'email' | 'password';
    className?: string;
  };

export const Input = ({
  type = 'text',
  className = '',
  ...props
}: InputProps) => {
  const name = props.name || props.id;

  return (
    <input
      type={type}
      {...props}
      name={name}
      className={clsx(
        'border-b-2 border-gray-200 max-w-full outline-none focus:border-indigo-500 p-1 text-neutral-700 transition-colors',
        className,
      )}
    />
  );
};
