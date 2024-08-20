export interface AppointmentProps {
  appointment_id: number;
  subject: string;
  location: string;
  date: string;
  time: string;
  penalty: number;
  isFixed: boolean;
  isCanceled: boolean;
  friends: {
    uid: number;
    url: string;
  }[];
}
