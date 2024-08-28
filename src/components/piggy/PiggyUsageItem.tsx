import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {color_ef, commonStyle} from '@/styles/common';
import {PiggyUsageHistoryProps} from '@/mock/Piggy/type';
import ProfileSvg from '@/assets/icons/basicProfile.svg';

const PiggyUsageItem = ({item}: {item: PiggyUsageHistoryProps}) => {
  const title = () => {
    switch (item.type) {
      case 'gift':
        return item.nick_name;
      case 'panalty':
        return item.appointment_title;
      default:
        return '충전';
    }
  };

  const uri = item?.type === 'gift' ? item.image_url : '';

  return (
    <View style={{...styles.container}}>
      {/* 이미지 */}
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            ...styles.imgArea,
            borderColor: color_ef,
          }}>
          {item?.type !== 'gift' ? (
            <Image
              source={require('@/assets/icons/topLogo.png')}
              style={styles.img}
              alt="topLogo"
            />
          ) : item.image_url ? (
            <Image
              source={{uri: uri}}
              style={styles.img}
              resizeMode="cover"
              alt="freindsProfile"
            />
          ) : (
            <ProfileSvg style={styles.img} width={28} height={28} />
          )}
        </View>

        {/* 사용 내역 */}
        <View>
          <Text style={commonStyle.MEDIUM_33_16}>{title()}</Text>
          <Text>{`${item.date} ${item.time}`}</Text>
        </View>
      </View>

      {/* 사용피기 */}
      <View style={styles.piggy}>
        <Text style={commonStyle.MEDIUM_PRIMARY_18}>
          {new Intl.NumberFormat('ko-KR').format(item.piggy)}
        </Text>
        <Text style={commonStyle.REGULAR_77_14}>
          {new Intl.NumberFormat('ko-KR').format(item.piggy)}
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
