import {createStackNavigator, StackHeaderProps} from '@react-navigation/stack';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {MainHeaderProps} from '@/types/Router';

import CustomBottomTab from '@/router/CustomBottomTab';
import CustomTopTabMain from '@/router/CustomTopTabMain';
import Splash from 'pages/Splash';
import Login from '@/pages/auth/Login';
import Home from '@/pages/home/Home';
import Friends from '@/pages/friends/Friends';
import Goods from '@/pages/goods/Goods';
import Settings from '@/pages/settings/Settings';

const Stack = createStackNavigator();
const StackBottomTab = createBottomTabNavigator();

const BottomTab = (props: BottomTabBarProps) => <CustomBottomTab {...props} />;

const MainHeader = ({route}) => {
  return <CustomTopTabMain route={route} />;
};

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
        name="Main"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
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
    </Stack.Navigator>
  );
};

export default Router;
