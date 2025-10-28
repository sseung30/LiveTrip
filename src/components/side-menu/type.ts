export type MenuItemType =
  | 'myInfo'
  | 'reservationHistory'
  | 'manageExperiences'
  | 'reservationStatus';

export interface MenuItem {
  id: MenuItemType;
  label: string;
  iconPath: string;
  href: string;
}

export interface SideMenuProps {
  className?: string;
}
