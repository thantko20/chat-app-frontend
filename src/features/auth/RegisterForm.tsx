import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRegister } from './api/useRegister';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Form } from '../../components/Form';

const schema = z.object({
  email: z.string().trim().email('Invalid Email.'),
  password: z
    .string()
    .min(8, 'Must have at least 8 characters.')
    .max(16, 'Must not exceed 16 characters.'),
  firstName: z.string().trim().min(1, 'First Name is required.'),
  lastName: z.string().trim().min(1, 'Last Name is required.'),
  handleName: z.string().trim().min(1, 'Handle is required.'),
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
    <Form onSubmit={handleSubmit(onSubmit)} title='Register'>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input type='email' id='email' {...register('email')} />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.password}>
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input type='password' id='password' {...register('password')} />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.firstName}>
        <FormLabel htmlFor='firstName'>First Name</FormLabel>
        <Input type='text' id='firstName' {...register('firstName')} />
        <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.lastName}>
        <FormLabel htmlFor='lastName'>Last Name</FormLabel>
        <Input type='text' id='lastName' {...register('lastName')} />
        <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.handleName}>
        <FormLabel htmlFor='handleName'>Handle</FormLabel>
        <Input type='text' id='handleName' {...register('handleName')} />
        <FormErrorMessage>{errors.handleName?.message}</FormErrorMessage>
      </FormControl>

      <Button type='submit' isLoading={mutation.isLoading} colorScheme='green'>
        Register
      </Button>
    </Form>
  );
};
