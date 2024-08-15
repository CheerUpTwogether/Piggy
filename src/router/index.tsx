import {createStackNavigator} from '@react-navigation/stack';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import Splash from 'pages/Splash';
import Login from '@/pages/auth/Login';
import CustomBottomTab from '@/router/CustomBottomTab';
import Home from '@/pages/home/Home';
import Friends from '@/pages/friends/Friends';
import Goods from '@/pages/goods/Goods';
import Settings from '@/pages/settings/Settings';

const StackTab = createStackNavigator();
const StackBottomTab = createBottomTabNavigator();

const BottomTabBar = (props: BottomTabBarProps) => (
  <CustomBottomTab {...props} />
);

const BottomTab = () => {
  return (
    <StackBottomTab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={BottomTabBar}>
      <StackBottomTab.Screen name="Home" component={Home} />
      <StackBottomTab.Screen name="Friends" component={Friends} />
      <StackBottomTab.Screen name="Goods" component={Goods} />
      <StackBottomTab.Screen name="Settings" component={Settings} />
    </StackBottomTab.Navigator>
  );
};

const Router = () => {
  return (
    <StackTab.Navigator screenOptions={{headerShown: false}}>
      <StackTab.Screen name="BottomTab" component={BottomTab} />
      <StackTab.Screen name="Splash" component={Splash} />
      <StackTab.Screen name="Login" component={Login} />
    </StackTab.Navigator>
  );
};

export default Router;
