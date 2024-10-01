import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const SkeletonAppointmentItem = () => {
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
      {/* 타이틀 및 more 버튼 */}
      <View style={styles.title}>
        <Animated.View style={[styles.titleSkeleton, animatedStyle]} />
        <Animated.View style={[styles.moreSkeleton, animatedStyle]} />
      </View>

      {/* 장소 */}
      <Animated.View style={[styles.textSkeleton, animatedStyle]} />

      {/* 시간 */}
      <Animated.View style={[styles.textSkeleton, animatedStyle]} />

      <View style={styles.friendsTagContiner}>
        {/* 친구 리스트 */}
        <View style={styles.friendsList}>
          {Array.from({length: 3}).map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.profileSkeleton,
                index !== 0 && styles.marginLeftMinus,
                animatedStyle,
              ]}
            />
          ))}
        </View>

        {/* 태그 */}
        <Animated.View style={[styles.tagSkeleton, animatedStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 10,
    marginBottom: 10,
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
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  titleSkeleton: {
    width: 150,
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  moreSkeleton: {
    width: 24,
    height: 24,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
  },
  textSkeleton: {
    width: '80%',
    height: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginTop: 8,
  },
  friendsTagContiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 16,
  },
  friendsList: {
    flexDirection: 'row',
    paddingTop: 16,
  },
  profileSkeleton: {
    width: 36,
    height: 36,
    borderRadius: 100,
    backgroundColor: '#e0e0e0',
  },
  marginLeftMinus: {
    marginLeft: -8,
  },
  tagSkeleton: {
    width: 100,
    height: 24,
    backgroundColor: '#e0e0e0',
    borderRadius: 100,
  },
});

export default SkeletonAppointmentItem;
