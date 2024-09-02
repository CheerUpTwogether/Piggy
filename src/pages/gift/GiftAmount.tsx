import React from 'react';
import {Text, View, Image, StyleSheet, Platform} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {commonStyle} from '@/styles/common';
import {GiftAmountRouteProp} from './type';
import KeyPad, {useKeyPad} from '@/components/common/Keypad';
import Button from '@/components/common/Button';

const STYLE = Platform.OS === 'ios';

const GiftAmount = () => {
  const route = useRoute<GiftAmountRouteProp>();
  const {id, nickname, profile_img_url} = route.params;
  const {inputValue, handlePress} = useKeyPad();

  const handleSubmit = () => {
    console.log('TODO: 선물하기', id);
  };

  return (
    <View style={commonStyle.CONTAINER}>
      <View style={styles.wrapper}>
        <View style={styles.profileWrapper}>
          <Image
            style={styles.Profile}
            source={{uri: profile_img_url}}
            alt="profile"
          />
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
        disable={inputValue ? false : true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {alignItems: 'center', marginTop: STYLE ? 20 : 40},
  profileWrapper: {
    width: STYLE ? 120 : 160,
    height: STYLE ? 120 : 160,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#DDD',
    overflow: 'hidden',
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
  keypadWrapper: {marginTop: STYLE ? 50 : 80},
  button: {
    width: '100%',
    justifyContent: 'center',
    marginTop: STYLE ? 60 : 80,
  },
});

export default GiftAmount;
