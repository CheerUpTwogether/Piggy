import {Database} from './supabase';

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
