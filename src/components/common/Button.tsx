import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ButtonProps} from '@/types/Common';
import {
  color_77,
  color_aa,
  color_ef,
  color_ff,
  color_primary,
  commonStyle,
} from '@/styles/common';

const Button = ({
  text,
  onPress,
  size = 'full',
  theme = 'primary',
  disable = false,
  icon,
  style = {},
}: ButtonProps) => {
  const btnDisable = disable
    ? theme === 'outline'
      ? styles.outlineDisable
      : styles.disable
    : null;

  return (
    <View style={style}>
      <TouchableOpacity
        style={[
          styles[`${size}Btn`],
          styles[`${theme}Btn`],
          styles.btn,
          btnDisable,
        ]}
        onPress={onPress}
        disabled={disable}
        activeOpacity={0.8}>
        {icon}
        <Text
          style={(styles[`${size}Text`], [styles[`${theme}Text`], btnDisable])}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    flexDirection: 'row',
  },
  fullBtn: {
    height: 48,
  },
  lgBtn: {
    width: 160,
    height: 48,
  },
  mdBtn: {
    width: 110,
    height: 40,
  },
  smBtn: {
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: 80,
    height: 48,
    backgroundColor: 'yellow',
  },
  primaryBtn: {
    backgroundColor: color_primary,
  },
  subBtn: {
    backgroundColor: color_ef,
    color: color_77,
  },
  outlineBtn: {
    backgroundColor: color_ff,
    borderWidth: 1,
    borderColor: color_primary,
  },
  primaryText: {
    color: color_ff,
  },
  subText: {
    backgroundColor: color_ef,
    color: color_77,
  },
  outlineText: {
    color: color_primary,
  },
  fullText: commonStyle.MEDIUM_33_16,
  lgText: commonStyle.MEDIUM_33_16,
  mdText: commonStyle.MEDIUM_33_14,
  smText: commonStyle.REGULAR_33_14,
  disable: {
    backgroundColor: color_aa,
    color: color_ff,
  },
  outlineDisable: {
    borderColor: color_aa,
    color: color_aa,
  },
});

export default Button;
