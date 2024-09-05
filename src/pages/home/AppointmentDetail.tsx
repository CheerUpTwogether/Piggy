import {View} from 'react-native';
import AppointmentCheck from '@/components/appointment/AppointmentCheck';
import Button from '@/components/common/Button';
import ButtonCouple from '@/components/common/ButtonCouple';
import {useAppointmentForm, useToastStore, useUserStore} from '@/store/store';
import {commonStyle} from '@/styles/common';
import {
  getAppointmentCancellationStatusSpb,
  setAppointmentAcceptanceSpb,
  setAppointmentCancellationAcceptanceSpb,
  setAppointmentCancellationSpb,
} from '@/supabase/appointmentSpb';
import React, {useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';

const AppointmentDetail = () => {
  const addToast = useToastStore(state => state.addToast);
  const {userData} = useUserStore();
  const {appointmentForm} = useAppointmentForm();
  const [cancelStatus, setCancelStatus] = useState('nothing');
  const navigation = useNavigation();

  useEffect(() => {
    getAppointmentCancellationStatus();
  }, []);

  // 약속 취소 요청 했는지 체크
  const getAppointmentCancellationStatus = async () => {
    try {
      const res = await getAppointmentCancellationStatusSpb(
        userData.id,
        appointmentForm.id,
      );
      console.log(res);
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

  // 약속 취소 요청
  const cancelAppointment = async () => {
    try {
      await setAppointmentCancellationSpb(userData.id, appointmentForm.id);
      addToast({
        success: false,
        text: '약속 취소 요청을 보냈어요.',
      });
      getAppointmentCancellationStatus();
    } catch (e) {
      addToast({
        success: false,
        text: '약속 취소 요청에 실패했어요.',
      });
    }
  };

  // 약속 취소 요청 응답
  const setAppointmentCancellationAcceptance = async type => {
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

  // 약속 수락/거절
  const setAppointmentAcceptance = async type => {
    try {
      await setAppointmentAcceptanceSpb(userData.id, appointmentForm.id, type);
      addToast({
        success: false,
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
  const btn = () => {
    if (
      appointmentForm.appointment_status === 'expired' ||
      appointmentForm.appointment_status === 'fulfilled'
    ) {
      return;
    }

    if (appointmentForm.agreement_status === 'pending') {
      return (
        <ButtonCouple
          onPressLeft={() => {
            setAppointmentAcceptance(false);
          }}
          onPressRight={() => {
            setAppointmentAcceptance(true);
          }}
          textLeft={'약속 거절'}
          textRight={'약속 수락'}
          theme="outline"
        />
      );
    }

    if (cancelStatus === 'nothing') {
      return <Button text={'취소 요청'} onPress={cancelAppointment} />;
    }

    if (cancelStatus === 'cancellation-request') {
      return (
        <Button
          text={'취소 요청 완료'}
          onPress={cancelAppointment}
          disable={true}
        />
      );
    }

    if (cancelStatus === 'cancellation-rejected') {
      return <Button text={'취소 거절'} disable={true} />;
    }

    if (cancelStatus === 'cancellation-confirm') {
      return <Button text={'취소 완료'} disable={true} />;
    }

    if (cancelStatus === 'cancellation-pending') {
      return (
        <ButtonCouple
          onPressLeft={() => {
            setAppointmentCancellationAcceptance('cancllation-rejected');
          }}
          onPressRight={() => {
            setAppointmentCancellationAcceptance('cancellation-confirmed');
          }}
          textLeft={'취소 거절'}
          textRight={'취소 수락'}
          theme="outline"
        />
      );
    }
  };

  return (
    <View style={commonStyle.CONTAINER}>
      <AppointmentCheck>{btn()}</AppointmentCheck>
    </View>
  );
};

export default AppointmentDetail;
