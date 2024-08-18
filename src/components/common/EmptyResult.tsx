import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {EmptyProps} from '@/types/Common';

import EmptySvg from '@/assets/icons/empty.svg';

const EmptyResult: React.FC<EmptyProps> = ({reason, solution}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <EmptySvg width={80} height={80} />
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{reason}</Text>
          <Text style={styles.text}>{solution}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFF'},
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  textWrapper: {marginTop: 30},
  text: {
    color: '#333',
    fontFamily: 'NotoSansKR-Regular',
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default EmptyResult;
