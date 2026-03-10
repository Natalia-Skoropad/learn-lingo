'use client';

import css from './StatsSection.module.css';

//===============================================================

const stats = [
  { value: '32,000 +', label: 'Experienced tutors' },
  { value: '300,000 +', label: '5-star tutor reviews' },
  { value: '120 +', label: 'Subjects taught' },
  { value: '200 +', label: 'Tutor nationalities' },
];

//===============================================================

function StatsSection() {
  return (
    <section className={css.section} aria-labelledby="stats-title">
      <div className="container">
        <h2 id="stats-title" className="visually-hidden">
          Platform statistics
        </h2>

        <div className={css.statsBox}>
          <ul className={css.statsList}>
            {stats.map(({ value, label }) => (
              <li key={label} className={css.statsItem}>
                <span className={css.value}>{value}</span>
                <span className={css.label}>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
