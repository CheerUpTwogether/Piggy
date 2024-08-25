import {User} from '@/mock/Friends/type';
import {dummyGoodsItem} from '@/mock/Goods/types';
import {dummyGoodsStorageItem} from '@/mock/GoodsStorage/types';
import {AppointmentProps} from '@/mock/Home/type';
import {dummyNoticeItem} from '@/mock/NoticeBoard/types';
import {FriendSearchParams} from '@/pages/friends/type';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';

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
    nick_name: string;
    profile_image_path: string;
  };
  AppointmentDetail: AppointmentProps;
  ServiceAgreement: undefined;
  PaymentAgreement: undefined;
  LoginDetail: undefined;
  EditProfile: User;
  HelpDesk: undefined;
  NoticeBoard: undefined;
  FAQBoard: undefined;
  GoodsStorage: undefined;
  GoodsDetail: dummyGoodsItem;
  GoodsStorageDetail: dummyGoodsStorageItem;
  NoticeBoardDetail: dummyNoticeItem;
  PiggyUsage: undefined;
  Friends: undefined;
  Alarm: undefined;
  PiggyShop: undefined;
  AppointmentForm: undefined;
};

export type MainHeaderProps = {
  options: StackNavigationOptions;
  navigation: StackNavigationProp<RootStackParamList>;
};
