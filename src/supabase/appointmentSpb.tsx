import supabase from '@/supabase/supabase';
import {AppointmentInsert} from '@/types/appointment';
import {calculateDistance} from '@/utils/distance';

// 약속 상세
export const getAppointmentSpb = appointmentId => {
  return supabase
    .from('appointment')
    .select('*')
    .eq('id', appointmentId)
    .single();
};
// 약속만들기
export const setAppointmentSpb = ({
  id,
  subject,
  participant_count,
  address,
  place_name,
  latitude,
  longitude,
  appointment_date,
  deal_piggy_count,
}: AppointmentInsert) => {
  return supabase
    .from('appointment')
    .insert([
      {
        proposer_id: id,
        subject: subject,
        participant_count,
        address,
        place_name: place_name,
        latitude: latitude,
        longitude: longitude,
        appointment_date: appointment_date,
        deal_piggy_count: deal_piggy_count,
      },
    ])
    .select('id');
};

// 약속 참여자 업데이트
export const setAppointmentParticipantsSpb = (
  appointment_id: number,
  participants_uuid: string,
) => {
  return supabase.rpc('insert_appointment_participants', {
    appointment_id,
    participants_uuid,
  });
};

// 약속 생성자 상태 변경
export const setAppointmentProposerSpb = (
  userId: string,
  appointmentId: number,
) => {
  return supabase
    .from('appointment_participants')
    .update({
      agreement_status: 'confirmed',
    })
    .eq('appointment_id', appointmentId)
    .eq('user_id', userId);
};

// 약속 리스트 불러오기
export const getAppointmentsSpb = (
  user_uuid: string,
  appointment_selector: string[],
) => {
  return supabase.rpc('select_appointment_list_detail', {
    user_uuid,
    appointment_selector,
  });
};

// 약속 참여자 상태 정보 조회
export const getAppointmentParticipantsSpb = (
  user_uuid: string,
  appointment_number: number,
) => {
  return supabase.rpc('select_participants_list_detail', {
    user_uuid,
    appointment_number,
  });
};

// 약속 인증 상태 확인 - 자기 자신의 인증 상태만
export const getCertificationStatusSpb = (
  id: string,
  appointment_id: number,
) => {
  return supabase
    .from('appointment_participants')
    .select('certification_status')
    .eq('user_id', id)
    .eq('appointment_id', appointment_id);
};

// 약속 인증 - 약속 장소 도착 시 인증(10분)
export const setCertificationStatusSpb = async (
  userId: string,
  appointmentId: number,
  appointmentLat: number,
  appointmentLon: number,
  latitude: number,
  longitude: number,
  radius: number, // 인증을 위한 반경(km)
) => {
  try {
    // 사용자의 현재 위치와 약속 장소 간의 거리 계산
    const distance = parseFloat(
      calculateDistance(appointmentLat, appointmentLon, latitude, longitude),
    );

    // 인증 범위 내에 있는지 확인
    if (distance <= radius) {
      const currentTime = new Date().toISOString();

      const {error: updateError} = await supabase
        .from('appointment_participants')
        .update({
          // certification - 약속 장소 current - 인증한 위치
          certification_status: true,
          certification_latitude: appointmentLat,
          certification_longitude: appointmentLon,
          certification_time: currentTime,
          current_latitude: latitude,
          current_longitude: longitude,
        })
        .eq('appointment_id', appointmentId)
        .eq('user_id', userId);

      if (updateError) {
        throw updateError;
      }

      console.log('[Spb]인증을 완료했습니다.');
    } else {
      throw new Error('약속된 위치에 도착하지 못했어요.');
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

// 약속 고정/해제
export const setPinnedSpb = async (id: string, appointment_id: number) => {
  const {data, error} = await supabase
    .from('appointment_participants')
    .select('pinned')
    .eq('appointment_id', appointment_id)
    .eq('user_id', id);

  if (error) {
    throw error;
  }

  const {error: updateError} = await supabase
    .from('appointment_participants')
    .update({
      pinned: !data?.[0]?.pinned,
    })
    .eq('appointment_id', appointment_id)
    .eq('user_id', id);

  if (updateError) {
    throw updateError;
  }
};

// 약속 수락/거절
export const setAppointmentAcceptanceSpb = async (
  id: string,
  appointment_id: number,
  agreement_status: boolean,
) => {
  try {
    const {data, error} = await supabase
      .from('appointment_participants')
      .update({
        agreement_status: agreement_status ? 'confirmed' : 'cancelled',
      })
      .eq('user_id', id)
      .eq('appointment_id', appointment_id);
    if (error) {
      throw error;
    }
    return data;
  } catch (e) {
    console.error('Error appeared in setAppointmentAcceptanceSpb : ', e);
  }
};

// 약속 취소 요청
export const setAppointmentCancellationSpb = async (
  id: string,
  appointment_id: number,
) => {
  const {data, error} = await supabase
    .from('appointment_cancellation_request_log')
    .insert([
      {
        user_id: id,
        appointment_id: appointment_id,
        cancellation_status: 'cancellation-request',
      },
    ]);

  if (error) {
    throw error;
  }
  return data;
};

// 약속 display 조정
export const setListDisplaySpb = async (id: string, appointment_id: number) => {
  return supabase
    .from('appointment_participants')
    .update({
      list_displayed: false,
    })
    .eq('appointment_id', appointment_id)
    .eq('user_id', id);
};

// 약소 취소 요청 수락-거절
export const setAppointmentCancellationAcceptanceSpb = async (
  id: string,
  appointment_id: number,
  cancellation_status,
) => {
  try {
    const {data, error} = await supabase
      .from('appointment_cancellation_request_log')
      .update({
        cancellation_status: cancellation_status, // "cancellation-confirmed" || "cancllation-rejected"
      })
      .eq('user_id', id)
      .eq('appointment_id', appointment_id);
    if (error) {
      throw error;
    }
    const {data: selectData, error: selectError} = await supabase
      .from('appointment_participants')
      .select('agreement_status')
      .eq('id', id)
      .eq('appointment_id', appointment_id);
    return selectData;
  } catch (e) {
    throw e;
  }
};

// 약속 취소 신청 여부 -> 내가 취소 신청을했는지, 혹은 취소 신청에 대해 처리 해야하는지
export const getAppointmentCancellationStatusSpb = async (
  id: string,
  appointment_id: number,
) => {
  try {
    const {data, error} = await supabase
      .from('appointment_cancellation_request_log')
      .select('cancellation_status')
      .eq('user_id', id)
      .eq('appointment_id', appointment_id)
      .or(
        'cancellation_status.eq.cancellation-request,cancellation_status.eq.cancellation-pending',
      )
      .order('user_id', {ascending: false})
      .limit(1);
    if (error) {
      throw error;
    }
    return data; // null -> 취소 신청이 없음
  } catch (e) {
    console.error('Error appeared in getAppointmentCancellationStatus : ', e);
  }
};
