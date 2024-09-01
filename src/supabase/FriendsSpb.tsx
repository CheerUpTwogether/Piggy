import supabase from '@/supabase/supabase';

// 사용자 리스트 검색
export const getUsersSpb = async (id: string, keyword: string) => {
  try {
    const {data, error} = await supabase.rpc('select_users_list', {
      user_uuid: id,
      keyword: keyword,
    });
    if (error) {
      throw error;
    }
    return data;
  } catch (e) {
    console.error('Error appeared in getUsersSpb : ', e);
  }
};

// export const getUsersSpb = async (keyword: string, currentUserId: string) => {
//   try {
//     const {data, error} = await supabase.rpc('select_users_list', {
//       keyword: keyword,
//       current_user_id: currentUserId,
//     });
//     if (error) {
//       throw error;
//     }
//     return data;
//   } catch (e) {
//     console.error('Error appeared in getUsersSpb : ', e);
//   }
// };

// 친구 추가
export const setFriendshipAddSpb = async (id: string, friend_id: string) => {
  try {
    const {data, error} = await supabase
      .from('user_friend_relationship')
      .insert([
        {
          id_from: id,
          id_to: friend_id,
        },
      ])
      .select('id');

    if (error) {
      throw error;
    }
    return data.id ? {success: true} : {success: false};
  } catch (e) {
    console.error('Error appeared in setFriendshipAddSpb : ', e);
  }
};

// 친구 삭제
export const setFriendshipDeleteSpb = async (id: string, friend_id: string) => {
  try {
    const {data, error} = await supabase
      .from('user_friend_relationship')
      .delete()
      .eq('id_from', id)
      .eq('id_to', friend_id);

    if (error) {
      throw error;
    }

    return {success: true};
  } catch (e) {
    console.error('Error appeared in setFriendshipDeletespb : ', e);
  }
};

// 선물하기
export const setGiftPiggySpb = async (id, friend_id, gift_piggy_count) => {
  try {
    const {data, error} = await supabase
      .from('piggy_gift_log')
      .insert([
        {
          gift_piggy_id_from: id,
          gift_piggy_id_to: friend_id,
          gift_piggy_count: gift_piggy_count,
        },
      ])
      .select('id');
    if (error) {
      throw error;
    }

    return data.id ? {success: true} : {success: false};
  } catch (e) {
    console.error('Error appeared in setGiftPiggySpb : ', e);
  }
};
