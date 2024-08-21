import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '@/types/Router';
import {StackNavigationProp} from '@react-navigation/stack';

export type GiftAmountRouteProp = RouteProp<RootStackParamList, 'GiftAmount'>;

export type GiftNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FriendSearch'
>;
