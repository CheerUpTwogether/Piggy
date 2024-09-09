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
  date?: string;
  time?: string;
  totalAmount?: number;
}

export interface AppointmentProps extends AppointmentInsert {
  list_displayed: true;
  pinned: boolean;
}

export type AppointmentTabStatus =
  | 'confirmed'
  | 'fulfilled'
  | 'pending'
  | 'expired';
export interface AppointmentTabCategory {
  label: string;
  value: AppointmentTabStatus;
  status: AppointmentStatus[];
}

export interface AppointmentForm {
  id: number;
  date: string;
  time: string;
  latitude: number;
  longitude: number;
  appointment_status: AppointmentStatus;
}

export type CancelStatus =
  | 'nothing'
  | 'cancellation-request'
  | 'cancellation-rejected'
  | 'cancellation-confirm'
  | 'cancellation-pending';

export interface AppointmentActionsProps {
  appointmentForm: AppointmentForm;
  cancelStatus: CancelStatus;
  myAgreementStatus: AppointmentTabStatus;
  appointmentTimeCheck: string;
  isNearAppointment: '10min' | '2hr' | 'expired' | '';
  certification: boolean;
  handleCertification: () => void;
  cancelAppointment: () => void;
  setAppointmentCancellationAcceptance: (
    type: 'cancellation-rejected' | 'cancellation-confirmed',
  ) => void;
  setAppointmentAcceptance: (type: boolean) => void;
}

export interface Participant {
  user_id: string;
  nickname: string;
  profile_img_url: string;
  agreement_status: string;
  certification_status: boolean;
}
