import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import dayjs from 'dayjs';
import {color_ef, commonStyle} from '@/styles/common';
import {PiggyUsageHistoryProps} from '@/types/gift';
import LogoSvg from '@/assets/icons/topLogo.svg';
import AppointmentSvg from '@/assets/icons/appointment.svg';
import CancelSvg from '@/assets/icons/appointmentDelete.svg';
import BarcodeSvg from '@/assets/icons/barcode.svg';
import LocationSuccessSvg from '@/assets/icons/locationSuccess.svg';
import LocationFailureSvg from '@/assets/icons/locationFailure.svg';
const basicProfile = require('@/assets/images/basicProfile.png');

const PiggyUsageItem = ({item}: {item: PiggyUsageHistoryProps}) => {
  const getShortTitle = (title?: string) => {
    return title && title.length > 9 ? `${title.slice(0, 16)}...` : title || '';
  };

  const explain = () => {
    switch (item.changed_category) {
      case '가입':
        return {
          title: `${item.contents?.f1}`,
          img: <LogoSvg width={42} height={42} color={'#333'} />,
        };
      case '선물줌':
        return {title: `${item.contents?.f1}님에게 선물`};
      case '선물받음':
        return {title: `${item.contents?.f1}님의 선물`};
      case '벌금(+)':
        return {
          title: `${getShortTitle(item.contents?.f1)}`,
          imgText: '약속성공',
          img: <LocationSuccessSvg width={24} height={24} color={'#333'} />,
        };
      case '벌금(-)':
        return {
          title: `${getShortTitle(item.contents?.f1)}`,
          imgText: '벌금',
          img: <LocationFailureSvg width={24} height={24} color={'#333'} />,
        };
      case '약속생성을 위한 선 지급':
        return {
          title: `${getShortTitle(item.contents?.f1)}`,
          imgText: '보증금',
          img: <AppointmentSvg width={24} height={24} color={'#333'} />,
        };
      case '약속이 생성되지 않음 - 반환':
        return {
          title: `${getShortTitle(item.contents?.f1)}`,
          imgText: '약속취소',
          img: <CancelSvg width={24} height={24} color={'#333'} />,
        };
      case '구매':
        return {
          title: `${item.contents?.f3}`,
          imgText: '상점 구매',
          img: <BarcodeSvg width={24} height={24} color={'#333'} />,
        };
      default:
        return {
          title: '알수없음',
          img: <LogoSvg width={48} height={48} color={'#333'} />,
        };
    }
  };

  const uri =
    item?.changed_category === '선물줌' || item?.changed_category === '선물받음'
      ? item.contents?.f2
      : '';

  const formatDate = (dateString: string): string => {
    return dayjs(dateString).format('YYYY년 MM월 DD일 HH:mm');
  };

  const explanation = explain();

  return (
    <View style={styles.container}>
      {/* 이미지 */}
      <View style={styles.wrapper}>
        <View
          style={{
            ...styles.imgArea,
            borderColor: color_ef,
          }}>
          {item?.changed_category === '선물줌' ||
          item?.changed_category === '선물받음' ? (
            uri ? (
              <Image
                source={{uri: uri}}
                style={styles.img}
                resizeMode="cover"
                alt="friendsProfile"
              />
            ) : (
              <View style={styles.basicProfileWrapper}>
                <Image source={basicProfile} style={styles.basicProfile} />
              </View>
            )
          ) : (
            <View style={styles.imgWrapper}>
              {explanation.img}
              {explanation.imgText && (
                <Text style={commonStyle.MEDIUM_33_12}>
                  {explanation.imgText}
                </Text>
              )}
            </View>
          )}
        </View>

        {/* 사용 내역 */}
        <View style={{gap: 2}}>
          <Text style={commonStyle.MEDIUM_33_16}>{explain().title}</Text>
          <Text>{formatDate(item.diff_piggy_date)}</Text>
        </View>
      </View>

      {/* 사용피기 */}
      <View style={styles.piggy}>
        <Text
          style={
            item.diff_piggy_count < 0
              ? commonStyle.MEDIUM_PRIMARY_18
              : commonStyle.MEDIUM_33_18
          }>
          {new Intl.NumberFormat('ko-KR').format(item.diff_piggy_count)}
        </Text>
        <Text style={commonStyle.REGULAR_77_14}>
          {new Intl.NumberFormat('ko-KR').format(
            item.present_piggy_count + item.diff_piggy_count,
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    justifyContent: 'space-between',
  },
  wrapper: {flexDirection: 'row', alignItems: 'center'},
  imgArea: {
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color_ef,
    borderWidth: 1,
    marginRight: 8,
  },
  img: {
    width: 54,
    height: 54,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  piggy: {
    textAlign: 'right',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  imgWrapper: {gap: 2, alignItems: 'center', justifyContent: 'center'},
  basicProfile: {width: '100%', height: '100%'},
  basicProfileWrapper: {
    width: 54,
    height: 54,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PiggyUsageItem;
