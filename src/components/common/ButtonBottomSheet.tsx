import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import Button from '@/components/common/Button';
import BottomSheet from './BottomSheet';
import {ButtonBottomSheetProps} from '@/types/common';

const ButtonBottomSheet: React.FC<ButtonBottomSheetProps> = ({
  isShow,
  setIsShow,
  buttons,
}) => {
  // 버튼의 개수에 따라 size 설정
  const size = Platform.select({
    ios: buttons.length === 1 ? 0.23 : 0.3,
    android: buttons.length === 1 ? 0.18 : 0.25,
  }) as number;

  const minHeight = buttons.length === 1 ? 190 : 250;

  return (
    <BottomSheet
      isShow={isShow}
      setIsShow={setIsShow}
      size={size}
      minHeight={minHeight}
      component={() => ButtonsComponent({buttons, setIsShow})}
    />
  );
};

const ButtonsComponent = ({
  buttons,
  setIsShow,
}: {
  buttons: ButtonBottomSheetProps['buttons'];
  setIsShow: ButtonBottomSheetProps['setIsShow'];
}) => (
  <View style={styles.modalContainer}>
    {buttons.map(button => (
      <Button
        text={button.text}
        theme={button.theme}
        onPress={button.onPress}
        key={button.text}
        disable={button.disable}
      />
    ))}
    <Button text="취소" theme="sub" onPress={() => setIsShow(false)} />
  </View>
);

const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
});

export default ButtonBottomSheet;
