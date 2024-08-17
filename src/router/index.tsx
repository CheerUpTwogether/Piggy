import React from 'react';
import {createStackNavigator, StackHeaderProps} from '@react-navigation/stack';
import {
  BottomTabBarProps,
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import CustomBottomTab from '@/components/frame/CustomBottomTab';
import CustomTopTabMain from '@/router/CustomTopTabMain';
import Splash from 'pages/Splash';
import Login from '@/pages/auth/Login';
import Home from '@/pages/home/Home';
import Friends from '@/pages/friends/Friends';
import Goods from '@/pages/goods/Goods';
import Settings from '@/pages/settings/Settings';
import CustomTopTabStack from '@/router/CustomTopTabStack';

const Stack = createStackNavigator();
const BottomStack = createBottomTabNavigator();

const BottomTab = (props: BottomTabBarProps) => <CustomBottomTab {...props} />;

const MainHeader = (props: BottomTabHeaderProps) => (
  <CustomTopTabMain {...props} />
);

const StackHeader = (props: StackHeaderProps) => (
  <CustomTopTabStack {...props} />
);

const Main = () => {
  return (
    <BottomStack.Navigator tabBar={BottomTab}>
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
          headerBackTitleVisible: false,
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
