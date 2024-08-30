import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {commonStyle} from '@/styles/common';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/Router';
import KakaoSvg from '@/assets/icons/kakao.svg';
import GoogleSvg from '@/assets/icons/google.svg';
import EmailSvg from '@/assets/icons/email.svg';
const logo = require('@/assets/icons/logo.png');

const Login = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
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
              navigation.navigate('LoginDetail');
            }}>
            <KakaoSvg width={33} height={33} />
            <Text style={style.socialText}>카카오로 로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={style.socialGoogle}
            onPress={() => {
              navigation.navigate('LoginDetail');
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
