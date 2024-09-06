import React, {useCallback, useState} from 'react';
import {Text, View, Image, StyleSheet, Platform} from 'react-native';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import {GiftAmountNavigationProp} from '@/types/gift';
import {commonStyle} from '@/styles/common';
import {GiftAmountRouteProp} from '@/types/gift';
import KeyPad, {useKeyPad} from '@/components/common/Keypad';
import Button from '@/components/common/Button';
import {useUserStore, useToastStore} from '@/store/store';
import {getPiggySpb} from '@/supabase/AuthSpb';
import {setGiftPiggySpb} from '@/supabase/FriendsSpb';

import BasicProfileSvg from '@/assets/icons/basicProfile.svg';

const STYLE = Platform.OS === 'ios';

const GiftAmount = () => {
  const [myPiggy, setMyPiggy] = useState(0);
  const route = useRoute<GiftAmountRouteProp>();
  const {id, nickname, profile_img_url} = route.params;
  const {inputValue, handlePress} = useKeyPad();
  const {userData, setUserDataByKey} = useUserStore();
  const addToast = useToastStore(state => state.addToast);
  const navigation = useNavigation<GiftAmountNavigationProp>();

  useFocusEffect(
    useCallback(() => {
      fetchPiggyData();
    }, []),
  );

  const fetchPiggyData = async () => {
    const res = await getPiggySpb(userData.id);
    setMyPiggy(res?.latest_piggy_count || 0);
  };

  const handleSubmit = async () => {
    // 문자열 금액의 쉼표 제거 후 숫자로 변환
    const numericValue = Number(inputValue.replace(/,/g, ''));
    if (numericValue > myPiggy) {
      addToast({
        success: false,
        text: '소유한 피기보다',
        multiText: '많은 피기를 선물할 수 없어요.',
      });
      return;
    }
    if (numericValue < 500) {
      addToast({
        success: false,
        text: '500피기부터 선물할 수 있어요.',
      });
      return;
    }

    const isSuccess = await setGiftPiggySpb(userData.id, id, numericValue);

    if (isSuccess) {
      addToast({
        success: true,
        text: `${nickname}님께`,
        multiText: `${inputValue} 피기를 선물했어요!`,
      });
      setUserDataByKey('piggy', myPiggy);
      navigation.replace('PiggyUsage');
    } else {
      addToast({
        success: false,
        text: '선물하기에 실패했습니다.',
        multiText: '다시 시도해주세요.',
      });
    }
  };

  return (
    <View style={commonStyle.CONTAINER}>
      <View style={styles.wrapper}>
        <View style={styles.profileWrapper}>
          {profile_img_url ? (
            <Image
              style={styles.Profile}
              source={{uri: profile_img_url}}
              alt="profile"
            />
          ) : (
            <BasicProfileSvg width={80} height={80} />
          )}
        </View>
        <View style={styles.textWrapper}>
          <Text
            style={[
              STYLE ? commonStyle.MEDIUM_33_16 : commonStyle.MEDIUM_33_20,
              styles.text,
            ]}>
            {nickname}님에게
          </Text>
          <Text
            style={[
              STYLE ? commonStyle.MEDIUM_33_16 : commonStyle.MEDIUM_33_20,
              styles.text,
            ]}>
            얼마를 선물할까요?
          </Text>
        </View>
        <View style={styles.amountTextWrapper}>
          <Text
            style={[
              STYLE ? commonStyle.REGULAR_77_14 : commonStyle.REGULAR_77_16,
              styles.text,
            ]}>
            선물할 피기
          </Text>

          <View style={styles.amountWrapper}>
            {inputValue ? (
              <Text
                style={[
                  STYLE ? commonStyle.BOLD_33_20 : commonStyle.BOLD_33_24,
                  styles.amount,
                ]}>
                {inputValue}
              </Text>
            ) : (
              <Text
                style={STYLE ? commonStyle.BOLD_33_20 : commonStyle.BOLD_33_24}>
                0
              </Text>
            )}

            <Text
              style={
                STYLE
                  ? commonStyle.MEDIUM_PRIMARY_18
                  : commonStyle.MEDIUM_PRIMARY_20
              }>
              Piggy
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.keypadWrapper}>
        <KeyPad onPress={handlePress} />
      </View>

      <Button
        text={'선물하기'}
        size={'full'}
        onPress={handleSubmit}
        theme={'primary'}
        style={styles.button}
        disable={!inputValue || inputValue === '0'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {alignItems: 'center', marginTop: STYLE ? 20 : 40},
  profileWrapper: {
    width: 120,
    height: 120,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#DDD',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Profile: {width: 160, height: 160},
  textWrapper: {marginTop: 30, gap: 4},
  text: {textAlign: 'center'},
  amountTextWrapper: {marginTop: STYLE ? 20 : 30, gap: 8},
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
  keypadWrapper: {marginTop: STYLE ? 50 : 50},
  button: {
    width: '100%',
    justifyContent: 'center',
    marginTop: STYLE ? 60 : 70,
  },
});

export default GiftAmount;
