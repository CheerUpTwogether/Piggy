import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '@/types/Router';
import {commonStyle} from '@/styles/common';
import {AppointmentProps} from '@/types/appointment';
import useAppointmentTimer from '@/hooks/useAppointmentTimer';
import {useAppointmentForm, useUserStore} from '@/store/store';
import SkeletonAppointmentItem from '../skeleton/SkeletonAppointmentItem';
import dayjs from 'dayjs';
import MoreSvg from '@/assets/icons/more.svg';
import PinSvg from '@/assets/icons/pin.svg';
const basicProfile = require('@/assets/images/basicProfile.png');

const AppointmentItem = ({
  item,
  loading,
  onPressMore,
}: {
  item: AppointmentProps;
  loading: boolean;
  onPressMore: (item: AppointmentProps) => void;
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
    ? commonStyle.REGULAR_AA_16
    : commonStyle.REGULAR_33_16;

  const onPress = () => {
    const calendar = dayjs(item?.appointment_date);
    setAppointmentForm({
      ...item,
      date: calendar.format('YYYY-MM-DD'),
      time: calendar.format('HH:mm'),
      id: item.ap_id,
      appointment_participants_list: item.appointment_participants_list.filter(
        el => el.user_id !== userData.id,
      ),
    });
    navigation.navigate('AppointmentDetail');
  };

  return (
    <>
      {loading ? (
        <SkeletonAppointmentItem />
      ) : (
        <TouchableOpacity style={styles.container} onPress={onPress}>
          {/* 타이머 */}
          {shouldShowTimer && (
            <View style={styles.title}>
              <Text style={commonStyle.BOLD_PRIMARY_20}>{formattedTime}</Text>
              <TouchableOpacity
                onPress={() => onPressMore(item)}
                style={styles.moreWrapper}>
                <MoreSvg color="#777" style={styles.svg} />
              </TouchableOpacity>
            </View>
          )}

          {/* 모임 타이틀 */}
          <View style={styles.title}>
            <Text style={titleFontColor}>{item.subject}</Text>
            <View style={{flexDirection: 'row'}}>
              {item.pinned && (
                <View style={{marginRight: 12}}>
                  <PinSvg color="#777" style={styles.svg} />
                </View>
              )}
              {!shouldShowTimer && (
                <TouchableOpacity
                  onPress={() => onPressMore(item)}
                  style={styles.moreWrapper}>
                  <MoreSvg color="#777" style={styles.svg} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* 장소 */}
          <Text style={[contentFontColor, {paddingTop: 4}]}>
            {item?.place_name || item.address}
          </Text>

          {/* 시간 */}
          <Text style={[contentFontColor, {paddingTop: 2}]}>
            {dayjs(item.appointment_date).format('YYYY-MM-DD HH:mm')}
          </Text>

          {/* 친구 리스트 */}
          <View style={styles.friendsTagContiner}>
            <View style={{paddingTop: 16, flexDirection: 'row'}}>
              {item.appointment_participants_list.map((el, idx) =>
                el.profile_img_url ? (
                  <Image
                    source={{uri: el.profile_img_url}}
                    style={[
                      styles.profileImgUrl,
                      idx !== 0 && styles.marginLeftMinus,
                    ]}
                    key={el.user_id + item.ap_id}
                  />
                ) : (
                  <View
                    style={[
                      styles.basicProfileWrapper,
                      idx !== 0 && styles.marginLeftMinus,
                    ]}
                    key={el.user_id + item.ap_id}>
                    <Image source={basicProfile} style={styles.basicProfile} />
                  </View>
                ),
              )}
            </View>

            {/* 태그 */}
            <View style={{flexDirection: 'row', gap: 8}}>
              {item.appointment_status === 'pending' &&
                item.agreement_status !== 'confirmed' && (
                  <Text style={styles.pinkLabel}>수락 필요</Text>
                )}
              {item.appointment_status === 'pending' &&
                item.agreement_status === 'confirmed' && (
                  <Text style={styles.grayLabel}>다른 사용자의 수락대기중</Text>
                )}

              {/* 취소/만료된 경우 */}
              {(item.appointment_status === 'cancelled' ||
                item.appointment_status === 'expired') && (
                <Text style={styles.grayLabel}>취소</Text>
              )}

              {/* 취소 요청을 한 경우 */}
              {item.appointment_status === 'confirmed' &&
                item.user_cancellation_status === 'cancellation-request' && (
                  <Text style={styles.grayLabel}>취소 요청 중</Text>
                )}
              {item.user_cancellation_status === 'cancellation-pending' && (
                <Text style={styles.pinkLabel}>취소 요청 응답 필요</Text>
              )}

              {/* 이행된 경우 */}
              {item.appointment_status === 'fulfilled' &&
                (item.certification_status ? (
                  <Text style={styles.pinkLabel}>인증 성공</Text>
                ) : (
                  <Text style={styles.grayLabel}>인증 실패</Text>
                ))}
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
      },
    }),
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  profileImgUrl: {
    width: 36,
    height: 36,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  basicProfileWrapper: {
    width: 36,
    height: 36,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  basicProfile: {width: '100%', height: '100%'},
  marginLeftMinus: {
    marginLeft: -8,
  },
  svg: {
    width: 20,
    height: 20,
    padding: 8,
  },
  friendsTagContiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 8,
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
  moreWrapper: {
    width: 48,
    height: 48,
    alignItems: 'center',
  },
});

export default AppointmentItem;
