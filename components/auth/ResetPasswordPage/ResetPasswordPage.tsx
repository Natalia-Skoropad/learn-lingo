'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FirebaseError } from 'firebase/app';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import Image from 'next/image';

import { getFirebaseAuth } from '@/lib/firebase/config';
import { resetPasswordConfirmSchema } from '@/lib/validations/resetPasswordConfirmSchema';

import Button from '@/components/common/Button/Button';
import EmptyState from '@/components/common/EmptyState/EmptyState';
import InlineLoader from '@/components/common/InlineLoader/InlineLoader';
import FormField from '@/components/forms/FormField/FormField';

import css from './ResetPasswordPage.module.css';

//===============================================================

type Props = {
  mode: string;
  oobCode: string;
  continueUrl: string;
  lang: string;
};

type FormValues = {
  password: string;
  confirmPassword: string;
};

//===============================================================

function ResetPasswordPage({ mode, oobCode, continueUrl }: Props) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isCheckingCode, setIsCheckingCode] = useState(true);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(resetPasswordConfirmSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const isResetMode = useMemo(() => mode === 'resetPassword', [mode]);

  useEffect(() => {
    const auth = getFirebaseAuth();

    async function checkCode() {
      if (!isResetMode || !oobCode) {
        setIsCodeValid(false);
        setIsCheckingCode(false);
        return;
      }

      try {
        const restoredEmail = await verifyPasswordResetCode(auth, oobCode);
        setEmail(restoredEmail);
        setIsCodeValid(true);
      } catch (error) {
        console.error(error);
        setIsCodeValid(false);
      } finally {
        setIsCheckingCode(false);
      }
    }

    void checkCode();
  }, [isResetMode, oobCode]);

  const onSubmit = async ({ password }: FormValues) => {
    try {
      const auth = getFirebaseAuth();

      await confirmPasswordReset(auth, oobCode, password);

      toast.success('Password changed successfully.');
      setIsSuccess(true);
    } catch (error) {
      console.error(error);

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/expired-action-code':
          case 'auth/invalid-action-code':
            toast.error('This reset link is invalid or has expired.');
            return;
          case 'auth/weak-password':
            toast.error('Password is too weak.');
            return;
          default:
            toast.error('Failed to reset password. Please try again.');
            return;
        }
      }

      toast.error('Failed to reset password. Please try again.');
    }
  };

  const handleContinue = () => {
    const safePath =
      continueUrl && continueUrl.startsWith('/') ? continueUrl : '/';

    router.push(safePath);
  };

  if (isCheckingCode) {
    return (
      <main className={css.page}>
        <div className="container">
          <InlineLoader text="Checking reset link..." />
        </div>
      </main>
    );
  }

  if (!isResetMode || !oobCode || !isCodeValid) {
    return (
      <main className={css.page}>
        <div className="container">
          <EmptyState
            title="Invalid or expired link"
            text="This password reset link is no longer valid. Please request a new one."
          />
        </div>
      </main>
    );
  }

  if (isSuccess) {
    return (
      <main className={css.page}>
        <div className="container">
          <section className={css.hero}>
            <div className={css.card}>
              <p className={css.kicker}>All set</p>

              <h1 className={css.title}>Password changed successfully</h1>

              <p className={css.text}>
                Your password has been updated. You can now log in with your new
                password and continue using LearnLingo.
              </p>

              <Button
                type="button"
                className={css.button}
                onClick={handleContinue}
              >
                Continue
              </Button>
            </div>

            <div className={css.imageBox} aria-hidden="true">
              <Image
                src="/successful-password-recovery.jpg"
                alt=""
                fill
                sizes="(min-width: 1440px) 520px, (min-width: 768px) 40vw, 100vw"
                className={css.image}
              />
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className={css.page}>
      <div className="container">
        <section className={css.hero}>
          <div className={css.card}>
            <h1 className={css.title}>Set a new password</h1>
            <p className={css.text}>
              Create a new password for <strong>{email}</strong>.
            </p>

            <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
              <FormField
                type="password"
                placeholder="New password*"
                maxLength={20}
                error={errors.password?.message}
                {...register('password')}
              />

              <FormField
                type="password"
                placeholder="Confirm password*"
                maxLength={20}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />

              <Button
                type="submit"
                variant={isValid && !isSubmitting ? 'common' : 'disabled'}
                disabled={!isValid || isSubmitting}
                className={css.button}
              >
                {isSubmitting ? 'Saving...' : 'Save new password'}
              </Button>
            </form>

            <p className={css.helper}>Password must contain 6–20 characters.</p>
          </div>

          <div className={css.imageBox} aria-hidden="true">
            <Image
              src="/password-recovery.jpg"
              alt=""
              fill
              sizes="(min-width: 1440px) 520px, (min-width: 768px) 40vw, 100vw"
              className={css.image}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default ResetPasswordPage;
