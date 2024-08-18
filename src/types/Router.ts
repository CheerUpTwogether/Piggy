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
  BottomTab: {
    screen: keyof RootBottomTabParamList;
  };
};

export type MainHeaderProps = {
  options: StackNavigationOptions;
  navigation: StackNavigationProp<RootStackParamList>;
};
