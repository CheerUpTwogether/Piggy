import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const SkeletonFriendItem = () => {
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
      <Animated.View style={[styles.profileImg, animatedStyle]} />
      <View style={styles.textWrapper}>
        <Animated.View style={[styles.text, animatedStyle]} />
      </View>
      <View style={styles.moreWrapper}>
        <Animated.View style={[styles.more, animatedStyle]} />
        <Animated.View style={[styles.more, animatedStyle]} />
        <Animated.View style={[styles.more, animatedStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
    marginHorizontal: -12,
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
    marginRight: 16,
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    width: '60%',
    height: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 8,
  },
  moreWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  more: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 4,
    height: 4,
    borderRadius: 30,
  },
});

export default SkeletonFriendItem;
