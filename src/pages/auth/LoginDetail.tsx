import {useNavigation} from '@react-navigation/native';
import InputBox from '@/components/common/InputBox';
import {commonStyle} from '@/styles/common';
import {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import NickNameSvg from '@/assets/icons/nickname.svg';
import CheckBox from '@/components/common/CheckBox';
import RightArrowSvg from '@/assets/icons/rightArrow.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/Router';
import Button from '@/components/common/Button';
import {useToastStore, useUserStore} from '@/store/store';
import {dummy_profile} from '@/mock/Friends/Friends';
import EmailSvg from '@/assets/icons/email.svg';
const logo = require('@/assets/icons/logo.png');

const LoginDetail = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {userData, setIsAgree} = useUserStore();
  const [email, setEmail] = useState('(TEST) 약관만 모두 동의 후 시작!');
  const [nickName, setNickName] = useState(dummy_profile.nick_name);
  const addToast = useToastStore(state => state.addToast);
  const [isAgreeService, setIsAgreeService] = useState(
    userData?.isAgree.service || false,
  );
  const [isAgreePayment, setIsAgreePayment] = useState(
    userData?.isAgree.payment || false,
  );
  const [isError, setIsError] = useState(true);

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
        <View style={{gap: 8}}>
          <Text style={commonStyle.MEDIUM_33_16}>이메일</Text>

          <View style={styles.disableInputContainer}>
            <View style={styles.disableInputWrapper}>
              <EmailSvg width={18} height={18} color={'#333'} />
              <Text style={{...commonStyle.MEDIUM_33_14, marginTop: -3}}>
                {email}
              </Text>
            </View>
          </View>
        </View>

        <View style={{gap: 8}}>
          <Text style={commonStyle.MEDIUM_33_16}>닉네임</Text>

          <InputBox
            value={nickName}
            setValue={setNickName}
            placeholder={'수정하실 닉네임을 입력해주세요.'}
            icon={NickNameSvg}
            isLarge={true}
          />
          {isError && (
            <Text style={commonStyle.MEDIUM_PRIMARY_12}>
              *닉네임은 8글자까지 설정할 수 있습니다
            </Text>
          )}
        </View>

        <View style={styles.checkBoxContainer}>
          <CheckBox
            isChecked={isAgreeService}
            setIsChecked={setIsAgreeService}
            onPress={() => {
              hadnleAgreeService();
            }}
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
        {/* 나누기 */}

        <View style={styles.checkBoxContainer}>
          <CheckBox
            isChecked={isAgreePayment}
            setIsChecked={setIsAgreePayment}
            onPress={() => {
              handleAgreePayment();
            }}
          />
          <TouchableOpacity
            onPress={() => gotoPaymentAgreement()}
            activeOpacity={0.8}
            style={{flexGrow: 1, paddingVertical: 6}}>
            <Text style={{...commonStyle.REGULAR_33_14}}>
              Piggy 서비스 이용약관(필수)
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
  disableInputContainer: {
    height: 48,
    backgroundColor: '#EFEFEF',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#AAA',
    paddingHorizontal: 22,
    justifyContent: 'center',
  },
  disableInputWrapper: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
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
