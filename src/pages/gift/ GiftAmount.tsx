import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {commonStyle} from '@/styles/common';
import {GiftAmountRouteProp} from './type';
import KeyPad, {useKeyPad} from '@/components/common/Keypad';
import Button from '@/components/common/Button';

const GiftAmount = () => {
  const route = useRoute<GiftAmountRouteProp>();
  const {uuid, nick_name, profile_image_path} = route.params;
  const {inputValue, handlePress} = useKeyPad();

  const handleSubmit = () => {
    console.log('TODO: 선물하기', uuid);
  };

  return (
    <View style={commonStyle.CONTAINER}>
      <View style={styles.wrapper}>
        <View style={styles.profileWrapper}>
          <Image style={styles.Profile} source={{uri: profile_image_path}} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={[commonStyle.MEDIUM_33_20, styles.text]}>
            {nick_name}님에게
          </Text>
          <Text style={[commonStyle.MEDIUM_33_20, styles.text]}>
            얼마를 선물할까요?
          </Text>
        </View>
        <View style={styles.amountTextWrapper}>
          <Text style={[commonStyle.REGULAR_77_16, styles.text]}>
            선물할 피기
          </Text>

          <View style={styles.amountWrapper}>
            {inputValue ? (
              <Text style={[commonStyle.BOLD_33_20, styles.amount]}>
                {inputValue}
              </Text>
            ) : (
              <Text style={commonStyle.BOLD_33_20}>0</Text>
            )}

            <Text style={commonStyle.MEDIUM_PRIMARY_20}>Piggy</Text>
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
  wrapper: {alignItems: 'center', marginTop: 40},
  profileWrapper: {
    width: 160,
    height: 160,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#DDD',
    overflow: 'hidden',
  },
  Profile: {width: 160, height: 160},
  textWrapper: {marginTop: 30, gap: 4},
  text: {textAlign: 'center'},
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
  button: {
    width: '100%',
    justifyContent: 'center',
    marginTop: 70,
  },
});

export default GiftAmount;
