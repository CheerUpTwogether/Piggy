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
