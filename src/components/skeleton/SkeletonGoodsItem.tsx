import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Animated} from 'react-native';

const SkeletonGoodsItem = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [animatedValue]);

  const interpolateBackground = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E0E0E0', '#BBB'],
  });

  const animatedStyle = {
    backgroundColor: interpolateBackground,
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.image, animatedStyle]} />
      <View style={styles.wrapper}>
        <Animated.View style={[styles.text, animatedStyle]} />
        <Animated.View style={[styles.text, animatedStyle]} />
        <Animated.View style={[styles.price, animatedStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    width: Dimensions.get('window').width / 2 - 24,
    marginHorizontal: 8,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  image: {
    width: Dimensions.get('window').width / 2 - 24,
    height: Dimensions.get('window').width / 2 - 24,
    borderRadius: 8,
  },
  wrapper: {
    margin: 8,
    gap: 8,
  },
  text: {
    width: '80%',
    height: 16,
    borderRadius: 4,
  },
  price: {
    width: '60%',
    height: 16,
    borderRadius: 4,
  },
});

export default SkeletonGoodsItem;
