export interface AppointmentData {
  friends: FriendsProps[];
  location: string;
  date: string;
  time: string;
  penalty: string;
  subject: string;
}

export interface AppointmentFriendProps {
  friends: Friend[];
  subject: string;
  onUpdate: (key: string, value: any) => void;
}

export interface Friend {
  uuid: string;
  profile_image_path: string;
  nick_name: string;
  email?: string;
  friend?: boolean;
  total_appointments?: number;
  completed_appointments?: number;
}

export interface FriendsProps {
  uid: number;
  nick_name: string;
  profile_img_url: string;
  isJoin?: boolean;
  isProof?: boolean;
}

export interface AppointmentPenaltyProps {}
