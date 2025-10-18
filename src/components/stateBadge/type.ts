export type StateType =
  | 'pending'
  | 'confirmed'
  | 'declined'
  | 'canceled'
  | 'completed';

export interface StateConfig {
  text: string;
  className?: string;
  style?: { backgroundColor: string; color: string };
}

export interface StateBadgeProps {
  state: StateType;
  className?: string;
}
