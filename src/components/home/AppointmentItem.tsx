import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {commonStyle, color_primary} from '@/styles/common';
import FlatItemsFriends from '../common/FlatItemsFriends';
import MoreSvg from '@/assets/icons/more.svg';
import PinSvg from '@/assets/icons/pin.svg';
import {AppointmentProps} from '@/mock/Home/type';
import Button from '../common/Button';

const AppointmentItem = ({item}: {item: AppointmentProps}) => {
  const titleFontColor = item.isCanceled
    ? commonStyle.MEDIUM_AA_16
    : commonStyle.MEDIUM_33_16;
  const contentFontColor = item.isCanceled
    ? commonStyle.REGULAR_AA_14
    : commonStyle.REGULAR_77_14;
  return (
    <TouchableOpacity style={styles.container}>
      {/* 참석자 프로필 */}
      <View>
        <FlatItemsFriends images={item.friends.map(el => el.url)} />
      </View>

      {/* 모임 타이틀, 핀/상세 아이콘 */}
      <View style={styles.wrapper}>
        <View style={styles.subject}>
          <Text style={titleFontColor}>{item.subject}</Text>
          <View style={styles.svgContainer}>
            {item.isFixed && (
              <TouchableOpacity style={styles.svgBtn}>
                <PinSvg color="#777" style={styles.svg} />
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.svgBtn}>
              <MoreSvg color="#777" style={styles.svg} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 모임 정보 */}
        <View style={styles.contentContainer}>
          <View>
            <Text style={contentFontColor}>{item.location}</Text>
            <Text style={contentFontColor}>{`${item.date} ${item.time}`}</Text>
          </View>

          {item.appointment_id === 1 && (
            <Text style={[styles.timer, commonStyle.REGULAR_PRIMARY_14]}>
              09:59
            </Text>
          )}
        </View>

        {/* 취소 도장 */}
        {item.isCanceled && (
          <View style={styles.cancelStapmp}>
            <Text style={commonStyle.BOLD_PRIMARY_18}>취소</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    paddingRight: 12,
    flex: 1,
    marginLeft: -8,
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
  contentContainer: {
    flexDirection: 'row',
  },
  cancelStapmp: {
    position: 'absolute',
    top: 16,
    right: 120,
    width: 100,
    height: 40,
    borderRadius: 10,
    borderColor: color_primary,
    borderWidth: 3,
    transform: [{rotate: '-20deg'}],
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default AppointmentItem;
