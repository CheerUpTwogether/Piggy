import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Button from '@/components/common/Button';
import BottomSheet from './BottomSheet';
import {ButtonBottomSheetProps} from '@/types/Common';

const ButtonBottomSheet: React.FC<ButtonBottomSheetProps> = ({
  isShow,
  setIsShow,
  buttons,
}) => {
  // 버튼의 개수에 따라 size 설정
  const size = buttons.length === 1 ? 0.18 : 0.25;

  return (
    <BottomSheet
      isShow={isShow}
      setIsShow={setIsShow}
      size={size}
      component={({closeModal}) => (
        <View style={styles.modalContainer}>
          {buttons.map((button, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => {
                button.onPress();
                closeModal();
              }}>
              <Button text={button.text} theme={button.theme} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity activeOpacity={0.8} onPress={closeModal}>
            <Button key="cancel" text="취소" theme="sub" />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
});

export default ButtonBottomSheet;
