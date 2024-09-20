import supabase from '@/supabase/supabase';

// 알림 정보 가져오기
export const getNotificationSpb = async (user_id: string) => {
  const {data, error} = await supabase
    .from('notification_log')
    .select('*')
    .eq('user_id', user_id)
    .eq('notification_displayed', true)
    .order('created_at', {ascending: false});

  if (error) {
    throw error;
  }

  return data ? data : null;
};

// 안 읽은 알림이 있는지 확인
export const getUnConfirmNotificationSpb = async (user_id: string) => {
  const {data, error} = await supabase
    .from('notification_log')
    .select('*')
    .eq('user_id', user_id)
    .eq('notification_displayed', true)
    .eq('confirmed_status', false);

  if (error) {
    throw error;
  }

  if (data.length > 0) {
    return true;
  } else {
    return false;
  }
};

// 알림 정보 읽음처리
export const setConfirmNotificationSpb = async (notification_id: number) => {
  const {data, error} = await supabase
    .from('notification_log')
    .update({confirmed_status: true})
    .eq('id', notification_id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data ? data : null;
};

// 알림 정보 전부 읽음처리
export const setAllConfirmNotificationSpb = async (
  user_id: string,
  filter_criteria: string,
) => {
  const {data, error} = await supabase
    .from('notification_log')
    .update({confirmed_status: true})
    .eq('user_id', user_id)
    .eq('filter_criteria', filter_criteria)
    .select();

  if (error) {
    throw error;
  }

  return data ? data : null;
};

// 알림 정보 disable 처리
export const deleteNotificationSpb = async (notification_id: number) => {
  const {data, error} = await supabase
    .from('notification_log')
    .update({notification_displayed: false})
    .eq('id', notification_id)
    .select()
    .single();
  if (error) {
    throw error;
  }

  return data ? data : null;
};

// 알림 정보 전부 disable 처리
export const deleteAllNotificationSpb = async (
  user_id: string,
  filter_criteria: string,
) => {
  const {data, error} = await supabase
    .from('notification_log')
    .update({notification_displayed: false})
    .eq('user_id', user_id)
    .eq('filter_criteria', filter_criteria)
    .select();
  if (error) {
    throw error;
  }

  return data ? data : null;
};

// 안읽은 알림 확인 구독
export const subcribeUnConfirmNotification = (uid: string, onEvent) => {
  const channel = supabase
    .channel('alarm-unconfirm-detail')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'notification_log',
      },
      payload => {
        if (payload.new.user_id === uid) {
          onEvent(payload);
        }
      },
    )
    .subscribe();

  return () => {
    channel.unsubscribe();
    console.log('alarm-unconfirm-detail 채널 구독 해제');
  };
};

// 알림 디테일 구독
export const subcribeNotification = (uid: string, onEvent) => {
  const channel = supabase
    .channel('alarm-detail')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'notification_log',
      },
      payload => {
        if (payload.new.user_id === uid) {
          onEvent(payload);
        }
      },
    )
    .subscribe();

  return () => {
    channel.unsubscribe();
    console.log('alarm-detail 채널 구독 해제');
  };
};
