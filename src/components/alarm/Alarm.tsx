import {alarmDetail, alarms} from '@/mock/Alarm/Alarm';
import {commonStyle} from '@/styles/common';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Alram, AlarmType} from './type';
import {daysAgo} from '@/utils/date';

const getDesc = ({
  type,
  appointment_title,
  nick_name,
}: {
  type: AlarmType;
  appointment_title?: string;
  nick_name?: string;
}) => {
  switch (type) {
    case 'chargePiggy':
    case 'buyGoods':
      return '이용 내역을 확인 해 보세요!';
    case 'getPiggyGift':
    case 'givePiggyGift':
      return nick_name;
    default:
      return appointment_title;
  }
};

const RenderItem = ({item}: {item: Alram}) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.colorCircle} />
        <Text style={commonStyle.REGULAR_33_16}>{alarmDetail[item.type]}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={commonStyle.REGULAR_33_14}>{getDesc(item)}</Text>
        <Text style={[commonStyle.REGULAR_AA_12, styles.date]}>
          {daysAgo(item.date)}
        </Text>
      </View>
    </View>
  );
};

const Alarm = () => {
  return (
    <View style={{...commonStyle.CONTAINER, marginHorizontal: -16}}>
      <FlatList data={alarms} renderItem={RenderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 8,
    borderColor: '#efefef',
    borderTopWidth: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  colorCircle: {
    borderRadius: 100,
    width: 5,
    height: 5,
    backgroundColor: 'red',
    marginRight: 4,
  },
  textContainer: {
    paddingTop: 6,
    paddingLeft: 12,
  },
  date: {
    paddingTop: 2,
  },
});
export default Alarm;
