import React, {useRef, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {ToggleProps} from 'types/Common';

const ToggleButton: React.FC<ToggleProps> = ({initialState}) => {
  const animatedValue = useRef(
    new Animated.Value(initialState ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: initialState ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [initialState, animatedValue]);

  const iconTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-2, 13],
  });

  const bgColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#AAA', '#ED423F'],
  });

  return (
    <Animated.View style={[styles.toggleWrapper, {backgroundColor: bgColor}]}>
      <TouchableOpacity activeOpacity={0.8} disabled={true}>
        <Animated.View
          style={[styles.icon, {transform: [{translateX: iconTranslateX}]}]}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toggleWrapper: {
    borderRadius: 20,
    padding: 5,
    width: 40,
    height: 24,
    justifyContent: 'center',
  },
  icon: {
    width: 19,
    height: 19,
    backgroundColor: '#FFF',
    borderRadius: 30,
  },
});

export default ToggleButton;
