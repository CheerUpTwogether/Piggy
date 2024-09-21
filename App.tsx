import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Router from '@/router/index';
import {NavigationContainer} from '@react-navigation/native';
import ModalDefault from '@/components/common/ModalDefault';
import Toast from '@/components/common/Toast';
import 'react-native-url-polyfill/auto';

import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async () => {});

const App = () => {
  const getFcmToken = async () => {
    await messaging().getToken();
  };

  useEffect(() => {
    getFcmToken();
    const unsubscribe = messaging().onMessage(async () => {
      return unsubscribe;
    });
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
