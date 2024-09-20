import supabase from '@/supabase/supabase';
import {setItemSession} from '@/utils/auth';

// 카카오 로그인
export const kakaoLoginSpb = (idToken: string, accessToken: string) => {
  return supabase.auth.signInWithIdToken({
    provider: 'kakao',
    token: idToken,
    access_token: accessToken,
  });
};

// 구글 로그인
export const googleLoginSpb = (idToken: string) => {
  return supabase.auth.signInWithIdToken({
    provider: 'google',
    token: idToken,
  });
};

// 닉네임 중복 확인
export const checkNicknameDuplicateSpb = (nickname: string) => {
  return supabase.from('users_nickname').select('*').eq('nickname', nickname);
};

// 폰넘버 중복 확인
export const checkPhoneNumberDuplicateSpb = (phone_number: string) => {
  return supabase
    .from('users_nickname')
    .select('*')
    .eq('phone_number', phone_number);
};

// 프로필 가져오기
export const getProfileSpb = (uid: string) => {
  return supabase.from('users_nickname').select('*').eq('id', uid);
};

// 프로필 세팅
export const setProfileSpb = (
  id: string,
  email: string,
  nickname: string,
  created_at: string,
  updated_at: string,
  service_terms_agreement: boolean,
  payment_terms_agreement: boolean,
  notification_agreement: boolean,
  social_login_type: string,
  profile_img_url: string,
  phone_number: string,
) => {
  return supabase
    .from('users_nickname')
    .insert([
      {
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
      },
    ])
    .select()
    .single();
};

// 세션 토큰으로 로그인
export const loginSessionSpb = async (
  access_token: string,
  refresh_token: string,
) => {
  const {data, error} = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  if (data.session && access_token !== data.session.access_token) {
    // 재 갱신된 access_token(기본:1시간) 스토리지에 저장.
    await setItemSession(data.session.access_token, refresh_token);
  }

  if (error) {
    // 세션 오류 - refresh_token(기본: 30일) 만료 될때는 로그인 다시하게 함.
    console.log(error);
  }

  return data;
};

// 해당 유저의 디바이스 토큰 업데이트
export const setFcmTokenSpb = async (id: string, device_token: string) => {
  try {
    return await supabase
      .from('users_nickname')
      .update({device_token})
      .eq('id', id);
  } catch (e) {
    throw e;
  }
};

// 해당 유저의 디바이스 토큰 초기화
export const getFcmTokenSpb = async (id: string) => {
  try {
    return await supabase
      .from('users_nickname')
      .select('device_token')
      .eq('id', id);
  } catch (e) {
    throw e;
  }
};

// 해당 유저의 디바이스 토큰 초기화
export const initFcmTokenSpb = async (id: string) => {
  try {
    return await supabase
      .from('users_nickname')
      .update({device_token: ''})
      .eq('id', id);
  } catch (e) {
    throw e;
  }
};
// ====================== 밑에 로직들은 deprecated 예정.
// 이메일 회원가입
export const signUpSpb = async (email: string, password: string) => {
  return await supabase.auth.signUp({email, password});
};

export const signInSpb = async (
  email: string,
  password: string,
): Promise<boolean> => {
  const {data, error: authError} = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    console.log('로그인 실패');
    return false;
  }

  console.log('로그인 성공', data.user.id);

  const {data: insertData, error: insertError} = await supabase
    .from('users_nickname')
    .insert([
      {
        id: data.user.id,
        email: data.user.email,
      },
    ]);

  return true;
};

export const isPiggySignup = () => {
  return supabase.from('users_nickname').select('*').eq('nickname', nickname);
};

// auth 정보 삭제
export const deleteUserSpb = async id => {
  try {
    const {error} = await supabase.rpc('delete_user');
    if (error) {
      throw error;
    }
    console.log(error);
    const {error: updateError} = await supabase
      .from('users_nickname')
      .update({is_deleted: true, phone_number: null, deleted_at: 'NOW()'})
      .eq('id', id);
    console.log(updateError);
    if (updateError) {
      throw updateError;
    }
  } catch (e) {
    throw e;
  }
};
