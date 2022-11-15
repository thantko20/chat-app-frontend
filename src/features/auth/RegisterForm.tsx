import { useForm, SubmitHandler } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { FieldWrapper } from '../../components/FieldWrapper';
import { useRegister } from './api/useRegister';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';

const schema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(16),
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  handleName: z.string().trim().min(1),
});

export type TRegisterForm = z.infer<typeof schema>;

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TRegisterForm>({
    resolver: zodResolver(schema),
  });

  const mutation = useRegister();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TRegisterForm> = (data) =>
    mutation.mutate(data, {
      onSuccess: (data) => {
        reset();
        console.log(data);
        toast.success('Registration Successful.');
        navigate('/auth/login');
      },
    });

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      title='Register'
      className='max-w-lg mx-auto'
    >
      <FieldWrapper
        type='email'
        registration={register('email')}
        label='Email'
        error={errors.email?.message}
      />
      <FieldWrapper
        type='password'
        registration={register('password')}
        label='Password'
        error={errors.password?.message}
      />
      <FieldWrapper
        type='text'
        registration={register('firstName')}
        label='First Name'
        error={errors.firstName?.message}
      />
      <FieldWrapper
        type='text'
        registration={register('lastName')}
        label='Last Name'
        error={errors.lastName?.message}
      />
      <FieldWrapper
        type='text'
        registration={register('handleName')}
        label='Handlename'
        error={errors.handleName?.message}
      />
      <Button type='submit' isLoading={mutation.isLoading}>
        Register
      </Button>
    </Form>
  );
};
