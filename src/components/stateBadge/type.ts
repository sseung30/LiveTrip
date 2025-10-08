export type StateType =
  | 'cancelled'
  | 'completed'
  | 'rejected'
  | 'experience_completed'
  | 'approved';

export interface StateConfig {
  text: string;
  className?: string;
  style?: { backgroundColor: string; color: string };
}

export interface StateBadgeProps {
  state: StateType;
  className?: string;
}
