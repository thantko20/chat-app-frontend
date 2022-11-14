import { UseFormRegisterReturn } from 'react-hook-form';
import { Input } from './Input';

export type FieldWrapperProps = {
  label?: string;
  type?: 'text' | 'email' | 'password';
  registration: Partial<UseFormRegisterReturn>;
  error?: string;
  className?: string;
};

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { type = 'text', label, className = '', registration, error } = props;

  return (
    <div className='flex flex-col items-start'>
      <label htmlFor={registration.name} className='text-inherit font-medium'>
        {label}
      </label>
      <Input type={type} id={registration.name} registration={registration} />
      <p className='text-red-500'>{error}</p>
    </div>
  );
};
