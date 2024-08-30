import supabase from './supabase';

// 닉네임 중복 확인
export const checkNicknameDuplicateSpb = (nickname: string) => {
  return supabase.from('users_nickname').select('*').eq('nickname', nickname);
};

// 이메일 회원가입
export const signUpSpb = (email: string, password: string) => {
  return supabase.auth.signUp({email, password});
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
