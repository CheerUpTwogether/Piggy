import {commonStyle} from '@/styles/common';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputBox from '@/components/common/InputBox';
import {dummy_profile} from '@/mock/Friends/Friends';
import EmailSvg from '@/assets/icons/email.svg';
import NickNameSvg from '@/assets/icons/nickname.svg';

const LoginDetailForm = () => {
  const [email, setEmail] = useState('(TEST) 약관만 모두 동의 후 시작!');
  const [nickName, setNickName] = useState(dummy_profile.nick_name);
  const [isError, setIsError] = useState(true);

  return (
    <View>
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
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default LoginDetailForm;
