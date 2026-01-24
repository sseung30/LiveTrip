'use client';

import { useSelectedLayoutSegments } from 'next/navigation';
import SideMenu from '@/components/side-menu';

export default function ConditionalSidebar() {
  const segments = useSelectedLayoutSegments();
  const isMyActivitiesEditPage =
    segments[0] === 'myactivities' && segments[2] === 'edit';

  if (isMyActivitiesEditPage) {
    return null;
  }

  return <SideMenu />;
}
