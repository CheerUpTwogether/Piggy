import * as kakao from '@react-native-seoul/kakao-login';
import {kakaoLoginSPB} from '@/supabase/auth';

// 카카오 로그인
export const kakaoSignInAPI = async () => {
  try {
    const {idToken, accessToken} = await kakao.login();

    if (idToken) {
      const {data, error} = await kakaoLoginSPB(idToken, accessToken);
      console.log(data);
      console.log(error?.message);
      console.log(error?.status);
    }
  } catch (e) {
    console.log(e);
  }
};
