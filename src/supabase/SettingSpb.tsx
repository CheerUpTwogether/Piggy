import supabase from '@/supabase/supabase';

// faq 리스트
export const getFaqSpb = async () => {
  try {
    const {data, error} = await supabase
      .from('frquently_asked_questions')
      .select('question, answer, created_at');

    if (error) {
      throw error;
    }
    return data;
  } catch (e) {
    console.error('Error appeared in getFaqSpb : ', e);
  }
};

// 문의하기
// TODO: img_url 추가
export const setInquirySpb = async (id, subject, contents, email) => {
  try {
    const {data, error} = await supabase.from('inquiry_log').insert([
      {
        user_id: id,
        subject: subject,
        contents: contents,
        email: email,
      },
    ]);
    if (error) {
      throw error;
    }
    return data;
  } catch (e) {
    console.error('Error appeared in setInquirySpb : ', e);
  }
};

// 내 문의 리스트 조회 - getMyInquirysSpb
export const getMyInquirysSpb = async id => {
  try {
    const {data, error} = await supabase
      .from('inquiry_log')
      .select('id, subject, contents, email, date, response, response_date')
      .eq('user_id', id);
  } catch (e) {
    console.error('Error appeared in getMyInqeuirysSpb : ', e);
  }
};

// 공지
export const getAnnouncementSpb = async () => {
  try {
    const {data, error} = await supabase
      .from('announcement')
      .select('id,subject,content,created_at'); // TODO: img_url 추가
  } catch (e) {
    console.error('Error appeared in getAnnouncementSpb : ', e);
  }
};

// 프로필 수정
export const setMyProfileSpb = async id => {
  try {
    const {data, error} = await supabase
      .from('users_nickname')
      .update('nickname') // TODO: profile_img_url 추가
      .where('id', id);
  } catch (e) {
    console.error('Error appeared in setMyProfileSpb : ', e);
  }
};

// 설정 프로필 조회
export const getMySettingsSpb = async id => {
  try {
    const {data, error} = await supabase.rpc('selet_My_profile', {
      user_uuid: id,
    });

    if (error) {
      throw error;
    }
    return data;
  } catch (e) {
    console.error('Error appeared in getMySettingsSpb : ', e);
  }
};
