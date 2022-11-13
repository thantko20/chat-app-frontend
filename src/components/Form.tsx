import clsx from 'clsx';
import { ReactNode } from 'react';

export type FormProps = {
  title?: string;
  className?: string;
  children?: ReactNode;
  onSubmit: () => {};
};

export const Form = ({
  onSubmit,
  title = '',
  className = '',
  children,
}: FormProps) => {
  return (
    <div className={clsx('p-2', className)}>
      <h2 className='text-lg font-medium text-gray-800'>{title}</h2>
      <form onSubmit={onSubmit} className='mt-2 flex flex-col gap-4'>
        {children}
      </form>
    </div>
  );
};
