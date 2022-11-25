import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { Form } from '../../components/Form';
import storage from '../../utils/storage';
import { useLogin } from './api/useLogin';
import { useAuth } from './AuthProvider';

const schema = z.object({
  email: z.string().email('Invalid Email.'),
  password: z
    .string()
    .min(8, 'Must have at least 8 characters.')
    .max(16, 'Allow up to only 16 characters.'),
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
  const { saveAuth } = useAuth();

  const onSubmit: SubmitHandler<TLoginForm> = (data) => {
    mutation.mutate(data, {
      onSuccess: ({ user, token }) => {
        saveAuth(user);
        toast.success('Login Successful.');
        storage.setToken(token);
        navigate('/');
      },
    });
  };

  return (
    <Form title='Login' onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input type='email' id='email' {...register('email')} />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.password}>
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input type='password' id='password' {...register('password')} />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <Button type='submit' colorScheme='green' isLoading={mutation.isLoading}>
        Login
      </Button>
    </Form>
  );
};
