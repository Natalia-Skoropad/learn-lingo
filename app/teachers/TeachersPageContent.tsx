import { redirect } from 'next/navigation';

import Breadcrumbs from '@/components/common/Breadcrumbs/Breadcrumbs';
import TeachersList from '@/components/teachers/TeachersList/TeachersList';
import { getTeachersPage } from '@/lib/server/teachers/teachers.server';
import { getTeachersSeoText } from '@/lib/server/teachers/teachers-seo';
import {
  buildTeachersPath,
  getTeachersContextLabel,
} from '@/lib/server/teachers/teachers.query';
import type { TeacherFilters } from '@/types/filters';

import css from './page.module.css';

//===============================================================

type Props = {
  filters: TeacherFilters;
  page: number;
};

//===============================================================

async function TeachersPageContent({ filters, page }: Props) {
  const result = await getTeachersPage({
    filters,
    page,
  });

  const { teachers, total, perPage } = result;

  const lastValidPage = total > 0 ? Math.ceil(total / perPage) : 1;

  if (page > lastValidPage) {
    redirect(buildTeachersPath(filters, lastValidPage));
  }

  const seoText = page === 1 && total > 0 ? getTeachersSeoText(filters) : null;
  const contextLabel = getTeachersContextLabel(filters);

  const breadcrumbItems =
    page > 1
      ? [
          { label: 'Home', href: '/' },
          { label: 'Teachers', href: '/teachers' },
          ...(contextLabel !== 'Teachers'
            ? [
                {
                  label: contextLabel,
                  href: buildTeachersPath(filters, 1),
                },
              ]
            : []),
          { label: `Page ${page}` },
        ]
      : [
          { label: 'Home', href: '/' },
          { label: 'Teachers', href: '/teachers' },
          ...(contextLabel !== 'Teachers' ? [{ label: contextLabel }] : []),
        ];

  return (
    <main className={css.page}>
      <section className={css.section}>
        <div className="container">
          <Breadcrumbs items={breadcrumbItems} />

          <h1 className="visually-hidden">Teachers</h1>

          <TeachersList
            initialTeachers={teachers}
            initialTotal={total}
            initialFilters={filters}
            initialPage={page}
            seoText={seoText}
          />
        </div>
      </section>
    </main>
  );
}

export default TeachersPageContent;
