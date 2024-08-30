import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {commonStyle} from '@/styles/common';
import InputBox from '@/components/common/InputBox';
import Button from '@/components/common/Button';

import EmailSvg from '@/assets/icons/email.svg';
import LockSvg from '@/assets/icons/lock.svg';
import NickNameSvg from '@/assets/icons/nickname.svg';
import {
  checkNicknameDuplicateSpb,
  setProfileSpb,
  signUpSpb,
} from '@/supabase/auth';
import {useToastStore} from '@/store/store';
const logo = require('@/assets/icons/logo.png');

const Regist = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const addToast = useToastStore(state => state.addToast);
  const checkNicknameDuplicate = async () => {
    const {data, error} = await checkNicknameDuplicateSpb(nickname);
    if (error) {
      addToast({
        success: false,
        text: '에러가 발생했어요',
        multiText: error.message,
      });
      return;
    }

    if (data && data?.length > 0) {
      addToast({
        success: false,
        text: '에러가 발생했어요',
        multiText: '이미 존재하는 닉네임입니다.',
      });
      return;
    }

    signUp();
  };

  const signUp = async () => {
    const {user, error} = await signUpSpb(email, password);
    if (error) {
      addToast({
        success: false,
        text: '에러가 발생했어요',
        multiText: error.message,
      });
      return;
    }
    setProfile(user);
  };

  const setProfile = user => {
    const {error} = setProfileSpb(user, nickname);
    addToast({
      success: false,
      text: '에러가 발생했어요',
      multiText: error.message,
    });
    addToast({
      success: false,
      text: '회원가입에 성공하셨습니다!',
    });
  };

  return (
    <View style={commonStyle.CONTAINER}>
      <View style={style.wrapper}>
        <Image
          source={logo}
          style={{marginLeft: 40, width: 160, height: 62}}
          width={160}
          height={60}
          alt="logo"
        />

        <Text style={style.startText}>회원가입</Text>

        <InputBox
          value={email}
          setValue={setEmail}
          placeholder={'이메일을 입력해주세요'}
          icon={EmailSvg}
          label="이메일"
        />

        <InputBox
          value={password}
          setValue={setPassword}
          placeholder={'비밀번호를 입력해주세요'}
          icon={LockSvg}
          label="비밀번호"
        />

        <InputBox
          value={nickname}
          setValue={setNickname}
          placeholder={'닉네임을 입력해주세요'}
          icon={NickNameSvg}
          label="닉네임"
        />
      </View>
      <Button text={'가입하기'} onPress={checkNicknameDuplicate} />
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  explain: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
    marginTop: 32,
  },
  startText: {
    paddingTop: 12,
    paddingBottom: 40,
    ...commonStyle.BOLD_33_24,
  },
  loginWrapper: {marginTop: 50, gap: 16},
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

export default Regist;
