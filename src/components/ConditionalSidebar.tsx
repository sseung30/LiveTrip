'use client';

import { usePathname } from 'next/navigation';
import SideMenu from '@/components/side-menu';

export default function ConditionalSidebar() {
  const pathname = usePathname();

  const hideForEdit = pathname?.startsWith('/myactivities/') && pathname?.endsWith('/edit');

  if (hideForEdit) {
    return null;
  }

  return <SideMenu size='large' />;
}

