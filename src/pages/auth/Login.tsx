import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {commonStyle} from '@/styles/common';

import KakaoSvg from '@/assets/icons/kakao.svg';
const logo = require('@/assets/icons/logo.png');

const Login = () => {
  return (
    <View style={commonStyle.container}>
      <View style={style.wrapper}>
        <Image
          source={logo}
          style={{marginLeft: 40, width: 160, height: 62}}
          width={160}
          height={60}
        />
        <View style={style.explain}>
          <Text style={style.startText}>시작하기</Text>
          <Text style={style.simpleText}>
            간단한 계정 연동으로 바로 시작해보세요!
          </Text>
        </View>
        <View style={style.loginWrapper}>
          <TouchableOpacity activeOpacity={0.8} style={style.social}>
            <KakaoSvg width={33} height={33} />
            <Text style={style.socialText}>카카오로 로그인</Text>
          </TouchableOpacity>
        </View>

        <View style={style.helperWrapper}>
          <Text style={[style.helper, {textDecorationLine: 'underline'}]}>
            로그인에 문제가 있으신가요?
          </Text>
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
  startText: {fontSize: 24, fontWeight: 'bold', color: '#333'},
  simpleText: {fontSize: 16, fontWeight: 'regular', color: '#AAA'},
  loginWrapper: {marginTop: 50, gap: 16},
  social: {
    backgroundColor: '#FEE500',
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
