import React from 'react';
import {createStackNavigator, StackHeaderProps} from '@react-navigation/stack';
import {
  BottomTabBarProps,
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import BottomTab from '@/components/frame/BottomTab';
import TopTab from '@/components/frame/TopTab';
import Splash from 'pages/Splash';
import Login from '@/pages/auth/Login';
import Home from '@/pages/home/Home';
import Friends from '@/pages/friends/Friends';
import Goods from '@/pages/goods/Goods';
import Settings from '@/pages/settings/Settings';
import GoodsStorage from '@/components/goodsStorage/GoodsStorage';
import GoodsStorageDetail from '@/components/goodsStorage/GoodsStorageDetail';
import GoodsDetail from '@/components/goods/GoodsDetail';
import NoticeBoard from '@/components/NoticeBoard/NoticeBoard';
import NoticeBoardDetail from '@/components/NoticeBoard/NoticeBoardDetail';
import FAQBoard from '@/components/FAQBoard/FAQBoard';
import FriendSearch from '@/pages/friends/FriendSearch';
import AppointmentDetail from '@/pages/home/AppointmentDetail';
import EditProfile from '@/components/setting/EditProfile';
import HelpDesk from '@/components/setting/HelpDesk';
import PiggyUsage from '@/pages/piggy/PiggyUsage';
import GiftFriend from '@/pages/gift/GiftFriend';
import GiftAmount from '@/pages/gift/GiftAmount';
import Alarm from '@/components/alarm/Alarm';

const Stack = createStackNavigator();
const BottomStack = createBottomTabNavigator();

const Header = (props: BottomTabHeaderProps | StackHeaderProps) => (
  <TopTab {...props} />
);
const Footer = (props: BottomTabBarProps) => <BottomTab {...props} />;

const Main = () => {
  return (
    <BottomStack.Navigator tabBar={Footer}>
      <BottomStack.Screen
        name="Home"
        component={Home}
        options={{
          header: Header,
        }}
      />
      <BottomStack.Screen
        name="Friends"
        component={Friends}
        options={{
          header: Header,
        }}
      />
      <BottomStack.Screen
        name="Goods"
        component={Goods}
        options={{
          header: Header,
        }}
      />
      <BottomStack.Screen
        name="Settings"
        component={Settings}
        options={{
          header: Header,
        }}
      />
    </BottomStack.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AppointmentDetail"
        component={AppointmentDetail}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
        }}
      />
      <Stack.Screen
        name="GoodsStorage"
        component={GoodsStorage}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
        }}
      />
      <Stack.Screen
        name="GoodsStorageDetail"
        component={GoodsStorageDetail}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
        }}
      />
      <Stack.Screen
        name="GoodsDetail"
        component={GoodsDetail}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
        }}
      />
      <Stack.Screen
        name="FriendSearch"
        component={FriendSearch}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FAQBoard"
        component={FAQBoard}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
        }}
      />
      <Stack.Screen
        name="NoticeBoard"
        component={NoticeBoard}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
        }}
      />
      <Stack.Screen
        name="NoticeBoardDetail"
        component={NoticeBoardDetail}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
        }}
      />
      <Stack.Screen
        name="HelpDesk"
        component={HelpDesk}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
        }}
      />
      <Stack.Screen
        name="PiggyUsage"
        component={PiggyUsage}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
        }}
      />
      <Stack.Screen
        name="GiftFriend"
        component={GiftFriend}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
          title: '선물하기',
        }}
      />
      <Stack.Screen
        name="GiftAmount"
        component={GiftAmount}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
          title: '피기 선물',
        }}
      />
      <Stack.Screen
        name="Alarm"
        component={Alarm}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
          title: '알림',
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
