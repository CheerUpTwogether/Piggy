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
import GoodsDetail from '@/pages/goods/GoodsDetail';
import NoticeBoard from '@/components/NoticeBoard/NoticeBoard';
import NoticeBoardDetail from '@/components/NoticeBoard/NoticeBoardDetail';
import FAQBoard from '@/components/FAQBoard/FAQBoard';
import FriendSearch from '@/pages/friends/FriendSearch';
import AppointmentDetail from '@/pages/home/AppointmentDetail';
import EditProfile from '@/components/setting/EditProfile';
import HelpDesk from '@/components/setting/HelpDesk';
import HelpHistory from '@/components/setting/HelpHistory';
import HelpDetail from '@/components/setting/HelpDetail';
import ServiceAgreement from '@/components/userAgreement/ServiceAgreement';
import PaymentAgreement from '@/components/userAgreement/PaymentAgreement';
import LoginDetail from '@/pages/auth/LoginDetail';
import PiggyUsage from '@/pages/piggy/PiggyUsage';
import GiftFriend from '@/pages/gift/GiftFriend';
import GiftAmount from '@/pages/gift/GiftAmount';
import Alarm from '@/pages/alarm/Alarm';
import PiggyShop from '@/components/piggy/PiggyShop';
import AppointmentForm from '@/pages/home/AppointmentForm';
import Regist from '@/pages/auth/Regist';
import LoginEmail from '@/pages/auth/LoginEmail';
import RedirectKakaoMap from '@/components/home/RedirectKaKaoMap';

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
        name="LoginEmail"
        component={LoginEmail}
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
          title: 'FAQ',
        }}
      />
      <Stack.Screen
        name="NoticeBoard"
        component={NoticeBoard}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
          title: '공지사항',
        }}
      />
      <Stack.Screen
        name="NoticeBoardDetail"
        component={NoticeBoardDetail}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
          title: '공지사항',
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
          title: '프로필 수정',
        }}
      />
      <Stack.Screen
        name="HelpDesk"
        component={HelpDesk}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
          title: '문의하기',
        }}
      />
      <Stack.Screen
        name="HelpHistory"
        component={HelpHistory}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
          title: '문의내역',
        }}
      />
      <Stack.Screen
        name="HelpDetail"
        component={HelpDetail}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
          title: '문의상세',
        }}
      />
      <Stack.Screen
        name="ServiceAgreement"
        component={ServiceAgreement}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaymentAgreement"
        component={PaymentAgreement}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginDetail"
        component={LoginDetail}
        options={{
          headerShown: false,
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
      <Stack.Screen
        name="PiggyShop"
        component={PiggyShop}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
          title: '피기 상점',
        }}
      />
      <Stack.Screen
        name="AppointmentForm"
        component={AppointmentForm}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
          title: '약속 잡기',
        }}
      />
      <Stack.Screen
        name="Regist"
        component={Regist}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
        }}
      />
      <Stack.Screen
        name="RedirectKakaoMap"
        component={RedirectKakaoMap}
        options={{
          header: Header,
          headerLeftLabelVisible: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
