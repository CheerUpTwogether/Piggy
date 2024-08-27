import React, {useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types/Router';
const logo = require('@/assets/icons/logo.png');

const Splash = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    // 2초(2000ms) 후에 'Login' 화면으로 이동하도록 설정
    const timeout = setTimeout(() => {
      navigation.replace('Main', {screen: 'Home'});
    }, 2000);

    // 컴포넌트가 언마운트될 때 타임아웃을 정리
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} style={{width: 320, height: 124}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    marginTop: -60,
    alignItems: 'center',
  },
});
export default Splash;
