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

export interface Alram {
  alarm_id: number;
  type: AlarmType;
  date: string;
  uid?: number;
  appointment_id?: number;
  appointment_title?: string;
  nick_name?: string;
  piggy?: number;
}
[];
