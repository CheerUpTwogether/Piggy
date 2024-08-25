export type AlarmType =
  | 'join'
  | 'cancel_request'
  | 'update_request'
  | 'update'
  | 'delete'
  | 'accomplish'
  | 'getPiggyPanalty'
  | 'givePiggyPanalty'
  | 'getPiggyGift'
  | 'givePiggyGift'
  | 'chargePiggy'
  | 'buyGoods'
  | 'corner';

export type AlarmCategory = 'appointment' | 'piggy' | 'panalty';

export interface Alram {
  alarm_id: number;
  type: AlarmType;
  category: AlarmCategory;
  date: string;
  uid?: number;
  appointment_id?: number;
  appointment_title?: string;
  nick_name?: string;
  piggy?: number;
}
[];
