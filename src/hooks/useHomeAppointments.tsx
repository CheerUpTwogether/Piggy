import {useState} from 'react';
import {
  AppointmentStatus,
  AppointmentTabCategory,
  AppointmentTabStatus,
} from '@/types/appointment';
import {getAppointmentsSpb} from '@/supabase/appointmentSpb';
import {useToastStore} from '@/store/store';
import {StackNavigation} from '@/types/Router';
import {useNavigation} from '@react-navigation/native';
const useHomeAppointments = () => {
  const addToast = useToastStore(state => state.addToast);
  const categories: AppointmentTabCategory[] = [
    {label: '대기', value: 'pending', status: ['pending']},
    {label: '확정', value: 'confirmed', status: ['confirmed']},
    {
      label: '완료',
      value: 'fulfilled',
      status: ['fulfilled', 'cancelled', 'expired'],
    },
  ];

  const navigation = useNavigation<StackNavigation>();

  const handleMoveToAppointmentForm = () => {
    navigation.navigate('AppointmentForm');
  };

  const handleMoveToAppointmentDetail = item => {
    navigation.navigate('AppointmentDetail', {...item});
  };

  return {
    categories,
    handleMoveToAppointmentForm,
    handleMoveToAppointmentDetail,
  };
};

export default useHomeAppointments;
