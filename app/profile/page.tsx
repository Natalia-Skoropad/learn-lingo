import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { APP_URL, OG_IMAGE, SITE_NAME } from '@/lib/constants/metadata';
import { getCurrentUserProfile } from '@/lib/server/profile/profile.server';

import Breadcrumbs from '@/components/common/Breadcrumbs/Breadcrumbs';
import ProfileCard from '@/components/profile/ProfileCard/ProfileCard';

import css from './page.module.css';

//===========================================================================

const PROFILE_TITLE = 'Profile';

const PROFILE_DESCRIPTION =
  'Manage your LearnLingo profile details, contact information, and account settings.';

//===========================================================================

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),

  title: PROFILE_TITLE,
  description: PROFILE_DESCRIPTION,

  alternates: {
    canonical: '/profile',
  },

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: PROFILE_TITLE,
    description: PROFILE_DESCRIPTION,
    url: '/profile',
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'LearnLingo profile page preview',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: PROFILE_TITLE,
    description: PROFILE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

//===========================================================================

async function ProfilePage() {
  const profile = await getCurrentUserProfile();

  if (!profile) {
    redirect('/');
  }

  return (
    <main className={css.page}>
      <section className={css.section}>
        <div className="container">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Profile' }]}
          />

          <div className={css.heading}>
            <h1 className={css.title}>Profile</h1>
            <p className={css.text}>
              Your personal account information is collected here. Soon you will
              be able to edit these details directly from this page.
            </p>
          </div>

          <ProfileCard profile={profile} />
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
