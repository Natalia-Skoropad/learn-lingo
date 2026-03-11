import css from './TeacherHeader.module.css';

//===============================================================

type Props = {
  fullName: string;
};

//===============================================================

function TeacherHeader({ fullName }: Props) {
  return (
    <div className={css.titleWrap}>
      <p className={css.label}>Languages</p>
      <h2 className={css.name}>{fullName}</h2>
    </div>
  );
}

export default TeacherHeader;
