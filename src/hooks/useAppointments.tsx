import React, {useState} from 'react';
import {
  AppointmentStatus,
  AppointmentTabCategory,
  AppointmentTabStatus,
} from '@/types/appointment';
import {getAppointmentsSpb} from '@/supabase/appointmentSpb';
import {useToastStore} from '@/store/store';

const useAppointments = () => {
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
  const [sort, setSort] = useState<AppointmentTabStatus>(categories[0].value);
  const [appointments, setAppointments] = useState([]);

  const changeSort = (sortValue: AppointmentTabStatus) => {
    setSort(sortValue);
    getAppointment(sortValue);
  };

  const getAppointment = async (sortValue: AppointmentStatus) => {
    const {data, error} = await getAppointmentsSpb(
      '8b9f1998-084e-447f-b586-d18c72cf1db4',
      categories.filter(el => el.value === sortValue)[0].status,
    );
    if (error) {
      addToast({
        success: false,
        text: '약속 정보를 불러오지 못했어요.',
      });
      return;
    }

    setAppointments(data);
  };
  return {
    categories,
    changeSort,
    sort,
    appointments,
  };
};

export default useAppointments;
