import React from 'react';
import {Image, Text, View} from 'react-native';
import {commonStyle} from '@/styles/common';
import {useRoute, RouteProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {splitStringByDot} from '@/utils/splitStringByDot';
import {RootStackParamList} from '@/types/Router';

const NoticeBoardDetail = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'NoticeBoardDetail'>>();
  const {id, title, content, content_url, create_date} = route.params;

  return (
    <View style={{flex: 1, paddingHorizontal: 24, backgroundColor: '#FFF'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{...commonStyle.BOLD_33_16, marginVertical: 8}}>
          {title}
        </Text>
        <Text style={commonStyle.REGULAR_77_12}>{create_date}</Text>
        <View
          style={{height: 1, backgroundColor: '#EFEFEF', marginVertical: 14}}
        />
        <View style={{gap: 2}}>
          {splitStringByDot(content).map((item, index) => (
            <Text key={index} style={commonStyle.REGULAR_33_14}>
              {item}
            </Text>
          ))}
        </View>

        <Image
          source={{uri: 'https://picsum.photos/300/680'}}
          style={{width: '100%', height: 680, marginVertical: 36}}
        />
      </ScrollView>
    </View>
  );
};

export default NoticeBoardDetail;
