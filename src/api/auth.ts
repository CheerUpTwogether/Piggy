import * as kakao from '@react-native-seoul/kakao-login';
import {getProfileSpb, kakaoLoginSpb} from '@/supabase/auth';

// 카카오 로그인
export const kakaoSignInAPI = async () => {
  try {
    const {idToken, accessToken} = await kakao.login();

    if (idToken) {
      console.log(idToken);
      console.log(accessToken);
      const {data: authData, error: authDataError} = await kakaoLoginSpb(
        idToken,
        accessToken,
      );

      if (authDataError) {
        console.log(authDataError);
        return;
      }

      const {data: profileData, error: profileDataError} = await getProfileSpb(
        authData.session.user.id,
      );

      if (profileDataError) {
        console.log(profileDataError);
        return;
      }

      const isExistProfile = profileData.length > 0;
      const res = {authData, isExistProfile};
      return res;
    }
  } catch (e) {
    console.log(e);
  }
};
