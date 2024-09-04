import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '@/types/Router';
import {StackNavigationProp} from '@react-navigation/stack';

export type GiftAmountRouteProp = RouteProp<RootStackParamList, 'GiftAmount'>;

export type GiftNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FriendSearch'
>;

export type GiftAmountNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GiftAmount'
>;
export interface GoodsProduct {
  brand_name: string;
  product_name: string;
  product_thumb_image_url: string;
  product_price: number;
  brand_image_url: string;
  product_image_url: string;
}

export interface GoodsItem {
  product: GoodsProduct;
}

export type GoodsList = GoodsItem[];

// 피기 사용 내역
export interface PiggyLog {
  id: number;
  diff_piggy_count: number;
  present_piggy_count: number;
  changed_category: string;
  diff_piggy_date: string;
}

export interface PiggyUsageHistoryProps extends PiggyLog {
  nickname?: string;
  appointment_title?: string;
  profile_img_url?: string;
}
