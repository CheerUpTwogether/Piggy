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

const BottomTab = (props: BottomTabBarProps) => <CustomBottomTab {...props} />;

const Main = () => {
  return (
    <StackBottomTab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={BottomTab}>
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
      <StackTab.Screen name="Main" component={Main} />
      <StackTab.Screen name="Splash" component={Splash} />
      <StackTab.Screen name="Login" component={Login} />
    </StackTab.Navigator>
  );
};

export default Router;
