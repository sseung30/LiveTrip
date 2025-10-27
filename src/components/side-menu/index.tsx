'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import ProfileImage from '@/components/side-menu/ProfileImage';
import type {
  MenuItem,
  MenuItemType,
  SideMenuProps,
} from '@/components/side-menu/type';

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'myInfo',
    label: '내 정보',
    iconPath: '/icons/icon_user.svg',
    href: '/profile',
  },
  {
    id: 'reservationHistory',
    label: '예약내역',
    iconPath: '/icons/icon_list.svg',
    href: '/myreservation',
  },
  {
    id: 'manageExperiences',
    label: '내 체험 관리',
    iconPath: '/icons/icon_setting.svg',
    href: '/myactivities',
  },
  {
    id: 'reservationStatus',
    label: '예약 현황',
    iconPath: '/icons/icon_calendar.svg',
    href: '/reservation-status',
  },
];

export const SIZE_CONFIG = {
  large: {
    container: { width: '291px', height: '450px' },
    profile: { size: 120, iconSize: 16 },
    spacing: {
      padding: 'pt-6 pb-6',
      menuPadding: 'px-[15px]',
      gap: 'gap-4 p-4',
      spaceY: 'space-y-3',
      textSize: 'text-base',
    },
  },
  small: {
    container: { width: '178px', height: '342px' },
    profile: { size: 70, iconSize: 12 },
    spacing: {
      padding: 'pt-4 pb-4',
      menuPadding: 'px-[12px]',
      gap: 'gap-3 p-4',
      spaceY: 'space-y-2',
      textSize: 'text-sm',
    },
  },
} as const;

const PRIMARY_FILTER =
  'brightness(0) saturate(100%) invert(43%) sepia(96%) saturate(1352%) hue-rotate(188deg) brightness(119%) contrast(119%)';

export default function SideMenu({ size, className = '' }: SideMenuProps) {
  const config = SIZE_CONFIG[size];
  const router = useRouter();
  const pathname = usePathname();

  /**
   * 현재 경로에 따라 activeItem 자동 결정
   */
  const getActiveItem = (): MenuItemType => {
    if (pathname.includes('/profile')) {
      return 'myInfo';
    }
    if (pathname.includes('/myreservation')) {
      return 'reservationHistory';
    }
    if (pathname.includes('/myactivities')) {
      return 'manageExperiences';
    }
    if (pathname.includes('/reservation-status')) {
      return 'reservationStatus';
    }

    return 'reservationHistory';
  };

  const [activeItem, setActiveItem] = useState<MenuItemType>(getActiveItem());

  const handleMenuClick = (itemId: MenuItemType, href: string) => {
    setActiveItem(itemId);
    router.push(href);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    itemId: MenuItemType,
    href: string
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleMenuClick(itemId, href);
    }
  };

  return (
    <div
      className={`rounded-lg bg-white shadow-sm ${className}`}
      style={{
        width: config.container.width,
        height: config.container.height,
      }}
    >
      <ProfileImage size={size} />

      {/* 메뉴 항목들 */}
      <div className={config.spacing.menuPadding}>
        <div className={config.spacing.spaceY}>
          {MENU_ITEMS.map((item) => {
            const isActive = item.id === activeItem;

            return (
              <div
                key={item.id}
                tabIndex={0}
                role='button'
                className={`flex cursor-pointer items-center rounded-2xl transition-colors ${config.spacing.gap} ${
                  isActive ? 'bg-primary-100' : 'hover:bg-gray-50'
                }`}
                onClick={() => {
                  handleMenuClick(item.id, item.href);
                }}
                onKeyDown={(e) => {
                  handleKeyDown(e, item.id, item.href);
                }}
              >
                <Image
                  src={item.iconPath}
                  alt={item.label}
                  width={config.profile.iconSize + 8}
                  height={config.profile.iconSize + 8}
                  className={isActive ? 'brightness-0 saturate-100' : ''}
                  style={isActive ? { filter: PRIMARY_FILTER } : {}}
                />
                <span
                  className={`font-medium ${config.spacing.textSize} ${isActive ? 'text-gray-950' : 'text-gray-600'}`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
