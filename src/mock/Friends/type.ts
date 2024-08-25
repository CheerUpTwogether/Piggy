export interface User {
  uuid: string;
  profile_image_path: string;
  nick_name: string;
  email?: string;
  piggy: number;
  total_appointments?: number;
  completed_appointments?: number;
  friend?: true;
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

export interface ProfileDetailProps {
  uuid: string;
  nick_name: string;
  total_appointments: number;
  completed_appointments: number;
  profile_image_path: string;
  friend: boolean | undefined;
  closeModal: () => void;
}
