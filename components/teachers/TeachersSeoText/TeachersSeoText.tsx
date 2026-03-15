import css from './TeachersSeoText.module.css';

//===============================================================

type Props = {
  heading: string;
  paragraphs: string[];
};

//===============================================================

function TeachersSeoText({ heading, paragraphs }: Props) {
  return (
    <section className={css.section} aria-labelledby="teachers-seo-title">
      <h2 id="teachers-seo-title" className={css.title}>
        {heading}
      </h2>

      <div className={css.content}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className={css.text}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

export default TeachersSeoText;
