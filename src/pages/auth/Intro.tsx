import React from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types/Router';

const Intro = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSatrt = () => {
    navigation.replace('Main', {screen: 'Home'});
  };
  return (
    <View>
      <Text>Intro</Text>
    </View>
  );
};

export default Intro;
