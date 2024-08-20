export interface User {
  uuid?: string;
  profile_image_path: string;
  nick_name: string;
  email?: string;
  piggy: number;
  totalAppointments?: number;
  completed_appointments?: number;
}

export interface Friend {
  uuid: string;
  profile_image_path: string;
  nick_name: string;
  email?: string;
  friend?: boolean;
  totalAppointments?: number;
  completed_appointments?: number;
}

export interface ProfileDetailProps {
  uuid: string;
  nick_name: string;
  totalAppointments: number;
  completedAppointments: number;
  profileImagePath: string;
  friend: boolean | undefined;
}
