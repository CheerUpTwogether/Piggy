import {useCallback, useState} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useToastStore, useUserStore, useAppointmentForm} from '@/store/store';
import {
  getAppointmentCancellationStatusSpb,
  getAppointmentsSpb,
  setAppointmentCancellationSpb,
  setListDisplaySpb,
  setPinnedSpb,
} from '@/supabase/appointmentSpb';
import {
  AppointmentProps,
  AppointmentStatus,
  AppointmentTabCategory,
  AppointmentTabStatus,
} from '@/types/appointment';
import {StackNavigation} from '@/types/Router';
import {useButtonBottomSheet} from './useButtonBottomSheet';
import {getPiggySpb} from '@/supabase/AuthSpb';
import dayjs from 'dayjs';

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
  const {userData, setUserDataByKey} = useUserStore();
  const navigation = useNavigation<StackNavigation>();
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [sort, setSort] = useState<AppointmentTabStatus>(categories[0].value);
  const [selectedId, setSelectedId] = useState(0);
  const [disable, setDisable] = useState(false);
  const {setAppointmentForm} = useAppointmentForm();

  const {createButtonList, bottomSheetShow, setBottomSheetShow} =
    useButtonBottomSheet(
      () => onPressFix(selectedId),
      () => onPressDelete(selectedId),
      sort === 'fulfilled' ? '삭제' : '취소 관리',
    );

  useFocusEffect(
    useCallback(() => {
      getAppointment(sort);
      getPiggy();
    }, []),
  );

  // 피기 정보 불러오기
  const getPiggy = async () => {
    const res = await getPiggySpb(userData.id);
    setUserDataByKey('piggy', res?.latest_piggy_count);
    console.log(userData);
  };

  //appointments.find(el => el.appointment_id === selectedId);
  // 약속 더보기 버튼 클릭
  const onPressMore = (item: AppointmentProps) => {
    setSelectedId(item.appointment_id);
    getAppointmentCancellationStatus(item.appointment_id);
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
  const onPressFix = async (appointmentId: number) => {
    try {
      await setPinnedSpb(userData.id, appointmentId);
      getAppointment(sort);
    } catch {
      addToast({
        success: false,
        text: '약속 고정/취소에 실패했어요.',
      });
    }
  };

  // ButtonBottomSheet 2번째 버튼 클릭 이벤트
  const onPressDelete = (appointmentId: number) => {
    if (sort === 'fulfilled') {
      deleteAppointment(appointmentId);
    } else {
      //cancelAppointment(appointmentId);
      const appointment = appointments.find(
        el => el.appointment_id === appointmentId,
      );
      if (appointment) {
        //const test =
        const calendar = dayjs(appointment.appointment_date);
        setAppointmentForm({
          date: calendar.format('YYYY-MM-DD'),
          time: calendar.format('HH:mm'),
          ...appointment,
        });
      }
      navigation.navigate('AppointmentCancel');
    }
  };

  // 약속 취소 요청
  const cancelAppointment = async (appointmentId: number) => {
    try {
      await setAppointmentCancellationSpb(userData.id, appointmentId);
      addToast({
        success: false,
        text: '약속 취소 요청을 보냈어요.',
      });
    } catch (e) {
      addToast({
        success: false,
        text: '약속 취소 요청에 실패했어요.',
      });
    }
  };

  // 약속 리스트에서 display 삭제
  const deleteAppointment = async (appointmentId: number) => {
    try {
      const {error} = await setListDisplaySpb(userData.id, appointmentId);
      if (error) {
        addToast({
          success: false,
          text: '약속 삭제에 실패했어요.',
        });
        return;
      }
      setAppointments(prev =>
        prev.filter(el => el.appointment_id !== appointmentId),
      );
    } catch {
      addToast({
        success: false,
        text: '인터넷 연결이 되어있지 않아요',
      });
    }
  };

  // 약속 취소 요청 했는지 체크
  const getAppointmentCancellationStatus = async (appointmentId: number) => {
    const res = await getAppointmentCancellationStatusSpb(
      userData.id,
      appointmentId,
    );
    // 빈 배열이면 요청이 없음
    if (res?.length) {
      setDisable(true);
    } else {
      setDisable(false);
    }
    console.log(res);
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
