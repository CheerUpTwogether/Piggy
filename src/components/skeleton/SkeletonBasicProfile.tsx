import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const SkeletonBasicProfile = () => {
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
      <View style={styles.flexRow}>
        {/* 프로필 이미지 */}
        <Animated.View style={[styles.profileImgSkeleton, animatedStyle]} />

        <View>
          {/* 닉네임 */}
          <Animated.View style={[styles.textSkeleton, animatedStyle]} />
          {/* Piggy */}
          <Animated.View
            style={[styles.textSkeleton, styles.shortText, animatedStyle]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginVertical: 20,
  },
  myInfoBox: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImgSkeleton: {
    width: 64,
    height: 64,
    borderRadius: 100,
    backgroundColor: '#E0E0E0',
    marginRight: 8,
  },
  textSkeleton: {
    width: 120,
    height: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 8,
  },
  shortText: {
    width: 80,
    height: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonSkeleton: {
    width: '48%',
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
  },
});

export default SkeletonBasicProfile;
