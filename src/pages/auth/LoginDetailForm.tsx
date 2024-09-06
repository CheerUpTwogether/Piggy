import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {sendVertifyMessageAPI} from '@/api/sms';
import {useToastStore} from '@/store/store';
import InputBox from '@/components/common/InputBox';
import {commonStyle} from '@/styles/common';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import NickNameSvg from '@/assets/icons/nickname.svg';
import PhoneSvg from '@/assets/icons/phone.svg';
import EmailSvg from '@/assets/icons/email.svg';
import LockSvg from '@/assets/icons/lock.svg';

const LoginDetailForm = ({authData, formData}) => {
  const [
    email,
    setEmail,
    nickName,
    setNickName,
    phone,
    setPhone,
    isVerify,
    setIsVerify,
  ] = formData;
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [resendTimeout, setResendTimeout] = useState(180);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const addToast = useToastStore(state => state.addToast);
  dayjs.extend(duration);
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  useEffect(() => {
    console.log(generatedCode);
    let timer: NodeJS.Timeout;
    console.log(resendTimeout);
    if (isCodeSent && resendTimeout > 0) {
      timer = setInterval(() => {
        setResendTimeout(prev => prev - 1);
      }, 1000);
    } else {
      setGeneratedCode('');
      setIsResendDisabled(false);
    }

    return () => clearInterval(timer);
  }, [isCodeSent, resendTimeout]);

  const handleSendCode = async () => {
    try {
      const code = generateVerificationCode();
      setGeneratedCode(code);
      await sendVertifyMessageAPI(phone, code);
      setIsCodeSent(true);
      setResendTimeout(180);
      setIsResendDisabled(true);
    } catch (e) {
      addToast({
        success: false,
        text: '인증번호 발송 실패',
        multiText: '관리자에게 문의해주세요.',
      });
    }
  };
  const handleReSendCode = async () => {
    try {
      if (!isResendDisabled) {
        const code = generateVerificationCode();
        setGeneratedCode(code);
        await sendVertifyMessageAPI(phone, code);
        setResendTimeout(180);
        setIsResendDisabled(true);
      } else {
        addToast({
          success: false,
          text: `${dayjs
            .duration(resendTimeout, 'seconds')
            .format('mm:ss')} 후에 재전송 가능합니다.`,
        });
      }
    } catch (e) {
      addToast({
        success: false,
        text: '인증번호 발송 실패',
        multiText: '관리자에게 문의해주세요.',
      });
    }
  };

  const handleVerifyCode = () => {
    if (generatedCode === '') {
      addToast({
        success: false,
        text: '인증번호 만료',
        multiText: '인증번호를 다시 요청해주세요.',
      });
    } else if (verificationCode === generatedCode) {
      setIsVerify(true);
      addToast({
        success: true,
        text: '본인인증에 성공하였습니다!',
      });
    } else {
      addToast({
        success: false,
        text: '인증번호 불일치',
        multiText: '인증번호를 다시 입력해주세요.',
      });
    }
  };

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

      {!isVerify && (
        <View style={{gap: 50}}>
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
              btnText: isCodeSent ? '재전송' : '전송',
              onPress: () => {
                isCodeSent ? handleReSendCode() : handleSendCode();
              },
              disable: phone.length !== 11 && !isResendDisabled,
            }}
          />

          {isCodeSent && (
            <View>
              <Text
                style={{
                  ...commonStyle.BOLD_PRIMARY_16,
                  position: 'absolute',
                  top: -110,
                  right: 100,
                }}>
                {dayjs.duration(resendTimeout, 'seconds').format('mm:ss')}
              </Text>
              <InputBox
                value={verificationCode}
                setValue={setVerificationCode}
                placeholder={'인증번호를 입력해주세요.'}
                icon={LockSvg}
                isLarge={true}
                keyboardType="numeric"
                maxLength={11}
                btn={{
                  btnText: '인증',
                  onPress: () => {
                    handleVerifyCode();
                  },
                  disable: verificationCode.length !== 6,
                }}
                style={{marginTop: -48}}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 12,
  },
});

export default LoginDetailForm;
