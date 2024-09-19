import {useCallback, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useModalStore, useToastStore, useUserStore} from '@/store/store';
import {
  getAppointmentsSpb,
  setListDisplaySpb,
  setPinnedSpb,
} from '@/supabase/appointmentSpb';
import {
  AppointmentProps,
  AppointmentStatus,
  AppointmentTabCategory,
  AppointmentTabStatus,
} from '@/types/appointment';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {StackNavigation} from '@/types/Router';
import {getPiggySpb} from '@/supabase/AuthSpb';
import {getFcmTokenSpb} from '@/supabase/auth';
import DeviceInfo from 'react-native-device-info';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

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
  const {openModal, closeModal} = useModalStore();
  const {userData, setUserDataByKey} = useUserStore();
  const navigation = useNavigation<StackNavigation>();
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [sort, setSort] = useState<AppointmentTabStatus>(categories[0].value);
  const [selectedId, setSelectedId] = useState(0);

  const [bottomSheetShow, setBottomSheetShow] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getPiggy();
    }, []),
  );

  useEffect(() => {
    getAppointment(sort);
  }, [sort]);

  useEffect(() => {
    checkAlarmModal();
  }, []);

  const createButtonList = () => {
    const buttons: Array<{
      text: string;
      theme?: 'sub' | 'primary' | 'outline' | undefined;
      onPress: () => void | Promise<void>;
      disable?: boolean;
    }> = [
      {
        text: '고정',
        onPress: () => {
          setBottomSheetShow(false);
          onPressFix(selectedId);
        },
      },
    ];

    const appointment = appointments.find(
      el => el.appointment_id === selectedId,
    );
    if (
      appointment?.appointment_status !== 'pending' &&
      appointment?.appointment_status !== 'confirmed'
    ) {
      buttons.push({
        text: '삭제',
        onPress: () => {
          setBottomSheetShow(false);
          onPressDelete(selectedId);
        },
        theme: 'outline',
      });
    }

    return buttons;
  };

  // 피기 정보 불러오기
  const getPiggy = async () => {
    const res = await getPiggySpb(userData.id);
    setUserDataByKey('piggy', res?.latest_piggy_count);
  };

  //appointments.find(el => el.appointment_id === selectedId);
  // 약속 더보기 버튼 클릭
  const onPressMore = (item: AppointmentProps) => {
    setSelectedId(item.ap_id);
    setBottomSheetShow(true);
  };

  // 정렬기준 변경
  const changeSort = (sortValue: AppointmentTabStatus) => {
    setSort(sortValue);
    //getAppointment(sortValue);
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
      console.log(error);
      addToast({
        success: false,
        text: '약속 정보를 불러오지 못했어요.',
      });
      return;
    }

    console.log(data);
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
    deleteAppointment(appointmentId);
  };

  // 약속 리스트에서 display 삭제
  const deleteAppointment = async (appointmentId: number) => {
    try {
      const {data, error} = await setListDisplaySpb(userData.id, appointmentId);
      if (error) {
        addToast({
          success: false,
          text: '약속 삭제에 실패했어요.',
        });
        return;
      }
      setAppointments(prev => prev.filter(el => el.ap_id !== appointmentId));
    } catch {
      addToast({
        success: false,
        text: '인터넷 연결이 되어있지 않아요',
      });
    }
  };

  // 알람 모달 보여줘야 하는지 확인
  const checkAlarmModal = async () => {
    // 안드로이드 13(API33) 보다 낮은 버전일때
    if (!isAndroid13OrAbove()) {
      return;
    }
    // 안드로이드 13이상부터는 권한 확인 필요
    const device_token = await AsyncStorage.getItem('device_token');
    if (!device_token) {
      const fcmToken = await messaging().getToken();
      await AsyncStorage.setItem('device_token', fcmToken);
      openAlarmModal();
    }

    const {data, error} = await getFcmTokenSpb(userData.id);

    if (error) {
      // 토큰 불러오기 에러
    }

    if (data.length > 0) {
      if (device_token !== data[0].device_token) {
        await AsyncStorage.setItem('device_token', data[0].device_token);
        openAlarmModal();
      }
    }
  };

  // 안드로이드 버전 체크 함수
  const isAndroid13OrAbove = () => {
    if (Platform.OS === 'android') {
      const androidVersion = DeviceInfo.getSystemVersion();
      console.log(androidVersion);
      return parseInt(androidVersion, 10) >= 13;
    }
    return false;
  };

  const openAlarmModal = () => {
    openModal({
      title: '푸쉬알림을 받아 보시겠어요?',
      content: '앱 종료시에도 약속 관련 중요한 소식을 놓치지 않을 수 있어요!',
      text: '알림받기',
      onPress: () => {
        clickAlarmModal();
      },
      textCancel: '닫기',
    });
  };

  const clickAlarmModal = async () => {
    const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

    if (result === RESULTS.GRANTED) {
      addToast({
        success: true,
        text: '푸시 알림을 활성화하였습니다.',
      });
    } else {
      addToast({
        success: true,
        text: '푸시 알림이 비활성화되었습니다.',
      });
    }
    closeModal();
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
