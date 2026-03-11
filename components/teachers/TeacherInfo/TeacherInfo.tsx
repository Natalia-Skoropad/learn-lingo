import css from './TeacherInfo.module.css';

//===============================================================

type Props = {
  languages: string[];
  lessonInfo: string;
  conditions: string[];
};

//===============================================================

function TeacherInfo({ languages, lessonInfo, conditions }: Props) {
  const speaks = languages.join(', ');
  const conditionsText = conditions.join(' ');

  return (
    <ul className={css.infoBlock}>
      <li className={css.text}>
        <span className={css.infoLabel}>Speaks: </span>
        <span className={css.underlined}>{speaks}</span>
      </li>

      <li className={css.text}>
        <span className={css.infoLabel}>Lesson Info:</span> {lessonInfo}
      </li>

      <li className={css.text}>
        <span className={css.infoLabel}>Conditions:</span> {conditionsText}
      </li>
    </ul>
  );
}

export default TeacherInfo;
