import React from 'react';
import {View, StyleSheet, Text, Dimensions, SafeAreaView} from 'react-native';
import {commonStyle} from '@/styles/common';
import useAppointmentFormHooks from '@/hooks/useAppointmentFormHooks';
import ProgressBar from '@/components/common/ProgressBar';
import ButtonCouple from '@/components/common/ButtonCouple';
import Button from '@/components/common/Button';
import AppointmentFriend from '@/components/appointment/AppointmentFriend';
import AppointmentPlace from '@/components/appointment/AppointmentPlace';
import AppointmentCalendar from '@/components/appointment/AppointmentCalendar';
import AppointmentPenalty from '@/components/appointment/AppointmentPenalty';
import AppointmentCheck from '@/components/appointment/AppointmentCheck';

const {height: screenHeight} = Dimensions.get('screen');

const AppointmentForm = () => {
  const {nowStep, totalStep, disable, handlePrevious, handleNext, piggy} =
    useAppointmentFormHooks();

  const getCurrentComponent = () => {
    switch (nowStep) {
      case 1:
        return <AppointmentFriend />;
      case 2:
        return <AppointmentPlace />;
      case 3:
        return <AppointmentCalendar />;
      case 4:
        return <AppointmentPenalty />;
      case 5:
        return <AppointmentCheck />;
      default:
        return (
          <View>
            <Text>Error</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={commonStyle.CONTAINER}>
      <View style={{height: screenHeight - 80, flex: 1}}>
        {getCurrentComponent()}
      </View>
      <View style={{height: 80}}>
        <View style={style.progressBar}>
          <ProgressBar totalStep={totalStep} nowStep={nowStep} />
        </View>

        {nowStep === 1 ? (
          <Button
            text={'다음'}
            onPress={handleNext}
            style={style.button}
            disable={disable()}
          />
        ) : (
          <ButtonCouple
            onPressLeft={handlePrevious}
            onPressRight={handleNext}
            theme="outline"
            textLeft={'이전'}
            textRight={nowStep === 5 ? '생성' : '다음'}
            style={style.button}
            disableRight={disable()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  progressBar: {
    width: '100%',
  },
  button: {
    marginTop: 20,
  },
});

export default AppointmentForm;
