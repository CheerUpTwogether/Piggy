import {SelectProps} from '@/types/Common';
import React, {useRef} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';

/*
  isChecked : 상태 값
  setIsChecked : 상태 변경 함수
  activeColor : 활성화 시 컬러
*/

const CheckBox: React.FC<SelectProps> = ({
  isChecked,
  setIsChecked,
  activeColor = '#ED423F',
}) => {
  const isCheckedRef = useRef(isChecked);
  const checkAnimatedValue = useRef(new Animated.Value(0)).current;
  const borderAnimatedValue = useRef(new Animated.Value(0)).current;
  const checkAnimated = (
    value: number,
    animatedValue: Animated.Value,
  ): Animated.CompositeAnimation => {
    return Animated.timing(animatedValue, {
      useNativeDriver: true,
      toValue: value,
      duration: 100,
    });
  };

  const onCheck = () => {
    setIsChecked(!isChecked);
    checkAnimated(Number(!isChecked), checkAnimatedValue).start();
    checkAnimated(Number(!isChecked), borderAnimatedValue).start();
    isCheckedRef.current = !isChecked;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onCheck}
      style={styles.checkBoxContainer}>
      <Animated.View
        style={{
          ...styles.checkBoxWrapper,
          borderColor: borderAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['#333333', activeColor],
          }),
        }}>
        <Animated.Text
          style={{
            ...styles.checkBoxIcon,
            color: activeColor,
            opacity: checkAnimatedValue,
          }}>
          ✓
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkBoxContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxWrapper: {
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  checkBoxIcon: {
    fontWeight: 'bold',
  },
});

export default CheckBox;
