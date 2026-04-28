import { redirect } from 'next/navigation';

import { getTeachersPage } from '@/lib/server/teachers/teachers.server';
import { getTeachersSeoText } from '@/lib/server/teachers/teachers-seo';

import {
  buildTeachersPathWithSearch,
  getTeachersContextLabel,
} from '@/lib/utils/teachers.query';

import type { TeacherFilters } from '@/types/filters';

import Breadcrumbs from '@/components/common/Breadcrumbs/Breadcrumbs';
import TeachersList from '@/components/teachers/TeachersList/TeachersList';

import css from './page.module.css';

//===============================================================

type Props = {
  filters: TeacherFilters;
  page: number;
  keyword: string;
};

//===============================================================

async function TeachersPageContent({ filters, page, keyword }: Props) {
  const result = await getTeachersPage({
    filters,
    page,
    keyword,
  });

  const { teachers, total, perPage } = result;

  const lastValidPage = total > 0 ? Math.ceil(total / perPage) : 1;

  if (page > lastValidPage) {
    redirect(buildTeachersPathWithSearch(filters, lastValidPage, keyword));
  }

  const seoText =
    page === 1 && total > 0 && !keyword ? getTeachersSeoText(filters) : null;

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
                  href: buildTeachersPathWithSearch(filters, 1, keyword),
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
            keyword={keyword}
            seoText={seoText}
          />
        </div>
      </section>
    </main>
  );
}

export default TeachersPageContent;
