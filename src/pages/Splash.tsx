import React, {useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types/Router';
import {getItemSession} from '@/utils/auth';
import {getProfileSpb, loginSessionSpb} from '@/supabase/auth';
import {useToastStore, useUserStore} from '@/store/store';
import {setFcmTokenAPI} from '@/api/auth';
const logo = require('@/assets/icons/logo.png');

const Splash = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const addToast = useToastStore(state => state.addToast);
  const setLoginProfile = useUserStore(state => state.setLoginProfile);

  const handleLoginErrorToast = (title: string, content: string) => {
    addToast({
      success: false,
      text: title,
      multiText: content,
    });
    navigation.replace('Login');
  };

  const handleAutoLogin = async () => {
    const sessionData = await getItemSession();

    // 로컬에 저장된 세션 정보 유무 분기 처리
    if (sessionData) {
      const {access_token, refresh_token} = sessionData;

      const authData = await loginSessionSpb(access_token, refresh_token);

      if (!authData.session) {
        handleLoginErrorToast('세션 만료', '다시 로그인을 진행해주세요.');
        return;
      }

      const {data, error} = await getProfileSpb(authData.session.user.id);

      if (error) {
        handleLoginErrorToast('프로필 오류', '다시 로그인을 진행해주세요.');
        return;
      }

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
      } = data[0];

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
      const isSuccess = await setFcmTokenAPI(id);

      if (!isSuccess) {
        addToast({
          success: false,
          text: '디바이스 토큰 저장 실패',
          multiText: '관리자에게 문의해주세요',
        });
        return;
      }
      navigation.replace('Main', {screen: 'Home'});
    } else {
      navigation.replace('Login');
    }
  };

  useEffect(() => {
    // 2초(2000ms) 후에 'Login' 화면으로 이동하도록 설정
    const timeout = setTimeout(() => {
      handleAutoLogin();
    }, 2000);

    // 컴포넌트가 언마운트될 때 타임아웃을 정리
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} style={{width: 320, height: 124}} alt="logo" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    marginTop: -60,
    alignItems: 'center',
  },
});
export default Splash;
