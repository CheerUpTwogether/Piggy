import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {commonStyle} from '@/styles/common';
import {splitStringByDot} from '@/utils/splitStringByDot';
import {dummyFAQItem} from '@/mock/FAQBoard/types';
import {dummyFAQItemData} from '@/mock/FAQBoard/FAQBoard';

const FAQBoard = () => {
  const renderFAQItem = ({item}: {item: dummyFAQItem}) => (
    <View
      style={{
        gap: 4,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#EFEFEF',
      }}>
      <Text style={commonStyle.REGULAR_33_16}>Q. {item.title}</Text>
      <View style={{gap: 2}}>
        {splitStringByDot(item.content).map((item, index) => (
          <Text
            key={index}
            style={{...commonStyle.REGULAR_77_14, marginLeft: 2}}>
            {index === 0 && 'A. '}
            {item}
          </Text>
        ))}
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, paddingHorizontal: 24, backgroundColor: '#FFF'}}>
      <FlatList
        data={dummyFAQItemData}
        keyExtractor={item => item.id}
        renderItem={renderFAQItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FAQBoard;
