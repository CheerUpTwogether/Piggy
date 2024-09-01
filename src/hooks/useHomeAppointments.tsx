import {useCallback, useState} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useToastStore, useUserStore} from '@/store/store';
import {getAppointmentsSpb, setPinnedSpb} from '@/supabase/appointmentSpb';
import {
  AppointmentProps,
  AppointmentStatus,
  AppointmentTabCategory,
  AppointmentTabStatus,
} from '@/types/appointment';
import {StackNavigation} from '@/types/Router';
import {useButtonBottomSheet} from './useButtonBottomSheet';

const categories: AppointmentTabCategory[] = [
  {label: '대기', value: 'pending', status: ['pending']},
  {label: '확정', value: 'confirmed', status: ['confirmed']},
  {
    label: '완료',
    value: 'fulfilled',
    status: ['fulfilled', 'cancelled', 'expired'],
  },
];
const useHomeAppointments = () => {
  const addToast = useToastStore(state => state.addToast);
  const {userData} = useUserStore();
  const navigation = useNavigation<StackNavigation>();
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [sort, setSort] = useState<AppointmentTabStatus>(categories[0].value);
  const [selectedId, setSelectedId] = useState(0);
  const {createButtonList, bottomSheetShow, setBottomSheetShow} =
    useButtonBottomSheet(
      () => onPressFix(selectedId),
      () => onPressDelete(),
    );

  useFocusEffect(
    useCallback(() => {
      getAppointment(sort);
    }, []),
  );

  // 약속 더보기 버튼 클릭
  const onPressMore = (item: AppointmentProps) => {
    setSelectedId(item.appointment_id);
    setBottomSheetShow(true);
  };

  // 정렬기준 변경
  const changeSort = (sortValue: AppointmentTabStatus) => {
    setSort(sortValue);
    getAppointment(sortValue);
  };

  // 약속 생성 폼 이동
  const goAppointmentForm = () => {
    navigation.navigate('AppointmentForm');
  };

  // 약속 리스트
  const getAppointment = async (sortValue: AppointmentStatus) => {
    const {data, error} = await getAppointmentsSpb(
      userData.id,
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
      await setPinnedSpb(userData.id, selectedId);
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
    onPressMore,
    onPressFix,
    createButtonList,
    bottomSheetShow,
    setBottomSheetShow,
  };
};

export default useHomeAppointments;
