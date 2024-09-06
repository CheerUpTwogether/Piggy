export type AlarmType =
  | 'appointment_pending'
  | 'cancellation_request'
  | 'deleted_notice'
  | 'created_notice'
  | 'reminder'
  | 'piggy_changed_appointment'
  | 'piggy_changed_gift'
  | 'piggy_changed_charge'
  | 'piggy_changed_purchase';

export type AlarmCategory = '약속' | '피기' | '벌금';

export interface Alaram {
  id: number;
  notification_category: AlarmType;
  notification_subject: string;
  notification_contents: string;
  filter_criteria: AlarmCategory;
  redirect_key_id_value: string | null;
  created_at: string;
  user_id?: number;
  confirmed_status: boolean;
  appointment_id?: number;
  appointment_title?: string;
}
