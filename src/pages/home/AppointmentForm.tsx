import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions, SafeAreaView} from 'react-native';
import {commonStyle} from '@/styles/common';
import ProgressBar from '@/components/common/ProgressBar';
import ButtonCouple from '@/components/common/ButtonCouple';
import Button from '@/components/common/Button';
import AppointmentCalendar from '@/components/appointment/AppointmentCalendar';
import AppointmentFriend from '@/components/appointment/AppointmentFriend';
import AppointmentPlace from '@/components/appointment/AppointmentPlace';
import AppointmentPenalty from '@/components/appointment/AppointmentPenalty';
import AppointmentCheck from '@/components/appointment/AppointmentCheck';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const AppointmentForm = () => {
  const [nowStep, setNowStep] = useState(1);
  const totalStep = 5;

  const handleNext = () => {
    if (nowStep === 5) {
      console.log('TODO: 약속 생성 api 호출');
    }
    setNowStep(prevStep => Math.min(prevStep + 1, totalStep));
  };

  const handlePrevious = () => {
    setNowStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const handleComponent = () => {
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
      <View style={{height: screenHeight * 0.72}}>{handleComponent()}</View>
      <View>
        <View style={style.progressBar}>
          <ProgressBar totalStep={totalStep} nowStep={nowStep} />
        </View>
        {nowStep === 1 ? (
          <Button text={'다음'} onPress={handleNext} style={style.button} />
        ) : (
          <ButtonCouple
            onPressLeft={handlePrevious}
            onPressRight={handleNext}
            theme="outline"
            textLeft={'이전'}
            textRight={nowStep === 5 ? '생성' : '다음'}
            style={style.button}
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
