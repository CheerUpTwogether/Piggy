import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Router from '@/router/index';
import {NavigationContainer} from '@react-navigation/native';
import ModalDefault from '@/components/common/ModalDefault';
import Toast from '@/components/common/Toast';
import 'react-native-url-polyfill/auto';

const App = () => {
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
