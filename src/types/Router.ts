import {AppointmentProps} from '@/mock/Home/type';
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
  PiggyUsage: undefined;
  Friends: undefined;
  PiggyShop: undefined;
  AppointmentForm: undefined;
};

export type MainHeaderProps = {
  options: StackNavigationOptions;
  navigation: StackNavigationProp<RootStackParamList>;
};
