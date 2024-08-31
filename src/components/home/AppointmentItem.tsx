import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '@/types/Router';
import {commonStyle, color_primary, color_ef} from '@/styles/common';
import FlatItemsFriends from '../common/FlatItemsFriends';
import MoreSvg from '@/assets/icons/more.svg';
import PinSvg from '@/assets/icons/pin.svg';
import PendingSvg from '@/assets/icons/pending.svg';
import CancelCalendarSvg from '@/assets/icons/cancelCalendar.svg';
import {AppointmentProps} from '@/types/appointment';

const AppointmentItem = ({
  item,
  onPressMore,
}: {
  item: AppointmentProps;
  onPressMore: () => void;
}) => {
  const navigation = useNavigation<StackNavigation>();
  const cancelStatus = ['cancelled', 'expired'];
  const titleFontColor = cancelStatus.includes(item.appointment_status)
    ? commonStyle.MEDIUM_AA_18
    : commonStyle.MEDIUM_33_18;
  const contentFontColor = cancelStatus.includes(item.appointment_status)
    ? commonStyle.REGULAR_AA_14
    : commonStyle.REGULAR_77_14;

  const notUseFreindsIcon =
    cancelStatus.includes(item.appointment_status) ||
    (item.appointment_status === 'pending' &&
      item.agreement_status === 'pendging');

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('AppointmentDetail', {...item})}>
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
              images={item.appointment_participants_list.map(el => el.url)}
            />
          )}
        </View>

        {/* 모임 타이틀, 핀/상세 아이콘 */}
        <View style={styles.wrapper}>
          <View style={styles.subject}>
            <Text style={titleFontColor}>{item.subject}</Text>
            <View style={styles.svgContainer}>
              {item.pinned && (
                <TouchableOpacity style={styles.svgBtn}>
                  <PinSvg color="#777" style={styles.svg} />
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.svgBtn} onPress={onPressMore}>
                <MoreSvg color="#777" style={styles.svg} />
              </TouchableOpacity>
            </View>
          </View>
          {/* 모임 정보 */}
          <View style={styles.flexRow}>
            <View>
              <Text style={contentFontColor}>
                {item?.place_name || item.address}
              </Text>
              <Text style={contentFontColor}>{`${item.appointment_date}`}</Text>
            </View>

            {item.appointment_id === 1 && (
              <Text style={[styles.timer, commonStyle.REGULAR_PRIMARY_14]}>
                09:59
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
    padding: 6,
  },
  svg: {
    width: 16,
    height: 16,
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
  flexRow: {
    flexDirection: 'row',
  },
  timer: {
    position: 'absolute',
    bottom: 0,
    right: 4,
    borderRadius: 100,
    borderColor: color_primary,
    borderWidth: 1,
    textAlign: 'center',
    height: 24,
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
