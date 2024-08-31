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
export const setInquirySpb = async (
  id: string,
  subject: string,
  contents: string,
  email: string,
) => {
  try {
    const {data, error} = await supabase
      .from('inquiry_log')
      .insert([
        {
          user_id: id,
          subject: subject,
          contents: contents,
          email: email,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return data;
  } catch (e) {
    console.error('Error appeared in setInquirySpb:', e);
    return null;
  }
};

// 내 문의 리스트 조회
export const getMyInquirysSpb = async (id: string) => {
  try {
    const {data, error} = await supabase
      .from('inquiry_log')
      .select(
        'id, user_id, subject, contents, email, inquiry_date, response, response_date',
      )
      .eq('user_id', id);

    if (error) {
      console.error('Supabase error in getMyInquirysSpb:', error.message);
      return null;
    }

    return data;
  } catch (e) {
    console.error('Error appeared in getMyInquirysSpb:', e);
    return null;
  }
};

// 문의 상세 조회
// TODO: img_url 추가
export const getInquiryDetailSpb = async (id: string) => {
  try {
    const {data, error} = await supabase
      .from('inquiry_log')
      .select(
        'id, user_id, subject, contents, email, inquiry_date, response, response_date',
      )
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error in getInquiryDetailSpb:', error.message);
      return null;
    }

    return data;
  } catch (e) {
    console.error('Error appeared in getInquiryDetailSpb:', e);
    return null;
  }
};

// 문의 내역 삭제
export const deleteInquirySpb = async (inquiryId: string) => {
  try {
    const {error} = await supabase
      .from('inquiry_log')
      .delete()
      .eq('id', inquiryId);

    if (error) {
      console.error('Supabase error in deleteInquirySpb:', error.message);
      return false;
    }

    return true;
  } catch (e) {
    console.error('Error appeared in deleteInquirySpb:', e);
    return false;
  }
};

// 공지
export const getAnnouncementSpb = async () => {
  try {
    const {data, error} = await supabase
      .from('announcement')
      .select('id,subject,content,created_at'); // TODO: img_url 추가

    if (error) {
      console.error('Supabase error in getMyInquirysSpb:', error.message);
      return null;
    }

    return data;
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
