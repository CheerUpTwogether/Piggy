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

const Stack = createStackNavigator();
const BottomStack = createBottomTabNavigator();

const MainHeader = (props: BottomTabHeaderProps) => <TopTab {...props} />;
const StackHeader = (props: StackHeaderProps) => <TopTab {...props} />;
const TabBar = (props: BottomTabBarProps) => <BottomTab {...props} />;

const Main = () => {
  return (
    <BottomStack.Navigator tabBar={TabBar}>
      <BottomStack.Screen
        name="Home"
        component={Home}
        options={{
          header: MainHeader,
        }}
      />
      <BottomStack.Screen
        name="Friends"
        component={Friends}
        options={{
          header: MainHeader,
        }}
      />
      <BottomStack.Screen
        name="Goods"
        component={Goods}
        options={{
          header: MainHeader,
        }}
      />
      <BottomStack.Screen
        name="Settings"
        component={Settings}
        options={{
          header: MainHeader,
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
        options={{
          header: StackHeader,
          headerShown: true,
          headerLeftLabelVisible: true,
        }}
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
        name="GoodsStorage"
        component={GoodsStorage}
        options={{
          header: StackHeader,
          headerLeftLabelVisible: true,
        }}
      />
      <Stack.Screen
        name="GoodsStorageDetail"
        component={GoodsStorageDetail}
        options={{
          header: StackHeader,
          headerLeftLabelVisible: true,
        }}
      />
      <Stack.Screen
        name="GoodsDetail"
        component={GoodsDetail}
        options={{
          header: StackHeader,
          headerLeftLabelVisible: true,
        }}
      />
      <Stack.Screen
        name="FAQBoard"
        component={FAQBoard}
        options={{
          header: StackHeader,
          headerLeftLabelVisible: true,
        }}
      />
      <Stack.Screen
        name="NoticeBoard"
        component={NoticeBoard}
        options={{
          header: StackHeader,
          headerLeftLabelVisible: true,
        }}
      />
      <Stack.Screen
        name="NoticeBoardDetail"
        component={NoticeBoardDetail}
        options={{
          header: StackHeader,
          headerLeftLabelVisible: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
