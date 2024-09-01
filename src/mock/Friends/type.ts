// 아래 interface 모두 '@/types/fiend' 에 넣어놨습니다. 사용하시던 파일들에서 이 경로로 수정부탁드립니다.
export interface User {
  id: string;
  profile_img_url: string;
  nickname: string;
  email?: string;
  piggy: number;
  total_appointment?: number;
  completed_appointment?: number;
  is_friend?: true;
}

export interface Friend {
  id: string;
  profile_img_url: string;
  nickname: string;
  email?: string;
  is_friend?: boolean;
  total_appointment?: number;
  completed_appointment?: number;
  piggy_grade?: string;
}

export interface ProfileDetailProps {
  id: string;
  nickname: string;
  total_appointment: number;
  completed_appointment: number;
  profile_img_url: string;
  is_friend: boolean | undefined;
  closeModal: () => void;
  onFriendAdded: (friendId: string) => void;
  onFriendRemoved: (friendId: string) => void;
}
