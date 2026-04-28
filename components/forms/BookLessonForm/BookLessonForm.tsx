'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import type { Teacher } from '@/types/teacher';
import type { BookLessonFormValues } from '@/types/forms';
import { bookLessonSchema } from '@/lib/validations/bookLessonSchema';

import Button from '@/components/common/Button/Button';
import ShimmerImage from '@/components/common/ShimmerImage/ShimmerImage';
import FormField from '@/components/forms/FormField/FormField';

import css from './BookLessonForm.module.css';

//===============================================================

type Props = {
  teacher: Teacher;
  onSuccess: () => void;
  prefilledName?: string;
  prefilledEmail?: string;
  prefilledPhone?: string;
};

//===============================================================

const reasons: BookLessonFormValues['reason'][] = [
  'Career and business',
  'Lesson for kids',
  'Living abroad',
  'Exams and coursework',
  'Culture, travel or hobby',
];

//===============================================================

function BookLessonForm({
  teacher,
  onSuccess,
  prefilledName = '',
  prefilledEmail = '',
  prefilledPhone = '',
}: Props) {
  const fullTeacherName = `${teacher.name} ${teacher.surname}`;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<BookLessonFormValues>({
    resolver: yupResolver(bookLessonSchema),
    mode: 'onChange',
    defaultValues: {
      reason: 'Career and business',
      fullName: prefilledName,
      email: prefilledEmail,
      phone: prefilledPhone,
    },
  });

  const fullNameValue = useWatch({
    control,
    name: 'fullName',
    defaultValue: prefilledName,
  });

  const emailValue = useWatch({
    control,
    name: 'email',
    defaultValue: prefilledEmail,
  });

  const phoneValue = useWatch({
    control,
    name: 'phone',
    defaultValue: prefilledPhone,
  });

  const onSubmit = async (values: BookLessonFormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      console.log('Book lesson:', {
        teacherId: teacher.id,
        ...values,
      });

      toast.success('Trial lesson booked successfully!');
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error('Booking failed. Please try again.');
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={css.text}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>

      <div className={css.teacher}>
        <ShimmerImage
          src={teacher.avatar_url}
          alt={fullTeacherName}
          sizes="44px"
          wrapClassName={css.avatarWrap}
          className={css.avatar}
        />

        <div>
          <p className={css.teacherLabel}>Your teacher</p>
          <p className={css.teacherName}>{fullTeacherName}</p>
        </div>
      </div>

      <fieldset className={css.fieldset}>
        <legend className={css.legend}>
          What is your main reason for learning English?
        </legend>

        <div className={css.radioGroup}>
          {reasons.map((reason) => (
            <label key={reason} className={css.radioLabel}>
              <input
                type="radio"
                value={reason}
                {...register('reason')}
                className={css.radioInput}
              />
              <span>{reason}</span>
            </label>
          ))}
        </div>
      </fieldset>

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
          type="tel"
          placeholder="Phone number*"
          maxLength={20}
          count={phoneValue.length}
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      <Button
        type="submit"
        variant={isValid && !isSubmitting ? 'common' : 'disabled'}
        disabled={!isValid || isSubmitting}
        className={css.submitBtn}
      >
        Book
      </Button>
    </form>
  );
}

export default BookLessonForm;
