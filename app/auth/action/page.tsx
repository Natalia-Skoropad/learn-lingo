import ResetPasswordPage from '@/components/auth/ResetPasswordPage/ResetPasswordPage';

//===============================================================

type Props = {
  searchParams: Promise<{
    mode?: string;
    oobCode?: string;
    continueUrl?: string;
    lang?: string;
  }>;
};

//===============================================================

async function AuthActionPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <ResetPasswordPage
      mode={params.mode ?? ''}
      oobCode={params.oobCode ?? ''}
      continueUrl={params.continueUrl ?? '/'}
      lang={params.lang ?? 'en'}
    />
  );
}

export default AuthActionPage;
