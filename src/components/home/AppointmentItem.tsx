import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '@/types/Router';
import {commonStyle, color_primary, color_ef} from '@/styles/common';
import {AppointmentProps} from '@/types/appointment';
import useAppointmentTimer from '@/hooks/useAppointmentTimer';
import {useAppointmentForm, useUserStore} from '@/store/store';
import dayjs from 'dayjs';
import MoreSvg from '@/assets/icons/more.svg';
import PinSvg from '@/assets/icons/pin.svg';

const AppointmentItem = ({
  item,
  onPressMore,
  onPressFix,
}: {
  item: AppointmentProps;
  onPressMore: (item: AppointmentProps) => void;
  onPressFix: (id: number) => void;
}) => {
  const navigation = useNavigation<StackNavigation>();
  const {setAppointmentForm} = useAppointmentForm();
  const {userData} = useUserStore();
  const cancelStatus = ['cancelled', 'expired'];
  // useAppointmentTimer 타이머 훅 호출
  const {remainingTime, formattedTime} = useAppointmentTimer(
    item.appointment_date,
  );

  // 10분 타이머를 표시할지 결정
  const shouldShowTimer =
    item.agreement_status === 'confirmed' && remainingTime && remainingTime > 0;

  const titleFontColor = cancelStatus.includes(item.appointment_status)
    ? commonStyle.BOLD_AA_20
    : commonStyle.BOLD_33_20;
  const contentFontColor = cancelStatus.includes(item.appointment_status)
    ? commonStyle.MEDIUM_AA_14
    : commonStyle.MEDIUM_33_14;

  const notUseFreindsIcon =
    cancelStatus.includes(item.appointment_status) ||
    (item.appointment_status === 'pending' &&
      item.agreement_status === 'pending');

  const onPress = () => {
    const calendar = dayjs(item?.appointment_date);
    setAppointmentForm({
      ...item,
      date: calendar.format('YYYY-MM-DD'),
      time: calendar.format('HH:mm'),
      id: item.appointment_id,
      appointment_participants_list: item.appointment_participants_list.filter(
        el => el.user_id !== userData.id,
      ),
    });
    navigation.navigate('AppointmentDetail');
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* 타이머 */}
      {shouldShowTimer && (
        <View style={styles.title}>
          <Text style={commonStyle.BOLD_PRIMARY_20}>{formattedTime}</Text>
        </View>
      )}

      {/* 모임 타이틀 */}
      <View style={styles.title}>
        <Text style={titleFontColor}>{item.subject}</Text>
        <View style={{flexDirection: 'row'}}>
          {item.pinned && (
            <TouchableOpacity
              style={{marginRight: 12}}
              onPress={() => onPressFix(item.appointment_id)}>
              <PinSvg color="#777" style={styles.svg} />
            </TouchableOpacity>
          )}
          {!shouldShowTimer && (
            <TouchableOpacity onPress={() => onPressMore(item)}>
              <MoreSvg color="#777" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 장소 */}
      <Text style={{paddingTop: 4}}>{item?.place_name || item.address}</Text>

      {/* 시간 */}
      <Text style={{paddingTop: 2}}>
        {dayjs(item.appointment_date).format('YYYY-MM-DD HH:mm')}
      </Text>

      <View style={styles.friendsTagContiner}>
        {/* 친구 리스트 */}
        <View style={{paddingTop: 16, flexDirection: 'row'}}>
          {item.appointment_participants_list.map((el, idx) => (
            <Image
              src={el.profile_img_url}
              style={[
                styles.profileImgUrl,
                idx !== 0 && styles.marginLeftMinus,
              ]}
              key={el.user_id}
            />
          ))}
        </View>

        {/* 태그 */}
        <View style={{flexDirection: 'row', gap: 8}}>
          {/* 대기중인 경우 */}
          {item.appointment_status === 'pending' && (
            <Text style={styles.grayLabel}>대기</Text>
          )}
          {item.appointment_status === 'pending' &&
            item.agreement_status !== 'confirmed' && (
              <Text style={styles.grayLabel}>미수락</Text>
            )}
          {item.appointment_status === 'pending' &&
            item.agreement_status === 'confirmed' && (
              <Text style={styles.pinkLabel}>수락완료</Text>
            )}

          {/* 취소된 경우 */}
          {item.appointment_status === 'cancelled' && (
            <Text style={styles.grayLabel}>취소</Text>
          )}

          {/* 확정인 경우 */}
          {item.appointment_status === 'confirmed' && (
            <Text style={styles.pinkLabel}>확정</Text>
          )}
          {/* 취소 요청이 있는 경우 */}

          {/* 이행된 경우 */}
          {item.appointment_status === 'fulfilled' && (
            <Text style={styles.pinkLabel}>인증 성공</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 8,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImgUrl: {
    width: 36,
    height: 36,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#fff',
  },
  marginLeftMinus: {
    marginLeft: -8,
  },
  friendsTagContiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  grayLabel: {
    backgroundColor: '#efefef',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 100,
    ...commonStyle.BOLD_33_14,
  },
  pinkLabel: {
    backgroundColor: '#FFE3E3',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 100,
    ...commonStyle.BOLD_PRIMARY_14,
  },
});

export default AppointmentItem;
