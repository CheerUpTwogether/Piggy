import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {dummy_profile} from '@/mock/Friends/Friends';
import InputBox from '@/components/common/InputBox';
import NickNameSvg from '@/assets/icons/nickname.svg';
import PhoneSvg from '@/assets/icons/phone.svg';
import EmailSvg from '@/assets/icons/email.svg';

const LoginDetailForm = ({authData, formData}) => {
  const [email, setEmail, nickName, setNickName, phone, setPhone] = formData;
  const [cetificationNum, setCertificationNum] = useState('');
  const [certificationNumberVisible, setCertificationNumberVisible] =
    useState(false);

  return (
    <View>
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
          value={nickName}
          label="닉네임"
          setValue={setNickName}
          placeholder={'닉네임을 입력해주세요.'}
          icon={NickNameSvg}
          isLarge={true}
          msg="*닉네임은 8글자까지 설정할 수 있습니다"
        />
      </View>
      <InputBox
        value={phone}
        label="전화번호"
        setValue={setPhone}
        placeholder={'전화번호를 입력해주세요.'}
        icon={PhoneSvg}
        isLarge={true}
        keyboardType="numeric"
        maxLength={11}
        btn={{
          btnText: certificationNumberVisible ? '재전송' : '전송',
          onPress: () => setCertificationNumberVisible(true),
          disable: phone.length !== 11,
        }}
      />

      {certificationNumberVisible && (
        <InputBox
          value={cetificationNum}
          setValue={setCertificationNum}
          placeholder={'인증번호를 입력해주세요.'}
          icon={PhoneSvg}
          isLarge={true}
          keyboardType="numeric"
          maxLength={11}
          btn={{
            btnText: '인증',
            onPress: () => {},
            disable: true,
          }}
          style={{marginTop: -48}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingBottom: 12,
  },
});

export default LoginDetailForm;
