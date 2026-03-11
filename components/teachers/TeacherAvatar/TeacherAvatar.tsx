type Props = {
  avatarUrl: string;
  fullName: string;
};

//===============================================================

import css from './TeacherAvatar.module.css';

function TeacherAvatar({ avatarUrl, fullName }: Props) {
  return (
    <div className={css.avatarWrap}>
      <div className={css.avatarBorder}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={css.avatar}
          src={avatarUrl}
          alt={fullName}
          width={96}
          height={96}
        />
      </div>

      <span className={css.statusDot} />
    </div>
  );
}

export default TeacherAvatar;
