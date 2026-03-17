'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FirebaseError } from 'firebase/app';

import type { ForgotPasswordFormValues } from '@/types/forms';
import { forgotPasswordSchema } from '@/lib/validations/forgotPasswordSchema';
import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';

import Button from '@/components/common/Button/Button';
import TextActionButton from '@/components/common/TextActionButton/TextActionButton';
import FormField from '@/components/forms/FormField/FormField';

import css from './ForgotPasswordForm.module.css';

//===============================================================

type Props = {
  onSuccess: () => void;
};

//===============================================================

function ForgotPasswordForm({ onSuccess }: Props) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(forgotPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const emailValue = useWatch({
    control,
    name: 'email',
    defaultValue: '',
  });

  const { resetPassword } = useAuth();
  const { openModal } = useModal();

  const handleBackToLogin = () => {
    openModal('login');
  };

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      await resetPassword(values);

      toast.success(
        'If an account with that email exists, you will receive a password reset email shortly. Please check your inbox.'
      );
      onSuccess();
    } catch (error) {
      console.error(error);

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-email':
            toast.error('Invalid email address.');
            return;
          case 'auth/too-many-requests':
            toast.error('Too many attempts. Please try again later.');
            return;
          case 'auth/invalid-continue-uri':
            toast.error('Invalid redirect URL in password reset settings.');
            return;
          case 'auth/unauthorized-continue-uri':
            toast.error('This domain is not authorized in Firebase.');
            return;
          default:
            toast.error('Failed to send reset email. Please try again.');
            return;
        }
      }

      if (error instanceof Error) {
        toast.error(
          error.message || 'Failed to send reset email. Please try again.'
        );
        return;
      }

      toast.error('Failed to send reset email. Please try again.');
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={css.text}>
        Enter your email address and we will send you a link to reset your
        password.
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
      </div>

      <Button
        type="submit"
        variant={isValid && !isSubmitting ? 'common' : 'disabled'}
        disabled={!isValid || isSubmitting}
        className={css.submitBtn}
      >
        {isSubmitting ? 'Sending...' : 'Send reset link'}
      </Button>

      <TextActionButton className={css.backButton} onClick={handleBackToLogin}>
        Back to Log In
      </TextActionButton>
    </form>
  );
}

export default ForgotPasswordForm;
