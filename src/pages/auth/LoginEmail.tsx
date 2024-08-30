import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/Router';
import {commonStyle} from '@/styles/common';
import {signInSpb} from '@/supabase/auth';

import InputBox from '@/components/common/InputBox';
import NickNameSvg from '@/assets/icons/nickname.svg';
import EmailSvg from '@/assets/icons/email.svg';
import Button from '@/components/common/Button';

const LoginEmail = () => {
  const [email, setEmail] = useState('piggy@naver.com');
  const [password, setPassword] = useState('123456');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    await signInSpb(email, password);
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <View style={commonStyle.CONTAINER}>
        <View style={styles.inputContainer}>
          <InputBox
            value={email}
            setValue={setEmail}
            placeholder={'이메일을 입력해주세요.'}
            icon={EmailSvg}
            isLarge={true}
            label="이메일"
          />
        </View>

        <View style={styles.inputContainer}>
          <InputBox
            value={password}
            label="비밀번호"
            setValue={setPassword}
            placeholder={'비밀번호를 입력해주세요.'}
            icon={NickNameSvg}
            isLarge={true}
          />
        </View>

        <Button text="로그인" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingBottom: 12,
  },
});

export default LoginEmail;
