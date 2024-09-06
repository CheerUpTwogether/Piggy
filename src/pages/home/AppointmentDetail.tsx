import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import {useLocation} from '@/hooks/useLocation';
import {useAppointmentForm, useToastStore, useUserStore} from '@/store/store';
import {commonStyle} from '@/styles/common';
import {
  getAppointmentCancellationStatusSpb,
  setAppointmentAcceptanceSpb,
  setAppointmentCancellationAcceptanceSpb,
  setAppointmentCancellationSpb,
  setCertificationStatusSpb,
  getCertificationStatusSpb,
  getAppointmentParticipantsSpb,
} from '@/supabase/appointmentSpb';
import AppointmentActionsButton from './AppointmentActionsButton';
import {Participant, CancelStatus} from '@/types/appointment';

const AppointmentDetail = () => {
  const addToast = useToastStore(state => state.addToast);
  const {userData} = useUserStore();
  const {appointmentForm} = useAppointmentForm();
  const [cancelStatus, setCancelStatus] = useState<CancelStatus>('nothing');
  const [myAgreementStatus, setMyAgreementStatus] = useState(''); // 약속 동의 상태
  const [isNearAppointment, setIsNearAppointment] = useState(''); // 약속까지 남은 시간 ('10min', '2hr', 'expired', '')
  const [certification, setCertification] = useState(false); // 도착 인증 상태
  const {location} = useLocation();
  const navigation = useNavigation();

  useEffect(() => {
    getAppointmentCancellationStatus();
    fetchCertification();
    checkAppointmentTime();
    fetchAcceptance();
    console.log(certification);
  }, [appointmentForm]);

  // 나의 약속 수락 상태 확인
  const fetchAcceptance = async () => {
    const res = await getAppointmentParticipantsSpb(
      userData.id,
      appointmentForm.id,
    );
    const myData = (res.data as Participant[]).filter(
      item => item.nickname === userData.nickname,
    );
    setMyAgreementStatus(myData[0]?.agreement_status || '');
  };

  const fetchCertification = async () => {
    try {
      const res = await getCertificationStatusSpb(
        userData.id,
        appointmentForm.id,
      );
      if (res) {
        setCertification(res?.data[0]?.certification_status || false);
      } else {
        addToast({
          success: false,
          text: '위치 정보를 가져올 수 없습니다.',
          multiText: '네트워크 연결을 확인해주세요.',
        });
        throw new Error('인증 상태를 가져오는 데 실패했습니다.');
      }
    } catch (err) {
      throw new Error(`인증 상태 불러오기 실패: ${err.message}`);
    }
  };

  // 약속 2시간 & 10분 전인지 확인
  const checkAppointmentTime = () => {
    if (!appointmentForm?.date || !appointmentForm?.time) return;

    const appointmentTime = dayjs(
      `${appointmentForm.date} ${appointmentForm.time}`,
      'YYYY-MM-DD HH:mm',
    );
    const currentTime = dayjs();
    const twoHoursBefore = appointmentTime.subtract(2, 'hour');
    const tenMinutesBefore = appointmentTime.subtract(10, 'minute');

    if (currentTime.isAfter(appointmentTime)) {
      // 약속 시간이 지났을 경우
      setIsNearAppointment('expired');
    } else if (
      currentTime.isAfter(tenMinutesBefore) &&
      currentTime.isBefore(appointmentTime)
    ) {
      setIsNearAppointment('10min');
    } else if (
      currentTime.isAfter(twoHoursBefore) &&
      currentTime.isBefore(tenMinutesBefore)
    ) {
      setIsNearAppointment('2hr');
    } else {
      setIsNearAppointment('');
    }
  };

  // 도착 인증 요청
  const handleCertification = async () => {
    if (!location) {
      addToast({
        success: false,
        text: '위치 정보를 가져올 수 없습니다.',
        multiText: '네트워크 연결을 확인해주세요.',
      });
      return;
    }
    try {
      const {latitude: userLat, longitude: userLon} = location; // 사용자 위치 좌표

      const radius = 0.15; // 인증 범위(km) - 현재 인증 반경 150m
      await setCertificationStatusSpb(
        userData.id,
        appointmentForm.id,
        appointmentForm.latitude,
        appointmentForm.longitude,
        userLat,
        userLon,
        radius,
      );
      addToast({
        success: true,
        text: '약속 인증을 완료했어요!',
      });
      navigation.goBack();
    } catch (err) {
      addToast({
        success: false,
        text: err.message || '약속 인증에 실패했어요.',
      });
    }
  };

  // 약속 취소 상태 확인
  const getAppointmentCancellationStatus = async () => {
    try {
      const res = await getAppointmentCancellationStatusSpb(
        userData.id,
        appointmentForm.id,
      );
      if (res?.[0]?.cancellation_status) {
        setCancelStatus(res?.[0]?.cancellation_status);
      }
    } catch {
      addToast({
        success: false,
        text: '약속 정보를 불러오는데 실패했어요.',
      });
    }
  };

  const cancelAppointment = async () => {
    try {
      await setAppointmentCancellationSpb(userData.id, appointmentForm.id);
      addToast({
        success: true,
        text: '약속 취소 요청을 보냈어요.',
      });
      getAppointmentCancellationStatus();
    } catch {
      addToast({
        success: false,
        text: '약속 취소 요청에 실패했어요.',
      });
    }
  };

  const setAppointmentCancellationAcceptance = async (type: string) => {
    try {
      await setAppointmentCancellationAcceptanceSpb(
        userData.id,
        appointmentForm.id,
        type,
      );
    } catch {
      addToast({
        success: false,
        text: '약속 취소 요청에 수락/거절에 실패했어요.',
      });
    }
  };

  const setAppointmentAcceptance = async (type: boolean) => {
    try {
      await setAppointmentAcceptanceSpb(userData.id, appointmentForm.id, type);
      addToast({
        success: true,
        text: `약속을 ${type ? '수락' : '거절'}했어요.`,
      });
      navigation.goBack();
    } catch {
      addToast({
        success: false,
        text: `약속 ${type ? '수락' : '거절'}에 실패했어요.`,
      });
    }
  };

  return (
    <View style={commonStyle.CONTAINER}>
      <AppointmentActionsButton
        appointmentForm={appointmentForm}
        cancelStatus={cancelStatus}
        myAgreementStatus={myAgreementStatus}
        isNearAppointment={isNearAppointment}
        certification={certification}
        handleCertification={handleCertification}
        cancelAppointment={cancelAppointment}
        setAppointmentCancellationAcceptance={
          setAppointmentCancellationAcceptance
        }
        setAppointmentAcceptance={setAppointmentAcceptance}
      />
    </View>
  );
};

export default AppointmentDetail;
