'use client';

import Image from 'next/image';
import { useState } from 'react';
import type {
  MenuItem,
  MenuItemType,
  SideMenuProps,
} from '@/components/sideMenu/type';

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'myInfo',
    label: '내 정보',
    iconPath: '/images/icon/icon_user.svg',
  },
  {
    id: 'reservationHistory',
    label: '예약내역',
    iconPath: '/images/icon/icon_list.svg',
  },
  {
    id: 'manageExperiences',
    label: '내 체험 관리',
    iconPath: '/images/icon/icon_setting.svg',
  },
  {
    id: 'reservationStatus',
    label: '예약 현황',
    iconPath: '/images/icon/icon_calendar.svg',
  },
];

const SIZE_CONFIG = {
  large: {
    container: { width: '291px', height: '450px' },
    profile: { size: 120, iconSize: 16, editSize: 32 },
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
    profile: { size: 70, iconSize: 12, editSize: 24 },
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
  const [activeItem, setActiveItem] =
    useState<MenuItemType>('reservationHistory');

  const handleMenuClick = (itemId: MenuItemType) => {
    setActiveItem(itemId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, itemId: MenuItemType) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleMenuClick(itemId);
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
      {/* 프로필 영역 */}
      <div className={`flex flex-col items-center ${config.spacing.padding}`}>
        <div className='relative'>
          <Image
            src='/images/default_profile.png'
            alt='프로필'
            width={config.profile.size}
            height={config.profile.size}
            className='rounded-full'
          />
          <div
            className='absolute -right-1 -bottom-1 flex items-center justify-center rounded-full bg-gray-300'
            style={{
              width: config.profile.editSize,
              height: config.profile.editSize,
            }}
          >
            <Image
              src='/images/icon/icon_edit.svg'
              alt='edit'
              width={config.profile.iconSize}
              height={config.profile.iconSize}
            />
          </div>
        </div>
      </div>

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
                  handleMenuClick(item.id);
                }}
                onKeyDown={(e) => {
                  handleKeyDown(e, item.id);
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
