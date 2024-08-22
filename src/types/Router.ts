import {User} from '@/mock/Friends/type';
import {dummyGoodsItem} from '@/mock/Goods/types';
import {dummyGoodsStorageItem} from '@/mock/GoodsStorage/types';
import {AppointmentProps} from '@/mock/Home/type';
import {dummyNoticeItem} from '@/mock/NoticeBoard/types';
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
  FriendSearch: undefined;
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
};

export type MainHeaderProps = {
  options: StackNavigationOptions;
  navigation: StackNavigationProp<RootStackParamList>;
};
