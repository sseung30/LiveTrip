export interface Notification {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Notifications {
  totalCount: number;
  notifications: Notification[];
  cursorId: number | null;
}
