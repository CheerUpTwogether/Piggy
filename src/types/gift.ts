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
