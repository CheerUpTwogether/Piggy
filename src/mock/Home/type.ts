export interface FriendsProps {
  uid: number;
  nick_name: string;
  url: string;
  isJoin?: boolean;
  isProof?: boolean;
}
export interface AppointmentProps {
  appointment_id: number;
  subject: string;
  location: string;
  date: string;
  time: string;
  penalty: number;
  isFixed: boolean;
  isCanceled: boolean;
  latitude: number;
  longitude: number;
  friends: FriendsProps[];
}
