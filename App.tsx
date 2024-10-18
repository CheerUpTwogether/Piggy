import React, {useEffect} from 'react';
import CodePush from 'react-native-code-push';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Router from '@/router/index';
import {NavigationContainer} from '@react-navigation/native';
import ModalDefault from '@/components/common/ModalDefault';
import Toast from '@/components/common/Toast';
import 'react-native-url-polyfill/auto';
import BootSplash from 'react-native-bootsplash';

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

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  updateDialog: {
    title: '...',
    optionalUpdateMessage: '...',
    optionalInstallButtonLabel: '업데이트',
    optionalIgnoreButtonLabel: '아니요.',
  },
  installMode: CodePush.InstallMode.IMMEDIATE,
};

export default CodePush(codePushOptions)(App);
