import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useToastStore} from '@/store/store';
import {commonStyle} from '../../styles/common.ts';
import {KeyPadItemType, KeyPadProps} from '@/types/Common.ts';

import DeleteButtonSvg from '../../assets/icons/delete.svg';

// KeyPad 기본 컴포넌트 -> export default
const KeyPad: React.FC<KeyPadProps> = ({onPress}) => {
  const buttons: KeyPadItemType[][] = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['00', '0', 'deleteButton'],
  ];

  return (
    <View style={styles.container}>
      {buttons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item, buttonIndex) => (
            <TouchableOpacity
              key={buttonIndex}
              style={styles.button}
              onPress={() => onPress(item)}
              activeOpacity={0.8}>
              {item === 'deleteButton' ? (
                <DeleteButtonSvg width={24} height={24} color={'#333'} />
              ) : (
                <Text style={commonStyle.MEDIUM_33_20}>{item}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

// 값 받는 용도의 커스텀 훅
export const useKeyPad = () => {
  const [inputValue, setInputValue] = useState('');
  const addToast = useToastStore(state => state.addToast);

  const formatCurrency = (value: string) => {
    // 숫자만 남기고 나머지 문자 제거
    const numericValue = value.replace(/[^0-9]/g, '');

    // 숫자로 변환 후 천 단위로 쉼표 삽입
    return new Intl.NumberFormat('ko-KR').format(Number(numericValue));
  };

  const handlePress = (item: KeyPadItemType) => {
    if (item === 'deleteButton') {
      setInputValue(prev => {
        const newValue = prev.slice(0, -1);
        return formatCurrency(newValue);
      });
    } else if ((item === '0' || item === '00') && inputValue === '') {
      return;
    } else {
      setInputValue(prev => {
        const newValue = prev + item;

        // 숫자 형태로 변환하고 최대값 제한
        const numericValue = parseInt(newValue.replace(/,/g, ''), 10);
        if (numericValue > 100000) {
          addToast({
            success: false,
            text: '100,000피기 초과',
            multiText: '10만 피기를 넘을 수 없어요.',
          });
          return prev; // 100,000원 초과 시 이전 값 유지
        }

        return formatCurrency(newValue);
      });
    }
  };

  return {
    inputValue,
    handlePress,
  };
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 26,
    marginRight: 26,
  },
});

export default KeyPad;
