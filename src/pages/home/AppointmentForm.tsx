import React, {useCallback, useState} from 'react';
import {View, StyleSheet, Text, Dimensions, SafeAreaView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {commonStyle} from '@/styles/common';
import ProgressBar from '@/components/common/ProgressBar';
import ButtonCouple from '@/components/common/ButtonCouple';
import Button from '@/components/common/Button';
import AppointmentCalendar from '@/components/appointment/AppointmentCalendar';
import AppointmentFriend from '@/components/appointment/AppointmentFriend';
import AppointmentPlace from '@/components/appointment/AppointmentPlace';
import AppointmentPenalty from '@/components/appointment/AppointmentPenalty';
import AppointmentCheck from '@/components/appointment/AppointmentCheck';
import {AppointmentData} from './type';
import {useAppointmentForm} from '@/store/store';

const {height: screenHeight} = Dimensions.get('screen');

const AppointmentForm = () => {
  const [data, setData] = useState<AppointmentData>({
    friends: [],
    subject: '',
    location: '',
    date: '',
    time: '',
    penalty: '',
  });
  const [nowStep, setNowStep] = useState(1);
  const totalStep = 5;
  const {resetAppointmentForm} = useAppointmentForm();

  useFocusEffect(
    useCallback(() => {
      resetAppointmentForm();
    }, []),
  );

  // 주어진 이름(name)에 해당하는 상태 값을 업데이트
  const onUpdate = (name: string, value: [] | string | number) => {
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (nowStep === 5) {
      console.log('TODO: 약속 생성 api 호출');
    }

    setNowStep(prevStep => Math.min(prevStep + 1, totalStep));
  };
  const handlePrevious = () => {
    setNowStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const getCurrentComponent = () => {
    switch (nowStep) {
      case 1:
        return <AppointmentFriend />;
      case 2:
        return <AppointmentPlace />;
      case 3:
        return <AppointmentCalendar />;
      case 4:
        return (
          <AppointmentPenalty penalty={data.penalty} onUpdate={onUpdate} />
        );
      case 5:
        return <AppointmentCheck data={data} />;
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
      <View style={{height: screenHeight * 0.72}}>{getCurrentComponent()}</View>
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
