import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {commonStyle} from '@/styles/common';
import ProgressBar from '@/components/common/ProgressBar';
import ButtonCouple from '@/components/common/ButtonCouple';
import AppointmentCalendar from '@/components/appointment/AppointmentCalendar';
import AppointmentFriend from '@/components/appointment/AppointmentFriend';
import AppointmentPlace from '@/components/appointment/AppointmentPlace';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const AppointmentForm = () => {
  const [nowStep, setNowStep] = useState(1);
  const totalStep = 6;

  const handleNext = () => {
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
        return <View></View>;
      case 4:
        return <View></View>;
      case 5:
        return <View></View>;
      case 6:
        return <View></View>;
      default:
        return (
          <View>
            <Text>Error</Text>
          </View>
        );
    }
  };

  return (
    <View style={commonStyle.CONTAINER}>
      {/* 소제목 위치를 맞추기 위해 아래 View에서 패딩 처리 */}
      <View style={{height: screenHeight * 0.72}}>
        {/* 컴포넌트 위치 */}
        {handleComponent()}
        {/* 컴포넌트 위치 */}
      </View>
      <View>
        <View style={style.progressBar}>
          <ProgressBar totalStep={totalStep} nowStep={nowStep} />
        </View>
        <ButtonCouple
          onPressLeft={handlePrevious}
          onPressRight={handleNext}
          theme="outline"
          textLeft={'이전'}
          textRight={'다음'}
          style={style.button}
        />
      </View>
    </View>
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
