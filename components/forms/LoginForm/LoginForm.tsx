'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FirebaseError } from 'firebase/app';

import type { LoginFormValues } from '@/types/forms';
import { loginSchema } from '@/lib/validations/loginSchema';
import { useAuth } from '@/hooks/useAuth';

import Button from '@/components/common/Button/Button';
import FormField from '@/components/forms/FormField/FormField';

import css from './LoginForm.module.css';

//===============================================================

type Props = {
  onSuccess: () => void;
};

//===============================================================

function LoginForm({ onSuccess }: Props) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const emailValue = useWatch({
    control,
    name: 'email',
    defaultValue: '',
  });

  const passwordValue = useWatch({
    control,
    name: 'password',
    defaultValue: '',
  });

  const { login } = useAuth();

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);

      toast.success('Logged in successfully!');
      onSuccess();
    } catch (error) {
      console.error(error);

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-credential':
          case 'auth/wrong-password':
          case 'auth/user-not-found':
            toast.error('Invalid email or password.');
            return;
          default:
            toast.error('Login failed. Please try again.');
            return;
        }
      }

      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={css.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a teacher.
      </p>

      <div className={css.fields}>
        <FormField
          type="email"
          placeholder="Email*"
          maxLength={64}
          count={emailValue.length}
          error={errors.email?.message}
          {...register('email')}
        />

        <FormField
          type="password"
          placeholder="Password*"
          maxLength={20}
          count={passwordValue.length}
          error={errors.password?.message}
          {...register('password')}
        />
      </div>

      <Button
        type="submit"
        variant={isValid && !isSubmitting ? 'common' : 'disabled'}
        disabled={!isValid || isSubmitting}
        className={css.submitBtn}
      >
        Log In
      </Button>
    </form>
  );
}

export default LoginForm;
