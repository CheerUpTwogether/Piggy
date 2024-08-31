import supabase from '@/supabase/supabase';
import {Appointment} from '@/types/appointment';

// 약속만들기
export const setAppointmentSpb = async ({
  id,
  subject,
  participant_count,
  address,
  place_name,
  latitude,
  longitude,
  appointment_date,
  deal_piggy_count,
}: Appointment) => {
  try {
    const {data, error} = await supabase
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

    if (error) {
      throw error;
    }

    return data;
  } catch (e) {
    console.error('Error appeared in setAppointment : ', e);
  }
};

// 약속 리스트 불러오기
export const getAppointmentsSpb = (
  id: string,
  appointmentStatusArray: string[],
) => {
  return supabase.rpc('select_appointment_list_detail_temp', {
    user_uuid: id,
    appointment_status_array: appointmentStatusArray,
  });
};

// 약속 친구 리스트 - 약속 멤버 초대
export const setAppointmentParticipantsSpb = async (
  appointment_id,
  participants_uuid,
) => {
  try {
    const {data, error} = await supabase.rpc(
      'insert_appointment_participants',
      {
        appointment_id: appointment_id,
        participants_uuid: participants_uuid,
      },
    );
  } catch (e) {
    console.error('Error appeared in setAppointmentParticipantsSpb : ', e);
  }
};

// 약속 인증 상태 확인 - 자기 자신의 인증 상태만
export const getCertificationStatusSpb = async (id, appointment_id) => {
  try {
    const {data, error} = await supabase
      .from('appointment_participants')
      .select('certification_status')
      .eq('user_id', id)
      .eq('appointment_id', appointment_id);

    if (error) {
      throw error;
    }
    return data;
  } catch (e) {
    console.error('Error appeared in getCertificationStatusSpb : ', e);
  }
};

// 약속 고정/해제
export const setPinnedSpb = async (id, appointment_id) => {
  try {
    const {data, error} = await supabase
      .from('appointment_participants')
      .select('pinned')
      .eq('appointment_id', appointment_id)
      .eq('user_id', id);

    if (error) {
      throw error;
    }

    const {data: updateData, error: updateError} = await supabase
      .from('appointment_participants')
      .update({
        pinned: !data,
      })
      .eq('appointment_id', appointment_id)
      .eq('user_id', id);

    if (updateError) {
      throw updateError;
    }
  } catch (e) {
    console.error('Error appeared in setPinned : ', e);
  }
};

// 약속 수락/거절
export const setAppointmentAcceptanceSpb = async (
  id,
  appointment_id,
  agreement_status,
) => {
  try {
    const response_agreement = agreement_status ? 'confirmed' : 'cancelled';
    const {data, error} = await supabase
      .from('appointment_participants')
      .update({
        agreement_status: response_agreement,
      })
      .eq('user_id', id)
      .eq('appointment_id', appointment_id);
    if (error) {
      throw error;
    }
    return agreement_status;
  } catch (e) {
    console.error('Error appeared in setAppointmentAcceptanceSpb : ', e);
  }
};

// 약속 취소 요청
export const setAppointmentCancellationSpb = async (id, appointment_id) => {
  try {
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
  } catch (e) {
    console.error('Error appeared in setAppointmentCancellationSpb : ', e);
  }
};
