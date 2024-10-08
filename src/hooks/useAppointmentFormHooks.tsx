import {useCallback, useState} from 'react';
import {useAppointmentForm, useUserStore, useToastStore} from '@/store/store';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  deleteAppointmentParticipantsSpb,
  deleteAppointmentSpb,
  setAppointmentParticipantsSpb,
  setAppointmentProposerSpb,
  setAppointmentSpb,
} from '@/supabase/appointmentSpb';
import {sendInviteNotificationAPI} from '@/api/fcm';
import {getPiggySpb} from '@/supabase/AuthSpb';

const useAppointmentFormHooks = () => {
  const [nowStep, setNowStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigation = useNavigation();
  const addToast = useToastStore(state => state.addToast);
  const {appointmentForm, resetAppointmentForm} = useAppointmentForm();
  const {userData, setUserDataByKey} = useUserStore();
  const totalStep = 5;

  // 전역 상태 폼 reset
  useFocusEffect(
    useCallback(() => {
      resetAppointmentForm();
      getPiggy();
    }, []),
  );

  // 피기 정보 불러오기
  const getPiggy = async () => {
    const res = await getPiggySpb(userData.id);
    setUserDataByKey('piggy', res?.latest_piggy_count);
  };

  // 이전 버튼 클릭
  const handlePrevious = () => {
    setNowStep(prevStep => Math.max(prevStep - 1, 1));
  };

  // 다음 버튼 클릭
  const handleNext = () => {
    if (nowStep === 5) {
      handleAddAppointment();
    }
    setNowStep(prevStep => Math.min(prevStep + 1, totalStep));
  };

  // next 버튼 비활성화 여부
  const disable = () => {
    // 약속 생성 중일 때 버튼 비활성화
    if (isProcessing) {
      return true;
    }
    if (
      (!appointmentForm.subject ||
        !appointmentForm?.appointment_participants_list?.length) &&
      nowStep === 1
    ) {
      return true;
    }

    if (!appointmentForm.latitude && nowStep === 2) {
      return true;
    }

    if (!appointmentForm.date && nowStep === 3) {
      return true;
    }

    if (appointmentForm.date && nowStep === 3) {
      const newDate = new Date(appointmentForm.date);
      newDate.setHours(appointmentForm.time?.split(':')[0]);
      newDate.setMinutes(appointmentForm.time?.split(':')[1]);

      const today = new Date();
      today.setHours(today.getHours());

      // 오늘보다 이전 날짜 필터
      if (newDate < today) {
        return true;
      }
      // 시간 차이를 밀리초 단위로 계산
      const timeDifference = Math.abs(newDate - today);

      // 밀리초를 시간으로 변환
      const differenceInHours = timeDifference / (1000 * 60 * 60);

      if (differenceInHours <= 2) {
        return true;
      }
    }

    if (appointmentForm.deal_piggy_count > userData.piggy && nowStep === 4) {
      return true;
    }

    return false;
  };

  // 약속 생성
  const handleAddAppointment = async () => {
    // 이미 처리 중일 경우 추가로 약속 생성 막음
    if (isProcessing) {
      return;
    }
    try {
      setIsProcessing(true);
       await addAppointment();
      navigation.goBack();
      addToast({
        success: true,
        text: '약속을 생성했어요',
        multiText: '약속을 잊지 마세요!',
      });
    } catch (e) {
      addToast({
        success: false,
        text: e.message || '약속 생성에 실패했어요',
      });
    }
  };

  // 약속 row 추가
  const addAppointment = async () => {
    const {
      subject,
      appointment_participants_list,
      address,
      place_name,
      latitude,
      longitude,
      deal_piggy_count,
      date,
      time,
    } = appointmentForm;

    const {data, error} = await setAppointmentSpb({
      id: userData.id,
      subject,
      participant_count: (appointment_participants_list?.length || 0) + 1,
      address,
      place_name,
      latitude,
      longitude,
      appointment_date: `${date} ${time}`,
      deal_piggy_count,
    });

    if (error) {
      throw error;
    }
    await addAppointmentParticipants(data?.[0].id);
    return data;
  };

  // 약속 참석자 row 추가
  const addAppointmentParticipants = async (id: number) => {
    if (!appointmentForm.appointment_participants_list) {
      return;
    }

    const participants_uuid = [
      ...appointmentForm.appointment_participants_list.map(el => el.id),
      userData.id,
    ];

    const {data, error} = await setAppointmentParticipantsSpb(
      id,
      participants_uuid,
    );

    await updateAppointmentProposer(userData.id, id);

    if (error) {
      await deleteAppointment(id);
      throw Error;
    }
    return data;
  };

  // 약속 참석자 중 proporser 상태 변경
  const updateAppointmentProposer = async (
    userId: string,
    appointmentId: number,
  ) => {
    const {error} = await setAppointmentProposerSpb(userId, appointmentId);
    
    if (error) {
      await deleteAppointmentParticipants(appointmentId);
      await deleteAppointment(appointmentId);
      throw Error;
    }
  };

  // 약속 생성 api 실패로 인한 약속 삭제
  const deleteAppointment = async (appointmentId: number) => {
    await deleteAppointmentSpb(appointmentId);
  };

  // 약속 생성 api 실패로 인한 약속 참여자 삭제
  const deleteAppointmentParticipants = async (appointmentId: number) => {
    await deleteAppointmentParticipantsSpb(appointmentId);
  };

  return {
    nowStep,
    totalStep,
    disable,
    handlePrevious,
    handleNext,
  };
};

export default useAppointmentFormHooks;
