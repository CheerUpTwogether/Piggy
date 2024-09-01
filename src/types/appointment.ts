import {Database} from '@/types/supabase';

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

export type AppointmentInsert =
  Database['public']['Tables']['appointment']['Insert'];
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
