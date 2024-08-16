import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';

const emptyImage = require('@/assets/images/emptyImage.jpg');

interface EmptyProps {
  reason: string;
  solution: string;
}

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
  text: {color: '#333'},
});

export default EmptyResult;
