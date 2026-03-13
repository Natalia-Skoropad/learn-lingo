export type BookLessonReason =
  | 'Career and business'
  | 'Lesson for kids'
  | 'Living abroad'
  | 'Exams and coursework'
  | 'Culture, travel or hobby';

//===============================================================

export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  fullName: string;
  email: string;
  password: string;
};

export type ForgotPasswordFormValues = {
  email: string;
};

export type BookLessonFormValues = {
  reason: BookLessonReason;
  fullName: string;
  email: string;
  phone: string;
};
