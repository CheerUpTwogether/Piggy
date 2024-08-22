import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {commonStyle} from '@/styles/common';
import ProgressBar from '@/components/common/ProgressBar';
import ButtonCouple from '@/components/common/ButtonCouple';

const AppointmentForm = () => {
  const [nowStep, setNowStep] = useState(1);
  const totalStep = 6;

  const handleNext = () => {
    setNowStep(prevStep => Math.min(prevStep + 1, totalStep));
  };

  const handlePrevious = () => {
    setNowStep(prevStep => Math.max(prevStep - 1, 0));
  };

  return (
    <View style={commonStyle.CONTAINER}>
      <View style={style.progressWrapper}>
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
  progressWrapper: {
    position: 'absolute',
    bottom: 30,
    left: 15,
    right: 15,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
  },
  button: {
    marginTop: 20,
  },
});

export default AppointmentForm;
