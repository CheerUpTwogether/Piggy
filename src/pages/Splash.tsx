import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    // 2초(2000ms) 후에 'Login' 화면으로 이동하도록 설정
    const timeout = setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);

    // 컴포넌트가 언마운트될 때 타임아웃을 정리
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;
