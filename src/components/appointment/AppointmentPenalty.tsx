import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {commonStyle} from '@/styles/common';
import KeyPad, {useKeyPad} from '../common/Keypad';

const AppointmentPenalty = () => {
  const {inputValue, handlePress} = useKeyPad();

  return (
    <View>
      <Text style={commonStyle.MEDIUM_33_18}>벌금을 사용할까요?</Text>
      <Text style={[commonStyle.REGULAR_PRIMARY_12, {marginTop: 8}]}>
        * 벌금을 사용하고 싶지 않다면 0원으로 설정해주세요.
      </Text>
      <View style={styles.wrapper}>
        <View style={styles.amountTextWrapper}>
          <Text style={[commonStyle.REGULAR_77_16, styles.text]}>벌금</Text>

          <View style={styles.amountWrapper}>
            {inputValue ? (
              <Text style={[commonStyle.BOLD_33_24, styles.amount]}>
                {inputValue}
              </Text>
            ) : (
              <Text style={commonStyle.BOLD_33_24}>0</Text>
            )}

            <Text style={commonStyle.MEDIUM_PRIMARY_20}>Piggy</Text>
          </View>
        </View>

        <View style={styles.keypadWrapper}>
          <KeyPad onPress={handlePress} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    width: '100%',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    marginTop: 20,
  },
  button: {width: '40%'},
  textWrapper: {marginTop: 30, gap: 4},
  text: {textAlign: 'center', marginBottom: 10},
  amountTextWrapper: {marginTop: 30, gap: 8},
  amountWrapper: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount: {
    textAlign: 'right',
    marginRight: 8,
    width: 100,
  },
  keypadWrapper: {marginTop: 80},
});

export default AppointmentPenalty;
