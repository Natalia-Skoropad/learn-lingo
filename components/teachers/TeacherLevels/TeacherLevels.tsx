import clsx from 'clsx';

import css from './TeacherLevels.module.css';

//===============================================================

type Props = {
  levels: string[];
};

//===============================================================

function TeacherLevels({ levels }: Props) {
  return (
    <ul className={css.levelsList}>
      {levels.map((level, index) => (
        <li
          key={level}
          className={clsx(css.levelItem, index === 0 && css.levelItemAccent)}
        >
          #{level}
        </li>
      ))}
    </ul>
  );
}

export default TeacherLevels;
