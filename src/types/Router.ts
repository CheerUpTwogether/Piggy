import {User} from '@/mock/Friends/type';
import {dummyGoodsStorageItem} from '@/mock/GoodsStorage/types';
import {dummyNoticeItem} from '@/mock/NoticeBoard/types';
import {FriendSearchParams} from '@/pages/friends/type';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import {GoodsProduct} from './gift';
import {AppointmentProps} from '@/types/appointment';

export type RootBottomTabParamList = {
  Home: undefined;
  Friends: undefined;
  Goods: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Splash: undefined;
  Main: {
    screen: keyof RootBottomTabParamList;
  };
  FriendSearch: FriendSearchParams;
  GiftFriend: undefined;
  GiftAmount: {
    uuid: string;
    nickname: string;
    profile_image_path: string;
  };
  AppointmentDetail: AppointmentProps;
  ServiceAgreement: undefined;
  PaymentAgreement: undefined;
  LoginDetail: undefined;
  LoginEmail: undefined;
  EditProfile: User;
  HelpDesk: undefined;
  HelpHistory: undefined;
  HelpDetail: {id: string};
  NoticeBoard: undefined;
  FAQBoard: undefined;
  GoodsStorage: undefined;
  GoodsDetail: GoodsProduct;
  GoodsStorageDetail: dummyGoodsStorageItem;
  NoticeBoardDetail: dummyNoticeItem;
  PiggyUsage: undefined;
  Friends: undefined;
  Alarm: undefined;
  PiggyShop: undefined;
  AppointmentForm: undefined;
  Regist: undefined;
};

export type StackNavigation = StackNavigationProp<RootStackParamList>;

export type MainHeaderProps = {
  options: StackNavigationOptions;
  navigation: StackNavigation;
};
