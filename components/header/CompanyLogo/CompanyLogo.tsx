'use client';

import Link from 'next/link';

import SvgIcon from '@/components/common/SvgIcon/SvgIcon';
import css from './CompanyLogo.module.css';

//===============================================================

function CompanyLogo() {
  return (
    <Link href="/" className={css.companyLogo} aria-label="Go to home page">
      <SvgIcon name="icon-ukraine" className={css.icon} size={28} />

      <span className={css.text}>LearnLingo</span>
    </Link>
  );
}

export default CompanyLogo;
