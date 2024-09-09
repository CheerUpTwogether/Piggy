import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Router from '@/router/index';
import {NavigationContainer} from '@react-navigation/native';
import ModalDefault from '@/components/common/ModalDefault';
import Toast from '@/components/common/Toast';
import 'react-native-url-polyfill/auto';

import BootSplash from 'react-native-bootsplash';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('[Background Remote Message]', remoteMessage);
});

const App = () => {
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('[FCM Token]', fcmToken);
  };

  useEffect(() => {
    getFcmToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('[Remote Message', JSON.stringify(remoteMessage));
      return unsubscribe;
    });
    BootSplash.hide({fade: true});
  }, []);

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Router />
        <ModalDefault />
        <Toast />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
