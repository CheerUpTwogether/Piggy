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
  id: string;
  profile_img_url: string;
  nickname: string;
  email?: string;
  is_friend?: boolean;
  total_appointment?: number;
  completed_appointment?: number;
  piggy_grade: string;
}

export interface ProfileDetailProps {
  uuid: string;
  nickname: string;
  total_appointment: number;
  completed_appointment: number;
  profile_img_url: string;
  is_friend: boolean | undefined;
  closeModal: () => void;
}
