import {RootStackParamList} from '@/types/Router';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

export interface FriendSearchParams {
  previousScreen: keyof RootStackParamList;
}

export type FriendSearchRouteProp = RouteProp<
  RootStackParamList,
  'FriendSearch'
>;
export type FriendSearchNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FriendSearch'
>;

// 프로필 상세 보기
export type ProfileDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GiftAmount'
>;

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
