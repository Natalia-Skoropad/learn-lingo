'use client';

import dynamic from 'next/dynamic';

//===============================================================

const ModalRoot = dynamic(
  () => import('@/components/modals/ModalRoot/ModalRoot'),
  {
    ssr: false,
  }
);

//===============================================================

function ModalRootLazy() {
  return <ModalRoot />;
}

export default ModalRootLazy;
