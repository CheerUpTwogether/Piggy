import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '@/types/Router';

type GiftAmountRouteProp = RouteProp<RootStackParamList, 'GiftAmount'>;

const GiftAmount = () => {
  const route = useRoute<GiftAmountRouteProp>();
  const {uuid, nick_name} = route.params;

  useEffect(() => {
    console.log('uuid => ', uuid);
    console.log('nick_name => ', nick_name);
  }, []);

  return (
    <View>
      <Text>GiftAmount</Text>
    </View>
  );
};

export default GiftAmount;
