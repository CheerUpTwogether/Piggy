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
  diff_piggy_date: string;
  present_piggy_count: number;
  changed_category: string;
}

export interface PiggyUsageHistoryProps extends PiggyLog {
  appointment_title?: string;
  contents?: PiggyHistoryContent;
}

interface PiggyHistoryContent {
  f1: string; // 약속 제목 || 선물대상
  f2: string | null; // profile_img
  f3?: string;
  f4?: string;
}

export interface PiggyLogItem {
  changed_category: string;
  contents: {
    f1: string | null;
    f2: string | null;
  };
  diff_piggy_count: number;
  diff_piggy_date: string;
  id: number;
  present_piggy_count: number;
}
