import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import KeyPad, {useKeyPad} from '../common/Keypad';
import {useAppointmentForm, useUserStore} from '@/store/store';
import {getPiggySpb} from '@/supabase/AuthSpb';
import {commonStyle} from '@/styles/common';

const AppointmentPenalty = () => {
  const {inputValue, setInputValue, handlePress} = useKeyPad();
  const {appointmentForm, setAppointmentForm} = useAppointmentForm();
  const {userData} = useUserStore();
  const [piggy, setPiggy] = useState(0);
  useEffect(() => {
    setInputValue(String(appointmentForm.deal_piggy_count));
  }, []);

  // inputValue가 변경될 때마다 부모 컴포넌트로 업데이트
  useEffect(() => {
    setAppointmentForm('deal_piggy_count', inputValue);
  }, [inputValue]);

  // 화면이 포커스될 때마다 피기 새로고침
  useFocusEffect(
    useCallback(() => {
      getPiggy();
    }, []),
  );

  // 피기 정보 불러오기
  const getPiggy = async () => {
    const res = await getPiggySpb(userData.id);
    setPiggy(res?.[0]?.latest_piggy_count);
    console.log(res);
  };

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
                {appointmentForm.deal_piggy_count}
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
