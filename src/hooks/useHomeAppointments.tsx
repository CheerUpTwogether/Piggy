import {useCallback, useState} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useToastStore} from '@/store/store';
import {getAppointmentsSpb, setPinnedSpb} from '@/supabase/appointmentSpb';
import {
  AppointmentProps,
  AppointmentStatus,
  AppointmentTabCategory,
  AppointmentTabStatus,
} from '@/types/appointment';
import {StackNavigation} from '@/types/Router';

const useHomeAppointments = () => {
  const addToast = useToastStore(state => state.addToast);
  const navigation = useNavigation<StackNavigation>();
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
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

  useFocusEffect(
    useCallback(() => {
      getAppointment(sort);
    }, []),
  );

  // 정렬기준 변경
  const changeSort = (sortValue: AppointmentTabStatus) => {
    setSort(sortValue);
    getAppointment(sortValue);
  };

  // 약속 생성 폼 이동
  const goAppointmentForm = () => {
    navigation.navigate('AppointmentForm');
  };

  // 약속 상세로 이동
  const goAppointmentDetail = (item: AppointmentProps) => {
    navigation.navigate('AppointmentDetail', {...item});
  };

  // 약속 리스트
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

  // 약속 고정/해제
  const onPressFix = async (selectedId: number) => {
    try {
      await setPinnedSpb('8b9f1998-084e-447f-b586-d18c72cf1db4', selectedId);
      getAppointment(sort);
    } catch {
      addToast({
        success: false,
        text: '약속 고정/취소에 실패했어요.',
      });
    }
  };

  // 약속 삭제
  const onPressDelete = () => {
    console.log();
  };

  return {
    categories,
    appointments,
    sort,
    changeSort,
    goAppointmentForm,
    goAppointmentDetail,
    onPressFix,
    onPressDelete,
  };
};

export default useHomeAppointments;
