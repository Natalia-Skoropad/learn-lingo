import type { UserProfile } from '@/types/profile';

import ProfileAvatar from '@/components/profile/ProfileAvatar/ProfileAvatar';
import ProfileField from '@/components/profile/ProfileField/ProfileField';

import css from './ProfileCard.module.css';

//===============================================================

type Props = {
  profile: UserProfile;
};

//===============================================================

function formatDate(value?: string): string {
  if (!value) return 'Not available';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Not available';
  }

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

//===============================================================

function ProfileCard({ profile }: Props) {
  const phoneValue = profile.phone?.trim() || 'Not added yet';

  return (
    <div className={css.card}>
      <div className={css.avatarColumn}>
        <ProfileAvatar name={profile.name} avatarUrl={profile.avatarUrl} />
      </div>

      <div className={css.infoColumn}>
        <div className={css.header}>
          <p className={css.kicker}>Personal account</p>
          <h2 className={css.title}>Profile details</h2>
          <p className={css.text}>
            Manage your personal information. Editing actions are prepared and
            will be connected in the next step.
          </p>
        </div>

        <div className={css.fields}>
          <ProfileField
            label="Name"
            value={profile.name}
            actionLabel="Edit name"
          />

          <ProfileField
            label="Email"
            value={profile.email}
            actionLabel="Edit email"
          />

          <ProfileField
            label="Phone"
            value={phoneValue}
            actionLabel={profile.phone ? 'Edit phone' : 'Add phone'}
            dangerActionLabel={profile.phone ? 'Delete phone' : undefined}
          />

          <ProfileField
            label="Profile created"
            value={formatDate(profile.createdAt)}
          />

          <ProfileField
            label="Password"
            value="••••••••"
            actionLabel="Change password"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
