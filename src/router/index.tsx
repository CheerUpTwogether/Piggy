import React from 'react';
import {createStackNavigator, StackHeaderProps} from '@react-navigation/stack';
import {
  BottomTabBarProps,
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import CustomBottomTab from '@/router/CustomBottomTab';
import CustomTopTabMain from '@/router/CustomTopTabMain';
import Splash from 'pages/Splash';
import Login from '@/pages/auth/Login';
import Home from '@/pages/home/Home';
import Friends from '@/pages/friends/Friends';
import Goods from '@/pages/goods/Goods';
import Settings from '@/pages/settings/Settings';
import CustomTopTabStack from '@/router/CustomTopTabStack';

const Stack = createStackNavigator();
const StackBottomTab = createBottomTabNavigator();

const BottomTab = (props: BottomTabBarProps) => <CustomBottomTab {...props} />;

const MainHeader = (props: BottomTabHeaderProps) => (
  <CustomTopTabMain {...props} />
);

const StackHeader = (props: StackHeaderProps) => (
  <CustomTopTabStack {...props} />
);

const Main = () => {
  return (
    <StackBottomTab.Navigator tabBar={BottomTab}>
      <StackBottomTab.Screen
        name="Home"
        component={Home}
        options={{
          header: MainHeader,
        }}
      />
      <StackBottomTab.Screen
        name="Friends"
        component={Friends}
        options={{
          header: MainHeader,
        }}
      />
      <StackBottomTab.Screen
        name="Goods"
        component={Goods}
        options={{
          header: MainHeader,
        }}
      />
      <StackBottomTab.Screen
        name="Settings"
        component={Settings}
        options={{
          header: MainHeader,
        }}
      />
    </StackBottomTab.Navigator>
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
          headerShown: false,
          headerBackTitleVisible: true,
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
    </Stack.Navigator>
  );
};

export default Router;
