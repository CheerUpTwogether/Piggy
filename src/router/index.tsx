import {createStackNavigator} from '@react-navigation/stack';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Splash from 'pages/Splash';
import Login from '@/pages/auth/Login';

const StackTab = createStackNavigator();
// const StackBottomTab = creteBottomTabNavigator();

// const renderTabBar = (props: BottomTabBarProps) => (
//   <CustomBottomTab {...props} />
// );

// const BottomTab = () => {
//   return (
//     <StackBottomTab.Navigator
//       screenOptions={{headerShown: false}}
//       tabBar={renderTabBar}>
//       <BottomTabNav.Screen name="Home" component={Home} />
//       <BottomTabNav.Screen name="Articles" component={Articles} />
//       <BottomTabNav.Screen name="Community" component={Community} />
//       <BottomTabNav.Screen name="Settings" component={Settings} />
//     </StackBottomTab.Navigator>
//   );
// };

const Router = () => {
  return (
    <StackTab.Navigator screenOptions={{headerShown: false}}>
      <StackTab.Screen name="Splash" component={Splash} />
      <StackTab.Screen name="Login" component={Login} />
    </StackTab.Navigator>
  );
};

export default Router;
