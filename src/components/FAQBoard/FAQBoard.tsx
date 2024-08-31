import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {commonStyle} from '@/styles/common';
import {splitStringByDot} from '@/utils/splitStringByDot';
import {getFaqSpb} from '@/supabase/SettingSpb';
import {FapData} from '@/types/setting';

const FAQBoard = () => {
  const [data, setData] = useState<FapData[]>([]);

  useEffect(() => {
    fetchFaq();
  }, []);

  const fetchFaq = async () => {
    const res = await getFaqSpb();
    if (res) {
      setData(res);
    } else {
      setData([]);
    }
  };
  return (
    <View style={{flex: 1, paddingHorizontal: 24, backgroundColor: '#FFF'}}>
      {data.map((item, index) => (
        <View style={styles.renderContainer} key={index}>
          <Text style={commonStyle.REGULAR_33_16}>Q. {item.question}</Text>
          <View style={{gap: 2}}>
            {splitStringByDot(item.answer).map((item, index) => (
              <Text
                key={index}
                style={{...commonStyle.REGULAR_77_14, marginLeft: 2}}>
                {index === 0 && 'A. '}
                {item}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  renderContainer: {
    gap: 4,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
  },
});

export default FAQBoard;
