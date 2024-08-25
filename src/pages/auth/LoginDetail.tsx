import {useNavigation} from '@react-navigation/native';
import {commonStyle} from '@/styles/common';
import {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CheckBox from '@/components/common/CheckBox';
import RightArrowSvg from '@/assets/icons/rightArrow.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/Router';
import Button from '@/components/common/Button';
import {useToastStore, useUserStore} from '@/store/store';
import LoginDetailForm from './LoginDetailForm';

const logo = require('@/assets/icons/logo.png');

const LoginDetail = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {userData, setIsAgree} = useUserStore();
  const addToast = useToastStore(state => state.addToast);
  const [isAgreeService, setIsAgreeService] = useState(
    userData?.isAgree.service || false,
  );
  const [isAgreePayment, setIsAgreePayment] = useState(
    userData?.isAgree.payment || false,
  );

  const handleAgreeToast = () =>
    addToast({
      success: false,
      text: '약관 미동의.',
      multiText: '모든 필수 약관에 동의해주세요',
    });

  const gotoServiceAgreement = () => {
    navigation.navigate('ServiceAgreement');
  };

  const gotoPaymentAgreement = () => {
    navigation.navigate('PaymentAgreement');
  };

  const gotoHome = () => {
    if (!isAgreeService || !isAgreePayment) {
      handleAgreeToast();
      return;
    }
    navigation.replace('Main', {screen: 'Home'});
  };

  const hadnleAgreeService = () => {
    // service 동의 여부 토글
    setIsAgree('service');
  };

  const handleAgreePayment = () => {
    // payment 동의 여부 토글
    setIsAgree('payment');
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image source={logo} style={styles.logoContainer} />
      </View>
      <View style={styles.introContainer}>
        <Text style={{...commonStyle.BOLD_33_20, fontSize: 24}}>시작하기</Text>
        <Text style={commonStyle.REGULAR_AA_16}>
          피기에서 사용할 닉네임을 설정하세요!
        </Text>
      </View>
      <View style={{gap: 16}}>
        <LoginDetailForm />
        <View style={styles.checkBoxContainer}>
          <CheckBox
            isChecked={isAgreeService}
            setIsChecked={setIsAgreeService}
            onPress={() => hadnleAgreeService()}
          />
          <TouchableOpacity
            onPress={() => gotoServiceAgreement()}
            activeOpacity={0.8}
            style={{flexGrow: 1, paddingVertical: 6}}>
            <Text style={{...commonStyle.REGULAR_33_14}}>
              Piggy 서비스 이용약관(필수)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => gotoServiceAgreement()}
            activeOpacity={0.8}
            style={styles.rightArrowIconContainer}>
            <RightArrowSvg />
          </TouchableOpacity>
        </View>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            isChecked={isAgreePayment}
            setIsChecked={setIsAgreePayment}
            onPress={() => handleAgreePayment()}
          />
          <TouchableOpacity
            onPress={() => gotoPaymentAgreement()}
            activeOpacity={0.8}
            style={{flexGrow: 1, paddingVertical: 6}}>
            <Text style={{...commonStyle.REGULAR_33_14}}>
              Piggy 결제 이용약관(필수)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => gotoPaymentAgreement()}
            activeOpacity={0.8}
            style={styles.rightArrowIconContainer}>
            <RightArrowSvg />
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 60}}>
          <Button text="시작하기" onPress={gotoHome} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 36,
    backgroundColor: '#FFF',
  },
  logoContainer: {marginLeft: 40, width: 160, height: 62},
  introContainer: {marginVertical: 42, alignItems: 'center', gap: 12},
  checkBoxContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  rightArrowIconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginDetail;
