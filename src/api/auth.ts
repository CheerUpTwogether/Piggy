import * as kakao from '@react-native-seoul/kakao-login';
import {getProfileSpb, googleLoginSpb, kakaoLoginSpb} from '@/supabase/auth';
// 카카오 로그인
export const kakaoSignInAPI = async () => {
  try {
    const {idToken, accessToken} = await kakao.login();

    if (idToken) {
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

      const res = {authData, profileData};
      return res;
    }
  } catch (e) {
    console.log(e);
  }
};

// 구글 로그인
export const googleSignInAPI = async (idToken: string) => {
  try {
    const {data: authData, error: authDataError} = await googleLoginSpb(
      idToken,
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

    const res = {authData, profileData};
    return res;
  } catch (e) {
    console.log(e);
  }
};
