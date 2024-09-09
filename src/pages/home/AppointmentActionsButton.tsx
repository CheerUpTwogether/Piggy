import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppointmentCheck from '@/components/appointment/AppointmentCheck';
import Button from '@/components/common/Button';
import ButtonCouple from '@/components/common/ButtonCouple';
import {commonStyle} from '@/styles/common';
import {AppointmentActionsProps} from '@/types/appointment';
import useAppointmentTimer from '@/hooks/useAppointmentTimer'; //

const AppointmentActions: React.FC<AppointmentActionsProps> = ({
  appointmentForm,
  cancelStatus,
  myAgreementStatus,
  isNearAppointment,
  certification,
  appointmentTimeCheck,
  handleCertification,
  cancelAppointment,
  setAppointmentCancellationAcceptance,
  setAppointmentAcceptance,
}) => {

  const {remainingTime, formattedTime} =
    useAppointmentTimer(appointmentTimeCheck);

  const navigation = useNavigation();

  const getButtonProps = () => {
    if (remainingTime !== null && remainingTime <= 0) {
      return {text: '인증 종료', disabled: true};
    }

    if (certification) {
      return {text: '인증 완료', disabled: true};
    }

    const isCertificationPossible = formattedTime && remainingTime > 0;

    switch (isNearAppointment) {
      case '10min':
        return {
          text: isCertificationPossible
            ? `약속 인증 ${formattedTime}`
            : '인증 종료',
          onPress: isCertificationPossible ? handleCertification : undefined,
          disabled: !isCertificationPossible,
        };
      case '2hr':
        return {
          text: '약속 인증',
          disabled: true,
        };
      case 'expired': {
        return {
          text: '인증 종료',
          disabled: true,
        };
      }
      default:
        return {text: '취소 요청', onPress: cancelAppointment, disabled: false};
    }
  };

  const buttonDecision = () => {
    if (
      appointmentForm.appointment_status === 'expired' ||
      appointmentForm.appointment_status === 'fulfilled'
    ) {
      return;
    }

    if (appointmentForm.appointment_status === 'pending') {
      return myAgreementStatus === 'confirmed' ? (
        <Button
          text={'다른 참여자의 수락 대기중...'}
          onPress={() => {}}
          disable={true}
        />
      ) : (
        <ButtonCouple
          onPressLeft={() => {
            setAppointmentAcceptance(false);
            navigation.goBack();
          }}
          onPressRight={() => {
            setAppointmentAcceptance(true);
            navigation.goBack();
          }}
          textLeft={'약속 거절'}
          textRight={'약속 수락'}
          theme="outline"
        />
      );
    }

    // 취소 요청 후 2시간 전일 때 약속 정상 실행
    if (
      isNearAppointment === '2hr' &&
      appointmentForm.appointment_status === 'confirmed'
    ) {
      const {text, onPress, disabled} = getButtonProps();
      return <Button text={text} onPress={onPress} disable={disabled} />;
    }

    // 취소 요청 상태 처리
    if (cancelStatus === 'nothing') {
      const {text, onPress, disabled} = getButtonProps();
      return <Button text={text} onPress={onPress} disable={disabled} />;
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
            setAppointmentCancellationAcceptance('cancellation-rejected');
            navigation.goBack();
          }}
          onPressRight={() => {
            setAppointmentCancellationAcceptance('cancellation-confirmed');
            navigation.goBack();
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
      <AppointmentCheck>{buttonDecision()}</AppointmentCheck>
    </View>
  );
};

export default AppointmentActions;
