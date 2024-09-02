import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {commonStyle} from '@/styles/common';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/Router';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useToastStore, useUserStore} from '@/store/store';
import {googleSignInAPI, kakaoSignInAPI} from '@/api/auth';
import {GOOGLE_WEB_API_KEY, GOOGLE_IOS_API_KEY} from '@env';
import KakaoSvg from '@/assets/icons/kakao.svg';
import GoogleSvg from '@/assets/icons/google.svg';
import EmailSvg from '@/assets/icons/email.svg';
import {setItemSession} from '@/utils/auth';
const logo = require('@/assets/icons/logo.png');

const Login = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const addToast = useToastStore(state => state.addToast);
  const setLoginProfile = useUserStore(state => state.setLoginProfile);

  const getGoogleIdToken = async () => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: GOOGLE_WEB_API_KEY,
      iosClientId: GOOGLE_IOS_API_KEY,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      return idToken || null;
    } catch (e) {
      console.log(e);
    }
  };

  const socialLogin = async (provider: string) => {
    let res = null;
    switch (provider) {
      case 'kakao':
        res = await kakaoSignInAPI();
        break;
      case 'google':
        const idToken = await getGoogleIdToken();
        if (idToken) {
          res = await googleSignInAPI(idToken);
        }
        break;
      default:
    }

    if (res) {
      const {authData, profileData} = res;

      if (profileData.length > 0) {
        // 여기에 zutand profileData 정보가지고 전역설정
        const {
          id,
          email,
          nickname,
          created_at,
          updated_at,
          service_terms_agreement,
          payment_terms_agreement,
          notification_agreement,
          social_login_type,
          profile_img_url,
          phone_number,
        } = profileData[0];

        setLoginProfile(
          id,
          email,
          nickname,
          created_at,
          updated_at,
          service_terms_agreement,
          payment_terms_agreement,
          notification_agreement,
          social_login_type,
          profile_img_url,
          phone_number,
        );

        await setItemSession(
          authData.session.access_token,
          authData.session.refresh_token,
        );
        navigation.replace('Main', {screen: 'Home'});

        return;
      }

      navigation.navigate('LoginDetail', {authData: authData});
    } else {
      addToast({
        success: false,
        text: '소셜 로그인을 다시 진행해주세요.',
      });
    }
  };

  return (
    <View style={commonStyle.container}>
      <View style={style.wrapper}>
        <Image
          source={logo}
          style={{marginLeft: 40, width: 160, height: 62}}
          width={160}
          height={60}
          alt="logo"
        />
        <View style={style.explain}>
          <Text style={[style.startText, commonStyle.BOLD_33_24]}>
            시작하기
          </Text>
          <Text style={commonStyle.REGULAR_AA_16}>
            간단한 계정 연동으로 바로 시작해보세요!
          </Text>
        </View>
        <View style={style.loginWrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={style.email}
            onPress={() => {
              navigation.navigate('LoginEmail');
            }}>
            <EmailSvg width={24} height={24} color={'#333'} />
            <Text style={style.socialText}>이메일로 로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={style.socialKakao}
            onPress={() => {
              socialLogin('kakao');
            }}>
            <KakaoSvg width={33} height={33} />
            <Text style={style.socialText}>카카오로 로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={style.socialGoogle}
            onPress={() => {
              socialLogin('google');
            }}>
            <GoogleSvg width={33} height={33} />
            <Text style={style.socialText}>구글로 로그인</Text>
          </TouchableOpacity>
        </View>

        <View style={style.helperWrapper}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Regist');
            }}>
            <Text style={[style.helper, {textDecorationLine: 'underline'}]}>
              이메일로 회원가입하겠어요?
            </Text>
          </TouchableOpacity>
          <Text style={style.helper}>이용 약관</Text>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 70,
  },
  explain: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
    marginTop: 50,
  },
  startText: {color: '#333'},
  loginWrapper: {marginTop: 50, gap: 16},
  email: {
    borderWidth: 1,
    borderColor: '#ED423F',
    width: 340,
    height: 50,
    borderRadius: 100,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  socialKakao: {
    backgroundColor: '#FEE500',
    width: 340,
    height: 50,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  socialGoogle: {
    backgroundColor: '#F2F2F2',
    width: 340,
    height: 50,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  socialText: {
    fontSize: 14,
    fontWeight: 'regular',
    color: '#333',
    marginLeft: 72,
  },
  helperWrapper: {
    position: 'absolute',
    bottom: 12,
    alignItems: 'center',
    width: '100%',
    gap: 12,
  },
  helper: {fontSize: 14, fontWeight: 'regular', color: '#AAA'},
});

export default Login;
