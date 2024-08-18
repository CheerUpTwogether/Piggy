import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ButtonProps} from '@/types/Common';

const Button = ({
  text,
  onPress,
  size = 'full',
  theme = 'primary',
  disable = false,
  icon: Icon,
  style = {},
}: ButtonProps) => {
  const btnDisable = disable
    ? theme === 'outline'
      ? styles.outlineDisable
      : styles.disable
    : null;

  const iconColor = () => {
    if (disable) {
      if (theme === 'outline') {
        return '#aaa';
      }
      return '#fff';
    }

    if (theme === 'outline') {
      return '#ED423F';
    } else if (theme === 'sub') {
      return '#777';
    }
    return '#fff';
  };

  return (
    <View style={style}>
      <TouchableOpacity
        style={[
          styles.btn,
          styles[`${theme}Btn`],
          styles[`${size}Btn`],
          btnDisable,
        ]}
        onPress={onPress}
        disabled={disable}
        activeOpacity={theme === 'primary' ? 0.8 : 0.6}>
        {Icon ? (
          <Icon
            color={iconColor()}
            width={18}
            height={18}
            style={{marginRight: 4}}
          />
        ) : (
          <></>
        )}
        <Text
          style={[styles[`${theme}Text`], styles[`${size}Text`], btnDisable]}>
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
    width: 76,
  },
  primaryBtn: {
    backgroundColor: '#ED423F',
  },
  subBtn: {
    backgroundColor: '#EFEFEF',
    color: '#777',
  },
  outlineBtn: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ED423F',
  },
  primaryText: {
    color: '#ffffff',
  },
  subText: {
    backgroundColor: '#EFEFEF',
    color: '#777',
  },
  outlineText: {
    color: '#ED423F',
  },
  fullText: {
    fontSize: 16,
    fontFamily: 'NotoSansKR-Medium',
  },
  lgText: {
    fontSize: 16,
    fontFamily: 'NotoSansKR-Medium',
  },
  mdText: {
    fontSize: 14,
    fontFamily: 'NotoSansKR-Medium',
  },
  smText: {
    fontSize: 14,
    fontFamily: 'NotoSansKR-Regular',
  },
  disable: {
    backgroundColor: '#AAAAAA',
    color: '#fff',
  },
  outlineDisable: {
    borderColor: '#AAAAAA',
    color: '#AAAAAA',
  },
});

export default Button;
