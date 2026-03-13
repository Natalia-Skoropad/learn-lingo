'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FirebaseError } from 'firebase/app';

import type { RegisterFormValues } from '@/types/forms';
import { registerSchema } from '@/lib/validations/registerSchema';
import { useAuth } from '@/hooks/useAuth';

import Button from '@/components/common/Button/Button';
import FormField from '@/components/forms/FormField/FormField';

import css from './RegisterForm.module.css';

//===============================================================

type Props = {
  onSuccess: () => void;
};

//===============================================================

function RegisterForm({ onSuccess }: Props) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const fullNameValue = useWatch({
    control,
    name: 'fullName',
    defaultValue: '',
  });

  const emailValue = useWatch({
    control,
    name: 'email',
    defaultValue: '',
  });

  const { register: registerUser } = useAuth();

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser(values);

      toast.success('Registration successful!');
      onSuccess();
    } catch (error) {
      console.error(error);

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            toast.error('This email is already in use.');
            return;
          case 'auth/invalid-email':
            toast.error('Invalid email address.');
            return;
          case 'auth/weak-password':
            toast.error('Password is too weak.');
            return;
          case 'auth/configuration-not-found':
            toast.error('Firebase Authentication is not configured yet.');
            return;
          default:
            toast.error('Registration failed. Please try again.');
            return;
        }
      }

      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={css.text}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>

      <div className={css.fields}>
        <FormField
          type="text"
          placeholder="Full Name*"
          maxLength={20}
          count={fullNameValue.length}
          error={errors.fullName?.message}
          {...register('fullName')}
        />

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
        {isSubmitting ? 'Wait a minute...' : 'Sign Up'}
      </Button>
    </form>
  );
}

export default RegisterForm;
