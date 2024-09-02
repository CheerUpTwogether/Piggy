import React, {useState} from 'react';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useToastStore, useUserStore} from '@/store/store';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/Router';
import {commonStyle} from '@/styles/common';
import Button from '@/components/common/Button';
import LoginDetailForm from './LoginDetailForm';
import CheckBox from '@/components/common/CheckBox';
import {
  checkNicknameDuplicateSpb,
  checkPhoneNumberDuplicateSpb,
  setProfileSpb,
} from '@/supabase/auth';
import {set} from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setItemSession} from '@/utils/auth';
import RightArrowSvg from '@/assets/icons/rightArrow.svg';
import {setFcmTokenAPI} from '@/api/auth';
const logo = require('@/assets/icons/topLogo.png');

const LoginDetail = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'LoginDetail'>>();
  const {authData} = route.params;
  const [email, setEmail] = useState(authData.session.user.email);
  const [nickName, setNickName] = useState(
    authData.session.user.user_metadata.name,
  );
  const [phone, setPhone] = useState(authData.session.user.phone);
  const {userData, setLoginProfile, setIsAgree} = useUserStore();
  const addToast = useToastStore(state => state.addToast);
  const [isAgreeService, setIsAgreeService] = useState(
    userData?.isAgree.service || false,
  );
  const [isAgreePayment, setIsAgreePayment] = useState(
    userData?.isAgree.payment || false,
  );

  const handleVertifyNickName = () => {
    addToast({
      success: false,
      text: '닉네임 중복',
      multiText: '다른 닉네임을 사용해주세요',
    });
  };

  const handleAgreeToast = () =>
    addToast({
      success: false,
      text: '약관 미동의',
      multiText: '모든 필수 약관에 동의해주세요',
    });

  const gotoServiceAgreement = () => {
    navigation.navigate('ServiceAgreement', {authData: authData});
  };

  const gotoPaymentAgreement = () => {
    navigation.navigate('PaymentAgreement', {authData: authData});
  };

  const createAccount = async () => {
    if (!isAgreeService || !isAgreePayment) {
      handleAgreeToast();
      return;
    }

    const {data: nickNameSelectData, error: nickNameSelectError} =
      await checkNicknameDuplicateSpb(nickName);

    if (nickNameSelectError) {
      addToast({
        success: false,
        text: 'DB 조회 오류',
        multiText: '관리자에게 문의해주세요.',
      });
      return;
    }

    if (nickNameSelectData.length > 0) {
      handleVertifyNickName();
      return;
    }

    const {data: profileInsertData, error: profileInsertError} =
      await setProfileSpb(
        authData.session.user.id,
        email,
        nickName,
        new Date().toISOString(),
        new Date().toISOString(),
        isAgreeService,
        isAgreePayment,
        false,
        authData.session.user.app_metadata.provider,
        authData.session.user.user_metadata.picture,
        phone,
      );

    if (profileInsertError) {
      addToast({
        success: false,
        text: 'DB 생성 오류',
        multiText: '관리자에게 문의해주세요.',
      });
      return;
    }

    if (profileInsertData) {
      setLoginProfile(
        profileInsertData.id,
        profileInsertData.email,
        profileInsertData.nickname,
        profileInsertData.created_at,
        profileInsertData.updated_at,
        profileInsertData.service_terms_agreement,
        profileInsertData.payment_terms_agreement,
        profileInsertData.notification_agreement,
        profileInsertData.social_login_type,
        profileInsertData.profile_img_url,
        profileInsertData.phone_number,
      );
    }

    await setItemSession(
      authData.session.access_token,
      authData.session.refresh_token,
    );
    const isSuccess = await setFcmTokenAPI(profileInsertData.id);

    if (!isSuccess) {
      addToast({
        success: false,
        text: '디바이스 토큰 저장 실패',
        multiText: '관리자에게 문의해주세요',
      });
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
    authData && (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
        <ScrollView style={styles.container}>
          <Image source={logo} style={styles.logoContainer} alt="logo" />

          <View style={styles.introContainer}>
            <Text style={commonStyle.BOLD_33_24}>시작하기</Text>
            <Text style={commonStyle.REGULAR_AA_16}>
              간단한 정보 입력으로 피기를 시작하세요!
            </Text>
          </View>
          <View style={{gap: 16}}>
            <LoginDetailForm
              authData={authData}
              formData={[
                email,
                setEmail,
                nickName,
                setNickName,
                phone,
                setPhone,
              ]}
            />
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
              <Button text="시작하기" onPress={createAccount} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 36,
    backgroundColor: '#FFF',
  },
  logoContainer: {
    height: 32,
    width: 80,
    marginLeft: -24,
    marginVertical: 8,
  },
  introContainer: {
    marginVertical: 42,
    alignItems: 'center',
    gap: 12,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  rightArrowIconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginDetail;
