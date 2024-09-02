import {Database} from '@/types/supabase';
import {FriendProp} from './friend';

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

export interface AppointmentProps extends AppointmentInsert {
  appointment_id: number;
  agreement_status: AppointmentTabStatus;
  appointment_participants_list: [];
  pinned: boolean;
}

export type AppointmentInsert =
  Database['public']['Tables']['appointment']['Insert'];

export interface AppointmentInsertProps extends AppointmentInsert {
  appointment_participants_list?: FriendProp[];
}

export interface AppointmentProps extends AppointmentInsert {
  list_displayed: true;
  pinned: boolean;
}

export type AppointmentTabStatus = 'confirmed' | 'fulfilled' | 'pending';
export interface AppointmentTabCategory {
  label: string;
  value: AppointmentTabStatus;
  status: AppointmentStatus[];
}
