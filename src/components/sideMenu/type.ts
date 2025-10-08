export type MenuItemType =
  | 'myInfo'
  | 'reservationHistory'
  | 'manageExperiences'
  | 'reservationStatus';

export interface MenuItem {
  id: MenuItemType;
  label: string;
  iconPath: string;
}

export interface SideMenuProps {
  size: 'large' | 'small';
  className?: string;
}
