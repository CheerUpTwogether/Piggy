import supabase from '@/supabase/supabase';

// 카카오 로그인
export const kakaoLoginSPB = (idToken, accessToken) => {
  return supabase.auth.signInWithIdToken({
    provider: 'kakao',
    token: idToken,
    access_token: accessToken,
  });
};

// 닉네임 중복 확인
export const checkNicknameDuplicateSpb = (nickname: string) => {
  return supabase.from('users_nickname').select('*').eq('nickname', nickname);
};

// 이메일 회원가입
export const signUpSpb = async (email: string, password: string) => {
  return await supabase.auth.signUp({email, password});
};

// 이메일 세팅
export const setProfileSpb = (user, nickname) => {
  return supabase.from('profile').insert([
    {
      user_id: user?.user?.id,
      email: user?.user?.email,
      nickname: nickname,
      introduce: 'please edit your introduce',
      profileimagepath: '',
      communitycount: 0,
      favoritecount: 0,
    },
  ]);
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
