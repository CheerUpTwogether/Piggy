import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {color_ef, commonStyle} from '@/styles/common';
import {PiggyUsageHistoryProps} from '@/types/gift';
import ProfileSvg from '@/assets/icons/basicProfile.svg';

const PiggyUsageItem = ({item}: {item: PiggyUsageHistoryProps}) => {
  const getShortTitle = (title?: string) => {
    return title && title.length > 9 ? `${title.slice(0, 10)}...` : title || '';
  };
  const title = () => {
    switch (item.changed_category) {
      case '선물줌':
      case '선물받음':
        return item.contents?.f1;
      case '벌금(+)':
        return `${getShortTitle(item.contents?.f1)} 획득`;
      case '벌금(-)':
        return `${getShortTitle(item.contents?.f1)} 벌금`;
      case '약속생성을 위한 선 지급':
        return `${getShortTitle(item.contents?.f1)}`;
      case '약속이 생성되지 않음 - 반환':
        return `${getShortTitle(item.contents?.f1)} 취소`;
      default:
        return '상점 구매';
    }
  };

  const uri =
    item?.changed_category === '선물줌' || item?.changed_category === '선물받음'
      ? item.contents?.f2
      : '';

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}년 ${month}월 ${day}일  ${hours}:${minutes}`;
  };

  return (
    <View style={{...styles.container}}>
      {/* 이미지 */}
      <View style={{flexDirection: 'row'}}>
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
                alt="freindsProfile"
              />
            ) : (
              <ProfileSvg style={styles.img} width={28} height={28} />
            )
          ) : (
            <Image
              source={require('@/assets/icons/topLogo.png')}
              style={styles.img}
              alt="topLogo"
            />
          )}
        </View>

        {/* 사용 내역 */}
        <View>
          <Text style={commonStyle.MEDIUM_33_16}>{title()}</Text>
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
  imgArea: {
    width: 52,
    height: 52,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color_ef,
    borderWidth: 1,
    marginRight: 8,
  },
  img: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  piggy: {
    textAlign: 'right',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
});

export default PiggyUsageItem;
