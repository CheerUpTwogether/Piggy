import supabase from '@/supabase/supabase';
import {Image} from 'react-native-image-crop-picker';
import {uuid} from 'react-native-uuid';

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

// 문의 하기 이미지
export const setInquiryImages = async img_file => {
  try {
    const filePath = `help_desk/${img_file.name}`;

    //1. 이미지 버킷 업로드
    const {error} = await supabase.storage
      .from('image_bucket')
      .upload(filePath, img_file);
    if (error) {
      console.log(error);
      return null;
    }

    //2. img_url Get
    const imgUrl = await supabase.storage
      .from('image_bucket')
      .getPublicUrl(filePath);
    return imgUrl;
  } catch (e) {
    throw e;
  }
};

// 문의하기
// TODO: img_url 추가
export const setInquirySpb = async (
  user_id: string,
  subject: string,
  contents: string,
  email: string,
  img_url: string[],
) => {
  try {
    const {data, error} = await supabase
      .from('inquiry_log')
      .insert([{user_id, subject, contents, email, img_url}])
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
        'id, user_id, subject, contents, email, inquiry_date, response, response_date, img_url',
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

// 프로필 수정 - 이름
export const setMyProfileNicknameSpb = (id, nickname) => {
  return supabase
    .from('users_nickname')
    .update({nickname: nickname})
    .eq('id', id);
};

// 프로필 수정 - 프로필 사진
export const setMyProfileImageSpb = async (userData, img_file) => {
  try {
    const uploadFileName = `${userData.id}`;
    const uploadFolder = 'profile_image';
    const filePath = `${uploadFolder}/${uploadFileName}${new Date().getTime()}`;

    //1. 이미지 버킷 업로드
    const {data, error} = await supabase.storage
      .from('image_bucket')
      .upload(filePath, img_file);
    if (error) {
      throw error;
    }

    //2. img_url Get
    const imgUrl = await supabase.storage
      .from('image_bucket')
      .getPublicUrl(filePath);

    //3. 버킷에서 이미지 삭제
    await deleteProfileSpb(userData);

    //4. users_nickname 테이블 , profile_img_url 컬럼 업데이트
    const {data: uploadData, error: uploadError} = await supabase
      .from('users_nickname')
      .update({profile_img_url: imgUrl.data.publicUrl})
      .eq('id', userData.id)
      .select()
      .single();

    if (uploadError) {
      throw uploadError;
    }

    return uploadData;
  } catch (e) {
    throw e;
  }
};

// 설정 프로필 조회
export const getMySettingsSpb = async (id: string) => {
  try {
    const {data, error} = await supabase.rpc('select_my_profile', {
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

// 기본 이미지로 변경
export const deleteProfileSpb = async userData => {
  try {
    const pathId = userData.profile_img_url.split(userData.id)[1];
    const {error: deleteError} = await supabase.storage
      .from('image_bucket')
      .remove([`profile_image/${userData.id}${pathId}`]);
    if (deleteError) {
      throw deleteError;
    }

    //4. users_nickname 테이블 , profile_img_url 컬럼 업데이트
    const {error: uploadError} = await supabase
      .from('users_nickname')
      .update({profile_img_url: ''})
      .eq('id', userData.id);
    if (deleteError) {
      throw uploadError;
    }

    return true;
  } catch (e) {
    throw e;
  }
};
