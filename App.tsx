import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Router from 'router/index';
import {NavigationContainer} from '@react-navigation/native';
import ModalDefault from '@/components/common/ModalDefault';

const App = () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Router />
        <ModalDefault />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
