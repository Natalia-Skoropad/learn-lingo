'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import type { Teacher } from '@/types/teacher';
import type { BookLessonFormValues } from '@/types/forms';

import Button from '@/components/common/Button/Button';
import FormField from '@/components/forms/FormField/FormField';
import { bookLessonSchema } from '@/lib/validations/bookLessonSchema';

import css from './BookLessonForm.module.css';

//===============================================================

type Props = {
  teacher: Teacher;
  onSuccess: () => void;
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

function BookLessonForm({ teacher, onSuccess }: Props) {
  const fullTeacherName = `${teacher.name} ${teacher.surname}`;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<BookLessonFormValues>({
    resolver: yupResolver(bookLessonSchema),
    mode: 'onChange',
    defaultValues: {
      reason: 'Career and business',
      fullName: '',
      email: '',
      phone: '',
    },
  });

  const fullNameValue = watch('fullName');
  const emailValue = watch('email');
  const phoneValue = watch('phone');

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
        <img
          src={teacher.avatar_url}
          alt={fullTeacherName}
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

        <span className={css.radioError}>{errors.reason?.message || ' '}</span>
      </fieldset>

      <div className={css.fields}>
        <FormField
          label="Full Name"
          type="text"
          requiredMark
          maxLength={20}
          count={fullNameValue.length}
          error={errors.fullName?.message}
          {...register('fullName')}
        />

        <FormField
          label="Email"
          type="email"
          requiredMark
          maxLength={64}
          count={emailValue.length}
          error={errors.email?.message}
          {...register('email')}
        />

        <FormField
          label="Phone number"
          type="tel"
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
