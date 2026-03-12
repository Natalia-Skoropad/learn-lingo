'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import type { RegisterFormValues } from '@/types/forms';

import Button from '@/components/common/Button/Button';
import FormField from '@/components/forms/FormField/FormField';
import { registerSchema } from '@/lib/validations/registerSchema';

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

  const passwordValue = useWatch({
    control,
    name: 'password',
    defaultValue: '',
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      console.log('Register:', values);

      toast.success('Registration successful!');
      onSuccess();
    } catch (error) {
      console.error(error);
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
          count={passwordValue.length}
          error={errors.password?.message}
          {...register('password')}
        />
      </div>

      <Button
        type="submit"
        variant={isValid && !isSubmitting ? 'registration' : 'disabled'}
        disabled={!isValid || isSubmitting}
        className={css.submitBtn}
      >
        Sign Up
      </Button>
    </form>
  );
}

export default RegisterForm;
