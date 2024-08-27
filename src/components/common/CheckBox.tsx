import React, {useRef} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {CheckBoxProps} from 'types/Common';
import CheckSvg from '@/assets/icons/check.svg';
/*
  isChecked : 상태 값
  setIsChecked : 상태 변경 함수
  onPress : 눌렀을때 추가 처리 로직
  activeColor : 활성화 시 컬러
*/

const CheckBox: React.FC<CheckBoxProps> = ({
  isChecked,
  setIsChecked,
  onPress,
  activeColor = '#ED423F',
}) => {
  const isCheckedRef = useRef(isChecked);
  const checkAnimatedValue = useRef(
    new Animated.Value(Number(isChecked)),
  ).current;
  const borderAnimatedValue = useRef(
    new Animated.Value(Number(isChecked)),
  ).current;
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
    if (onPress) {
      onPress();
    }
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
          backgroundColor: borderAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['#fff', activeColor],
          }),
        }}>
        <Animated.View
          style={{
            opacity: checkAnimatedValue,
          }}>
          <CheckSvg width={16} />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkBoxContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxWrapper: {
    width: 20,
    height: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  checkBoxIcon: {
    fontWeight: 'bold',
  },
});

export default CheckBox;
