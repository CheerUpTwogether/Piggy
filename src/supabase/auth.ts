import supabase from '@/supabase/supabase';

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
