export interface FriendsProps {
  uid: number;
  nick_name: string;
  url: string;
  isJoin?: boolean;
  isProof?: boolean;
}

export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'expired'
  | 'cancelled'
  | 'fulfilled'
  | 'cancellation-request'
  | 'cancellation-confirmed'
  | 'cancellation-rejected'
  | 'cancellation-pending';

export interface AppointmentProps {
  appointment_id: number;
  subject: string;
  pinned: boolean;
  place_name: string;
  appointment_date: string;
  appointment_participants_list: object[];
  deal_piggy_count: number;
  latitude: string;
  longitude: string;
  appointment_status: AppointmentStatus;
  list_displayed: boolean;
  participants_own_status: boolean;
  proposer_id: number;
}
