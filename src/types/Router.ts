export type RootBottomParamList = {
  Home: undefined;
  Friends: undefined;
  Goods: undefined | string;
  Settings: undefined | string;
};

export type RootStackParamList = {
  Login: undefined;
  Splash: undefined;
  BottomTab: {
    screen: keyof RootBottomParamList;
  };
};
