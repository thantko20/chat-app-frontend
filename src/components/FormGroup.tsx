import clsx from 'clsx';
import { ReactNode } from 'react';

export type FormGroupProps = {
  children?: ReactNode;
  className?: string;
};

export const FormGroup = ({ children, className = '' }: FormGroupProps) => {
  return (
    <div className={clsx('flex flex-col justify-start gap-2', className)}>
      {children}
    </div>
  );
};

export type InputLabelProps = {
  label?: string;
  htmlFor?: string;
  className?: string;
};

export const InputLabel = ({
  label,
  htmlFor,
  className = '',
}: InputLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx('text-inherit font-medium', className)}
    >
      {label}
    </label>
  );
};

export type InputErrorMessageProps = {
  text?: string;
  className?: string;
};

export const InputErrorMessage = ({
  text,
  className = '',
}: InputErrorMessageProps) => {
  return <p className={clsx('text-red-500', className)}>{text}</p>;
};
