import Image from 'next/image';

import css from './ProfileAvatar.module.css';

//===============================================================

type Props = {
  name: string;
  avatarUrl?: string;
};

//===============================================================

function ProfileAvatar({ name, avatarUrl }: Props) {
  const trimmedName = name.trim() || 'User';
  const initial = trimmedName.charAt(0).toUpperCase();

  return (
    <div className={css.wrap}>
      <div className={css.avatarBox}>
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={`${trimmedName} avatar`}
            fill
            sizes="112px"
            className={css.image}
          />
        ) : (
          <span className={css.initial} aria-hidden="true">
            {initial}
          </span>
        )}
      </div>

      <div className={css.actions}>
        <button type="button" className={css.actionBtn} disabled>
          Upload avatar
        </button>

        <button type="button" className={css.actionBtn} disabled>
          Edit
        </button>

        <button type="button" className={css.dangerBtn} disabled>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProfileAvatar;
