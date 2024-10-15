import {Database} from './supabase';

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

export type FriendProp = {
  completed_appointment: null;
  email: string;
  id: string;
  is_friend: boolean;
  nickname: string;
  piggy_grade: string;
  total_appointment: null | number;
  profile_img_url?: string;
};

export type FriendRelationshipRow =
  Database['public']['Tables']['user_friend_relationship']['Row'];

export type SelectFriendItemProp = {
  item: FriendProp;
  handleFriendDelete: (item: FriendProp) => void;
};

export type FriendItemProp = {
  item: FriendProp;
  handleFriendPress: (item: FriendProp) => void;
  selectedFriends: FriendProp[];
};
