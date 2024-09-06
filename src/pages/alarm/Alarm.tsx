import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {commonStyle} from '@/styles/common';
import {daysAgo, formatKoreanDate} from '@/utils/date';
import {useAppointmentForm, useToastStore, useUserStore} from '@/store/store';
import {Alaram, AlarmType} from '@/types/alarm';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/Router';
import {
  deleteNotificationSpb,
  getNotificationSpb,
  setConfirmNotificationSpb,
  subcribeNotification,
} from '@/supabase/alarm';
import TabBar from '@/components/common/TabBar';
import InviteSvg from '@/assets/icons/appointmentInvite.svg';
import CancelSvg from '@/assets/icons/appointmentDelete.svg';
import CoinSvg from '@/assets/icons/coin.svg';
import DeleteSvg from '@/assets/icons/trash.svg';
import AppointmentSvg from '@/assets/icons/appointment.svg';
import TimeSvg from '@/assets/icons/clock.svg';
import GradeSvg from '@/assets/icons/grade.svg';
import XSvg from '@/assets/icons/X.svg';
import {getAppointmentSingleSpb} from '@/supabase/appointmentSpb';
import dayjs from 'dayjs';

const categories = [
  {
    label: '약속',
    value: '약속',
  },
  {
    label: '피기',
    value: '피기',
  },
  {
    label: '벌금',
    value: '벌금',
  },
];

const Icon = ({
  notification_category,
  isConfirm,
}: {
  notification_category: AlarmType;
  isConfirm: boolean;
}) => {
  const code = isConfirm ? '#777' : '#333';
  switch (notification_category) {
    case 'piggy_changed_appointment':
      return <CoinSvg color={code} width={20} height={20} />;
    case 'appointment_pending':
      return <InviteSvg width={20} height={20} color={code} />;
    case 'cancellation_request':
      return <CancelSvg width={20} height={20} color={code} />;
    case 'deleted_notice':
      return <DeleteSvg width={24} height={20} color={code} />;
    case 'created_notice':
      return <AppointmentSvg width={24} height={20} color={code} />;
    case 'reminder':
      return <TimeSvg width={24} height={20} color={code} />;
    case 'piggy_changed_gift':
    case 'piggy_changed_charge':
    case 'piggy_changed_purchase':
      return <GradeSvg width={24} height={20} color={code} />;
    default:
      return <GradeSvg width={24} height={20} color={code} />;
  }
};

const Alarm = () => {
  const addToast = useToastStore(state => state.addToast);
  const [active, setActive] = useState(categories[0].value);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [notification, setNotification] = useState<Alaram[]>([]);
  const {userData} = useUserStore();
  const {setAppointmentForm} = useAppointmentForm();

  const handleClickAlarm = async (
    notification_id: number,
    notification_category: string,
    redirect_key_id_value: string | null,
  ) => {
    const res = await setConfirmNotificationSpb(notification_id);
    if (!res) {
      addToast({
        success: false,
        text: '읽음 처리 문제 발생.',
        multiText: '관리자에게 문의해주세요.',
      });
      return;
    }
    switch (notification_category) {
      case 'appointment_pending':
      case 'cancellation_request':
      case 'deleted_notice':
      case 'created_notice':
      case 'reminder':
        // 약속 상세 로직 추가 필요
        return goAppointmentForm(redirect_key_id_value);
      case 'piggy_changed_appointment':
      case 'piggy_changed_gift':
      case 'piggy_changed_charge':
      case 'piggy_changed_purchase':
        navigation.navigate('PiggyUsage');
    }
  };

  const goAppointmentForm = async appointmentId => {
    try {
      const {data, error} = await getAppointmentSingleSpb(
        userData.id,
        appointmentId,
      );

      if (error) {
        addToast({
          success: false,
          text: '읽음 처리 문제 발생.',
          multiText: '관리자에게 문의해주세요.',
        });
      }

      const calendar = dayjs(data[0]?.appointment_date);
      setAppointmentForm({
        ...data[0],
        date: calendar.format('YYYY-MM-DD'),
        time: calendar.format('HH:mm'),
        id: data[0].appointment_id,
      });
      navigation.navigate('AppointmentDetail');
    } catch {
      addToast({
        success: false,
        text: '네트워크를 확인해주세요.',
      });
    }
  };

  const handleDeleteAlarm = async (notification_id: number) => {
    const res = await deleteNotificationSpb(notification_id);
    if (!res) {
      addToast({
        success: false,
        text: '삭제 실패',
        multiText: '알림 내역을 삭제하지 못했어요.',
      });
    }
  };

  const renderItem = ({item}: {item: Alaram}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          handleClickAlarm(
            item.id,
            item.notification_category,
            item.redirect_key_id_value,
          );
        }}>
        <TouchableOpacity
          onPress={() => {
            handleDeleteAlarm(item.id);
          }}
          style={styles.deleteAlarmWrapper}>
          <XSvg color={'#777'} width={10} height={10} />
        </TouchableOpacity>
        <View
          style={[
            styles.iconContainer,
            !item.confirmed_status && {borderColor: '#04BF8A'},
          ]}>
          <Icon
            notification_category={item.notification_category}
            isConfirm={item.confirmed_status}
          />
        </View>
        <View>
          <Text
            style={
              item.confirmed_status
                ? commonStyle.REGULAR_77_18
                : commonStyle.REGULAR_33_18
            }>
            {item.notification_subject}
          </Text>
          <Text style={[commonStyle.REGULAR_77_14, styles.desc]}>
            {item.notification_contents}
          </Text>
          <Text style={[commonStyle.REGULAR_AA_12, styles.date]}>
            {daysAgo(formatKoreanDate(item.created_at))}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const fetchNotificatioLog = async () => {
    try {
      const data = await getNotificationSpb(userData.id);

      if (!data) {
        addToast({
          success: false,
          text: '알림 정보를 가져오지못했습니다.',
          multiText: '관리자에게 문의해주세요.',
        });
        return;
      }

      setNotification(data);
    } catch (e) {
      addToast({
        success: false,
        text: '알림 정보를 가져오지못했습니다.',
        multiText: '관리자에게 문의해주세요.',
      });
    }
  };

  useEffect(() => {
    const unsubscribe = subcribeNotification(userData.id, () => {
      fetchNotificatioLog();
    });
    fetchNotificatioLog();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{...commonStyle.CONTAINER, marginHorizontal: -16}}>
      <View style={styles.tabBar}>
        <TabBar categories={categories} active={active} onChange={setActive} />
      </View>
      <FlatList
        data={notification.filter(el => el.filter_criteria === active)}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: '#efefef',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderColor: '#efefef',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  tabBar: {
    paddingHorizontal: 16,
  },
  textContainer: {
    paddingTop: 6,
    paddingLeft: 12,
  },
  desc: {
    paddingTop: 4,
  },
  date: {
    paddingTop: 2,
  },
  deleteAlarmWrapper: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#777',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Alarm;
