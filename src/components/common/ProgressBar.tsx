import {commonStyle} from '@/styles/common';
import React, {useRef, useEffect} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import {ProgressBarProps} from '@/types/Common';

const ProgressBar: React.FC<ProgressBarProps> = ({
  totalStep,
  nowStep,
  progress = false,
}) => {
  const loaderValue = useRef(new Animated.Value(0)).current;

  // nowStep이 0보다 작거나 totalStep을 초과하지 않도록 제한
  const clampedStep = Math.max(0, Math.min(nowStep, totalStep));

  const load = (count: number) => {
    Animated.timing(loaderValue, {
      toValue: (count / totalStep) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const width = loaderValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    load(clampedStep);
  }, [clampedStep]);

  return (
    <View>
      <View style={styles.bar}>
        <Animated.View style={[styles.animated, {width}]} />
      </View>
      {progress && (
        <Text style={[commonStyle.MEDIUM_AA_16, styles.process]}>
          {clampedStep}/{totalStep}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {width: '100%', height: 3, backgroundColor: '#AAA', borderRadius: 2},
  animated: {backgroundColor: '#ED423F', height: 3, borderRadius: 2},
  process: {textAlign: 'center', marginVertical: 8},
});

export default ProgressBar;
