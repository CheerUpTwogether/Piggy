import supabase from '@/supabase/supabase';

// 카카오 로그인
export const kakaoLoginSPB = (idToken, accessToken) => {
  return supabase.auth.signInWithIdToken({
    provider: 'kakao',
    token: idToken,
    access_token: accessToken,
  });
};
