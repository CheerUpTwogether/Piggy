import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import SkeletonBasicProfile from './SkeletonBasicProfile';

const SkeletonHomeProfile = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  // 애니메이션 설정
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
    outputRange: ['#e0e0e0', '#BBB'], // 밝기 변화
  });

  const animatedStyle = {
    backgroundColor: interpolateBackground,
  };

  return (
    <View style={styles.container}>
      <View style={styles.myInfoBox}>
        <View style={styles.flexRow}>
          <SkeletonBasicProfile />
        </View>

        <View style={styles.buttonContainer}>
          {/* 버튼 */}
          <Animated.View style={[styles.buttonSkeleton, animatedStyle]} />
          <Animated.View style={[styles.buttonSkeleton, animatedStyle]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 14,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
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
    width: 68,
    height: 68,
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

export default SkeletonHomeProfile;
