import ShimmerImage from '@/components/common/ShimmerImage/ShimmerImage';

import css from './TeacherAvatar.module.css';

//===============================================================

type Props = {
  avatarUrl: string;
  fullName: string;
  isOnline: boolean;
};

//===============================================================

function TeacherAvatar({ avatarUrl, fullName, isOnline }: Props) {
  return (
    <div className={css.avatarWrap}>
      <div className={css.avatarBorder}>
        <ShimmerImage
          src={avatarUrl}
          alt={fullName}
          sizes="96px"
          wrapClassName={css.avatarImageWrap}
          className={css.avatar}
        />
      </div>

      <span
        className={isOnline ? css.statusDotOnline : css.statusDotOffline}
        aria-label={isOnline ? 'Teacher is online' : 'Teacher is offline'}
        role="status"
      />
    </div>
  );
}

export default TeacherAvatar;
