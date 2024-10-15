import * as kakao from '@react-native-seoul/kakao-login';
import {
  getProfileSpb,
  googleLoginSpb,
  kakaoLoginSpb,
  setFcmTokenSpb,
} from '@/supabase/auth';
import messaging from '@react-native-firebase/messaging';
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
        return;
      }

      const {data: profileData, error: profileDataError} = await getProfileSpb(
        authData.session.user.id,
      );

      if (profileDataError) {
        return;
      }

      const res = {authData, profileData};
      return res;
    }
  } catch (e) {
    return;
  }
};

// 구글 로그인
export const googleSignInAPI = async (idToken: string) => {
  try {
    const {data: authData, error: authDataError} = await googleLoginSpb(
      idToken,
    );

    if (authDataError) {
      return;
    }

    const {data: profileData, error: profileDataError} = await getProfileSpb(
      authData.session.user.id,
    );

    if (profileDataError) {
      return;
    }

    const res = {authData, profileData};
    return res;
  } catch (e) {
    return;
  }
};

// Fcm 토큰 업데이트 API
export const setFcmTokenAPI = async (id: string) => {
  try {
    const device_token = await messaging().getToken();
    if (device_token) {
      const {error} = await setFcmTokenSpb(id, device_token);

      if (error) {
        return false;
      }

      return true;
    }
  } catch (error) {
    throw error;
  }
};
