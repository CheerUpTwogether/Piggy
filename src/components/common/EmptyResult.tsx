import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {EmptyProps} from '@/types/Common';

const emptyImage = require('@/assets/images/emptyImage.jpg');

const EmptyResult: React.FC<EmptyProps> = ({reason, solution}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image style={styles.image} source={emptyImage} />
        <Text style={styles.text}>{reason}</Text>
        <Text style={styles.text}>{solution}</Text>
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
  image: {width: 80, height: 80, marginBottom: 20},
  text: {color: '#333', fontFamily: 'NotoSansKR-Medium', fontWeight: '400'},
});

export default EmptyResult;
