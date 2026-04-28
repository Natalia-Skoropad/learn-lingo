import css from './ProfileField.module.css';

//===============================================================

type Props = {
  label: string;
  value: string;
  actionLabel?: string;
  dangerActionLabel?: string;
  onAction?: () => void;
  onDangerAction?: () => void;
};

//===============================================================

function ProfileField({
  label,
  value,
  actionLabel,
  dangerActionLabel,
  onAction,
  onDangerAction,
}: Props) {
  return (
    <div className={css.field}>
      <div className={css.content}>
        <p className={css.label}>{label}</p>
        <p className={css.value}>{value}</p>
      </div>

      <div className={css.actions}>
        {actionLabel ? (
          <button type="button" className={css.actionBtn} onClick={onAction}>
            {actionLabel}
          </button>
        ) : null}

        {dangerActionLabel ? (
          <button
            type="button"
            className={css.dangerBtn}
            onClick={onDangerAction}
          >
            {dangerActionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default ProfileField;
