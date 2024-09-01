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

export type AppointmentProps = {
  address: string;
  appointment_agreement_deadline_date?: string | null;
  appointment_date: string;
  appointment_status: AppointmentStatus;
  agreement_status: AppointmentStatus;
  contents?: string | null;
  created_at?: string | null;
  deal_piggy_count: number;
  id?: never;
  latitude?: number | null;
  longitude?: number | null;
  participant_count?: number;
  place_name: string;
  proposer_id?: string | null;
  subject?: string | null;
  list_displayed: true;
  pinned: boolean;
  appointment_id: number;
};

export type AppointmentInsert =
  Database['public']['Tables']['appointment']['Insert'];

export type AppointmentTabStatus = 'confirmed' | 'fulfilled' | 'pending';
export interface AppointmentTabCategory {
  label: string;
  value: AppointmentTabStatus;
  status: AppointmentStatus[];
}
