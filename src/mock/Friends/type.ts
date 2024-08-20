export interface User {
  uuid?: number;
  profile_image_path: string;
  nick_name: string;
  email?: string;
  piggy: number;
}

export interface Friend {
  id: number;
  profile_image_path: string;
  nick_name: string;
  email?: string;
}
