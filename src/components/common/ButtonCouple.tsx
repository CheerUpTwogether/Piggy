import {ButtonCoupleProps} from '@/types/Common';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Button from './Button';

const ButtonCouple = ({
  onPressLeft,
  textLeft,
  onPressRight,
  textRight,
  theme,
  themeRight = 'primary',
  style,
  disableLeft,
  disableRight,
}: ButtonCoupleProps) => {
  return (
    <View style={[style, styles.container]}>
      <Button
        onPress={onPressLeft}
        text={textLeft}
        style={styles.flex}
        theme={theme}
        disable={disableLeft}
      />
      <Button
        onPress={onPressRight}
        text={textRight}
        style={styles.flex}
        disable={disableRight}
        theme={themeRight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  flex: {
    flex: 1,
  },
});

export default ButtonCouple;
