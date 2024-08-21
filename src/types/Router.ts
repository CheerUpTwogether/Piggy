import {AppointmentProps} from '@/mock/Home/type';
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
};

export type MainHeaderProps = {
  options: StackNavigationOptions;
  navigation: StackNavigationProp<RootStackParamList>;
};
