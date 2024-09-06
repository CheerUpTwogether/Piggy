import React from 'react';
import {View} from 'react-native';
import AppointmentCheck from '@/components/appointment/AppointmentCheck';
import Button from '@/components/common/Button';
import ButtonCouple from '@/components/common/ButtonCouple';
import {commonStyle} from '@/styles/common';
import {AppointmentActionsProps} from '@/types/appointment';

const AppointmentActions: React.FC<AppointmentActionsProps> = ({
  appointmentForm,
  cancelStatus,
  myAgreementStatus,
  isNearAppointment,
  certification,
  handleCertification,
  cancelAppointment,
  setAppointmentCancellationAcceptance,
  setAppointmentAcceptance,
}) => {
  const getButtonProps = () => {
    if (certification) {
      return {text: '인증 완료', disabled: true};
    }

    switch (isNearAppointment) {
      case '10min':
        return {
          text: '약속 인증',
          onPress: handleCertification,
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
      <AppointmentCheck>{buttonDecision()}</AppointmentCheck>
    </View>
  );
};

export default AppointmentActions;
