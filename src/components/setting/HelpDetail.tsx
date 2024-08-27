import React from 'react';
import {View, Text} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';

type HelpDetailRouteParams = {
  HelpDetail: {
    id: string;
  };
};

const HelpDetail = () => {
  const route = useRoute<RouteProp<HelpDetailRouteParams, 'HelpDetail'>>();
  const {id} = route.params;

  return (
    <View>
      <Text>HelpDetail</Text>
      <Text>{id}</Text>
    </View>
  );
};

export default HelpDetail;
