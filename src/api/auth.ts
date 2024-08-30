import * as kakao from '@react-native-seoul/kakao-login';

// 로그인후 던저 주는 response결과 확인용(추후 삭제)
export const kakaoSignInTest = async () => {
  try {
    const data = await kakao.login();

    console.log('로그인 결과', data);
    if (data) {
      const profile = await kakao.getProfile();
      console.log('유저 정보', profile);
    }
  } catch (e) {
    console.log(e);
  }
};
