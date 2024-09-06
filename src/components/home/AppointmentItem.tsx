import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '@/types/Router';
import {commonStyle, color_primary, color_ef} from '@/styles/common';
import {AppointmentProps} from '@/types/appointment';
import useAppointmentTimer from '@/hooks/useAppointmentTimer';
import FlatItemsFriends from '../common/FlatItemsFriends';
import MoreSvg from '@/assets/icons/more.svg';
import PinSvg from '@/assets/icons/pin.svg';
import PendingSvg from '@/assets/icons/pending.svg';
import CancelCalendarSvg from '@/assets/icons/cancelCalendar.svg';
import LocationSvg from '@/assets/icons/location.svg';
import TimeSvg from '@/assets/icons/clock.svg';
import {useAppointmentForm} from '@/store/store';
import dayjs from 'dayjs';

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
  const cancelStatus = ['cancelled', 'expired'];
  // useAppointmentTimer 타이머 훅 호출
  const {remainingTime, formattedTime} = useAppointmentTimer(
    item.appointment_date,
  );

  // 10분 타이머를 표시할지 결정
  const shouldShowTimer =
    item.agreement_status === 'confirmed' &&
    remainingTime !== null &&
    remainingTime > 0;

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
    });
    navigation.navigate('AppointmentDetail');
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.contentContainer}>
        {/* 참석자 프로필 */}
        <View style={styles.iconContainer}>
          {notUseFreindsIcon && (
            <View style={styles.iconBg}>
              {item.appointment_status === 'pending' && <PendingSvg />}
              {cancelStatus.includes(item.appointment_status) && (
                <CancelCalendarSvg color={'#fff'} />
              )}
            </View>
          )}
          {!notUseFreindsIcon && (
            <FlatItemsFriends
              images={item.appointment_participants_list.map(
                el => el.profile_img_url,
              )}
            />
          )}
        </View>

        {/* 모임 타이틀, 핀/상세 아이콘 */}
        <View style={styles.wrapper}>
          <View style={styles.subject}>
            <Text style={titleFontColor}>{item.subject}</Text>
            <View style={styles.svgContainer}>
              {/* 핀 아이콘 */}
              {item.pinned && (
                <TouchableOpacity
                  style={styles.svgBtn}
                  onPress={() => onPressFix(item.appointment_id)}>
                  <PinSvg color="#777" style={styles.svg} />
                </TouchableOpacity>
              )}
              {/* 더보기 아이콘 */}
              <TouchableOpacity
                style={styles.svgBtn}
                onPress={() => onPressMore(item)}>
                <MoreSvg color="#777" style={styles.svg} />
              </TouchableOpacity>
            </View>
          </View>

          {/* 모임 정보 */}
          <View style={{...styles.flexRow, paddingTop: 4}}>
            {/* 위치 정보 */}
            <View>
              <View style={styles.flexRow}>
                <LocationSvg
                  width={12}
                  height={12}
                  color={'#777'}
                  style={{marginRight: 2}}
                />
                <Text style={{marginRight: 8, ...commonStyle.REGULAR_77_14}}>
                  장소
                </Text>
                <Text style={contentFontColor}>
                  {item?.place_name || item.address}
                </Text>
              </View>

              {/* 시간 정보 */}
              <View style={styles.flexRow}>
                <TimeSvg
                  width={12}
                  height={12}
                  color={'#777'}
                  style={{marginRight: 2}}
                />
                <Text style={{marginRight: 8, ...commonStyle.REGULAR_77_14}}>
                  시간
                </Text>
                <Text style={contentFontColor}>
                  {`${item.appointment_date.split('T')[0]} `}
                  {item.appointment_date.split('T')[1].substring(0, 5)}
                </Text>
              </View>
            </View>

            {/* TODO: 인증 상태 확인 후 색상 변경 */}
            {/* 타이머 */}
            {shouldShowTimer && (
              <Text style={[styles.timer, commonStyle.BOLD_PRIMARY_14]}>
                {formattedTime}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  wrapper: {
    paddingRight: 12,
    flex: 1,
  },
  iconContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBg: {
    backgroundColor: '#777',
    width: 64,
    height: 64,
    borderRadius: 100,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subject: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  svgContainer: {
    flexDirection: 'row',
  },
  svgBtn: {
    paddingHorizontal: 6,
    marginBottom: 8,
  },
  svg: {
    width: 16,
    height: 16,
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightBottomButton: {},
  timer: {
    position: 'absolute',
    borderColor: color_primary,
    borderWidth: 2,
    bottom: 0,
    right: 4,
    borderRadius: 100,
    textAlign: 'center',
    height: 30,
    width: 64,
    textAlignVertical: 'center',
  },
  hiddenBtnContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    height: '100%',
  },
  deleteBtnContainer: {
    position: 'absolute',
    width: 100,
    backgroundColor: color_primary,
    textAlign: 'center',
    justifyContent: 'center',
    left: 100,
    height: '100%',
  },
  pinBtnContainer: {
    position: 'absolute',
    width: 100,
    backgroundColor: color_ef,
    textAlign: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  textCenter: {
    textAlign: 'center',
  },
});

export default AppointmentItem;
