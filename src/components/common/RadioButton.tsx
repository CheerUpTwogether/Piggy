import React, {useRef} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {SelectProps} from 'types/Common';

/*
  isChecked : 상태 값
  setIsChecked : 상태 변경 함수
  activeColor : 활성화 시 컬러
*/

const RadioButton: React.FC<SelectProps> = ({
  isChecked,
  setIsChecked,
  activeColor = '#ED423F',
}) => {
  const isCheckedRef = useRef(isChecked);
  const checkAnimatedValue = useRef(new Animated.Value(0)).current;

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
    isCheckedRef.current = !isChecked;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onCheck}
      style={styles.radioContainer}>
      <Animated.View
        style={{
          ...styles.radioWrapper,
          borderColor: checkAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['#AAA', activeColor],
          }),
          backgroundColor: checkAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['white', activeColor],
          }),
        }}>
        <Animated.View
          style={{
            ...styles.radioIcon,
            opacity: checkAnimatedValue,
          }}></Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioWrapper: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 2,
  },
  radioIcon: {
    width: 10,
    height: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
});

export default RadioButton;
