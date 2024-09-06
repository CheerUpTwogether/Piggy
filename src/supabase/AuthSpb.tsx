import supabase from '@/supabase/supabase';

// 1. 회원 여부 확인 - 완
export const checkUserSpb = async (sso_id, social_login_type) => {
  try {
    const {data, error} = await supabase
      .from('user_signup')
      .select('user_id')
      .eq('sso_id', sso_id)
      .eq('social_login_type', social_login_type);
    if (error) {
      throw error;
    }
    const user_id = data[0].user_id;

    const {data: userData, error: userError} = await supabase
      .from('users_nickname')
      .select('id, email, nickname,created_at, updated_at') // TODO: profile_img_url 컬럼 추가
      .eq('id', user_id);
    if (userError) {
      throw error;
    }

    return userData;
  } catch (e) {
    console.error('Error Appeared in Check :', e);
  }
};

// 2. 회원 가입 - 완

export const signUpSpb = async (
  sso_id,
  social_login_type,
  nickname,
  service_terms_agreement,
  payment_terms_agreement,
  email,
) => {
  /* 1. 소셜 로그인 타입과 sso_id 로 user_signup 테이블 초기화*/
  const initSocialLogin = async (sso_id, social_login_type) => {
    try {
      const {data, error} = await supabase.from('user_signup').insert([
        {
          sso_id: sso_id,
          social_login_type: social_login_type,
        },
      ]);

      if (error) {
        throw error;
      }
    } catch (e) {
      console.error(e);
    }
  };

  /* 2. user_signup 테이블 uuid 를 통해 초기화된 users_nickname 테이블 update*/
  const updateUsersTable = async (
    update_sso_id,
    update_social_login_type,
    update_nickname,
    update_email,
    update_service_terms_agreement,
    update_payment_terms_agreement,
  ) => {
    try {
      const {data, error} = await supabase
        .from('user_signup')
        .select('user_id')
        .eq('sso_id', update_sso_id)
        .eq('social_login_type', update_social_login_type);

      if (error) {
        throw error;
      }

      const initiatedUserId = data[0].user_id;

      const {data: updateData, error: updateError} = await supabase
        .from('users_nickname')
        .update({
          nickname: update_nickname,
          email: update_email,
          service_terms_agreement: update_service_terms_agreement,
          payment_terms_agreement: update_payment_terms_agreement,
        })
        .eq('id', initiatedUserId);

      if (updateError) {
        throw error;
      }
    } catch (e) {
      console.error(e);
    }
  };

  await initSocialLogin(sso_id, social_login_type);
  await updateUsersTable(
    sso_id,
    social_login_type,
    nickname,
    email,
    service_terms_agreement,
    payment_terms_agreement,
  );
};

// 3. 사용자 정보 - 완
export const getUserSpb = async id => {
  try {
    const {data, error} = await supabase
      .from('users_nickname')
      .select(
        'email, nickname, created_at, updated_at, service_terms_agreement, payment_terms_agreement, notification_agreement',
        'profile_img_url',
      )
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  } catch (e) {
    console.error('Error appeared in getUser : ', e);
  }
};

// 4.알림 설정 - toggle - 완
export const setNotificationSpb = async id => {
  try {
    const {data, error} = await supabase
      .from('users_nickname')
      .select('notification_agreement')
      .eq('id', id);

    if (error) {
      throw error;
    }

    const current_notification = data[0].notification_agreement;
    console.log(current_notification);

    const {data: updateData, error: updateError} = await supabase
      .from('users_nickname')
      .update({
        notification_agreement: !current_notification,
      })
      .eq('id', id);

    if (updateError) {
      throw error;
    }
  } catch (e) {
    console.error('Error appeared in setNotification : ', e);
  }
};

// 5. 결제 이용약관 전문- 완
export const getPaymentTermsSpb = async () => {
  try {
    const {data, error} = await supabase
      .from('payment_terms')
      .select('title,contents');

    if (error) {
      throw error;
    }
    return data;
  } catch (e) {
    console.error('Error appeared in getPaymentTerms : ', e);
  }
};

// 6. 서비스 이용약관 전문 - 완
export const getServiceTermsSpb = async () => {
  try {
    const {data, error} = await supabase
      .from('service_terms')
      .select('title, contents');

    if (error) {
      throw error;
    }
    return data;
  } catch (e) {
    console.error('Error appeared in getServiceTemrs : ', e);
  }
};

// 7. 결제이용약관 변경 - toggle  - 완
export const setPaymentTermsAgreeSpb = async id => {
  try {
    const {data, error} = await supabase
      .from('users_nickname')
      .select('payment_terms_agreement')
      .eq('id', id);

    if (error) {
      throw error;
    }

    const {data: setData, error: setError} = await supabase
      .from('users_nickname')
      .update({
        payment_terms_agreement: !data,
      })
      .eq('id', id);
  } catch (e) {
    console.error('Error appeared in setPaymentTermsAgreeSpb : ', e);
  }
};

// 8.서비스 이용약관 변경 - toggle - 완
export const setServiceTermsAgreeSpb = async id => {
  try {
    const {data, error} = await supabase
      .from('users_nickname')
      .select('service_terms_agreement')
      .eq('id', id);

    if (error) {
      throw error;
    }

    const {data: setData, error: setError} = await supabase
      .from('users_nickname')
      .update({
        service_terms_agreement: !data,
      })
      .eq('id', id);
  } catch (e) {
    console.error('Error appeared in setPaymentTermsAgreeSpb : ', e);
  }
};

// 9.piggy 정보 - 완
export const getPiggySpb = async (id: string) => {
  try {
    const {data, error} = await supabase
      .from('piggy')
      .select('latest_piggy_count')
      .eq('user_id', id);

    if (error) {
      throw error;
    }

    // return data;
    return data ? data[0] : null;
  } catch (e) {
    throw e;
  }
};

// 10. 피기 사용내역
export const getPiggyLogSpb = async (id: string) => {
  try {
    const {data, error} = await supabase.rpc('select_piggy_usage', {
      user_uuid: id,
    });
    if (error) {
      throw error;
    }
    return data;
  } catch (e) {
    throw e;
  }
};
