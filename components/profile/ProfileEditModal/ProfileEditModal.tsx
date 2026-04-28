'use client';

import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';

import type { ProfileEditField } from '@/types/profile';

import {
  createProfileEditSchema,
  type ProfileEditFormValues,
} from '@/lib/validations/profileEditSchema';

import Button from '@/components/common/Button/Button';
import FormField from '@/components/forms/FormField/FormField';
import ModalBase from '@/components/modals/ModalBase/ModalBase';

import css from './ProfileEditModal.module.css';

//===============================================================

type Props = {
  field: ProfileEditField;
  defaultValue: string;
  onClose: () => void;
  onSubmit: (value: string) => Promise<void>;
};

//===============================================================

function getTitle(field: ProfileEditField): string {
  switch (field) {
    case 'name':
      return 'Edit name';
    case 'email':
      return 'Edit email';
    case 'phone':
      return 'Edit phone';
    default:
      return 'Edit profile';
  }
}

function getPlaceholder(field: ProfileEditField): string {
  switch (field) {
    case 'name':
      return 'Full Name*';
    case 'email':
      return 'Email*';
    case 'phone':
      return 'Phone number*';
    default:
      return 'Value*';
  }
}

function getInputType(field: ProfileEditField): string {
  switch (field) {
    case 'email':
      return 'email';
    case 'phone':
      return 'tel';
    default:
      return 'text';
  }
}

function getMaxLength(field: ProfileEditField): number {
  switch (field) {
    case 'email':
      return 64;
    case 'phone':
      return 20;
    default:
      return 20;
  }
}

//===============================================================

function ProfileEditModal({ field, defaultValue, onClose, onSubmit }: Props) {
  const schema = useMemo(() => createProfileEditSchema(field), [field]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProfileEditFormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      value: defaultValue,
    },
  });

  const value = useWatch({
    control,
    name: 'value',
    defaultValue,
  });

  const handleFormSubmit = async ({ value }: ProfileEditFormValues) => {
    await onSubmit(value.trim());
  };

  return (
    <ModalBase title={getTitle(field)} onClose={onClose}>
      <form className={css.form} onSubmit={handleSubmit(handleFormSubmit)}>
        {field === 'email' ? (
          <p className={css.note}>
            After changing your email, use the new email for future sign-ins.
          </p>
        ) : null}

        <FormField
          type={getInputType(field)}
          placeholder={getPlaceholder(field)}
          maxLength={getMaxLength(field)}
          count={value.length}
          error={errors.value?.message}
          {...register('value')}
        />

        <Button
          type="submit"
          variant={isValid && !isSubmitting ? 'common' : 'disabled'}
          disabled={!isValid || isSubmitting}
          className={css.submitBtn}
        >
          {isSubmitting ? 'Saving...' : 'Save changes'}
        </Button>
      </form>
    </ModalBase>
  );
}

export default ProfileEditModal;
