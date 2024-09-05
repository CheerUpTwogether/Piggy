import AppointmentCheck from '@/components/appointment/AppointmentCheck';
import {commonStyle} from '@/styles/common';
import React from 'react';
import {View} from 'react-native';

const AppointmentCancel = () => {
  return (
    <View style={commonStyle.CONTAINER}>
      <AppointmentCheck />
    </View>
  );
};

export default AppointmentCancel;
