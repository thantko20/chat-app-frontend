import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { Button } from '../../components/Button';
import { FieldWrapper } from '../../components/FieldWrapper';
import { Form } from '../../components/Form';
import { useLogin } from './api/useLogin';
import { useAuth } from './AuthProvider';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
});

export type TLoginForm = z.infer<typeof schema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLoginForm>({
    resolver: zodResolver(schema),
  });

  const mutation = useLogin();
  const navigate = useNavigate();
  const { saveUser } = useAuth();

  const onSubmit: SubmitHandler<TLoginForm> = (data) => {
    mutation.mutate(data, {
      onSuccess: ({ user, token }) => {
        toast.success('Login Successful.');
        saveUser(user, token);
        navigate('/');
      },
    });
  };

  return (
    <Form title='Login' onSubmit={handleSubmit(onSubmit)}>
      <FieldWrapper
        registration={register('email')}
        type='email'
        label='Email'
        error={errors.email?.message}
      />
      <FieldWrapper
        registration={register('password')}
        type='password'
        label='Password'
        error={errors.password?.message}
      />
      <Button type='submit' isLoading={mutation.isLoading}>
        Login
      </Button>
    </Form>
  );
};
