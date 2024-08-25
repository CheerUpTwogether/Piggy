import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {commonStyle} from '@/styles/common';
import {daysAgo} from '@/utils/date';
import {AlarmType, Alram} from '@/mock/Alarm/type';
import {alarmDetail, alarms} from '@/mock/Alarm/Alarm';
import TabBar from '@/components/common/TabBar';
import InviteSvg from '@/assets/icons/appointmentInvite.svg';
import CancelSvg from '@/assets/icons/appointmentDelete.svg';
import CoinSvg from '@/assets/icons/coin.svg';
import DeleteSvg from '@/assets/icons/trash.svg';
import AppointmentSvg from '@/assets/icons/appointment.svg';
import TimeSvg from '@/assets/icons/clock.svg';
import GradeSvg from '@/assets/icons/grade.svg';

const categories = [
  {
    label: '약속',
    value: 'appointment',
  },
  {
    label: '피기',
    value: 'piggy',
  },
  {
    label: '벌금',
    value: 'panalty',
  },
];

const getDesc = ({
  type,
  appointment_title,
  nick_name,
  piggy,
}: {
  type: AlarmType;
  appointment_title?: string;
  nick_name?: string;
  piggy?: number;
}) => {
  switch (type) {
    case 'chargePiggy':
    case 'buyGoods':
      return '이용 내역을 확인해보세요!';
    case 'getPiggyGift':
      return `${nick_name}님이 ${piggy}P를 보내왔어요`;
    case 'givePiggyGift':
      return `${nick_name}님에게 ${piggy}P를 보내줬어요`;
    case 'getPiggyPanalty':
      return `${piggy}P를 획득했어요`;
    case 'givePiggyGift':
      return `${piggy}P를 잃었어요`;
    default:
      return appointment_title;
  }
};

const Icon = ({type}: {type: AlarmType}) => {
  switch (type) {
    case 'getPiggyPanalty':
      return <CoinSvg color="#333" width={20} height={20} />;
    case 'givePiggyPanalty':
      return <CoinSvg color="#aaa" width={20} height={20} />;
    case 'join':
      return <InviteSvg width={20} height={20} color="#333" />;
    case 'cancel_request':
      return <CancelSvg width={20} height={20} color="#333" />;
    case 'delete':
      return <DeleteSvg width={24} height={20} color="#333" />;
    case 'accomplish':
      return <AppointmentSvg width={24} height={20} color="#333" />;
    case 'corner':
      return <TimeSvg width={24} height={20} color="#333" />;
    case 'chargePiggy':
    case 'buyGoods':
    case 'getPiggyGift':
      return <GradeSvg width={24} height={20} color="#333" />;
    default:
      return <GradeSvg width={24} height={20} color="#aaa" />;
  }
};
const renderItem = ({item}: {item: Alram}) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <Icon type={item.type} />
      </View>
      <View>
        <Text style={commonStyle.REGULAR_33_18}>{alarmDetail[item.type]}</Text>
        <Text style={[commonStyle.REGULAR_77_14, styles.desc]}>
          {getDesc(item)}
        </Text>
        <Text style={[commonStyle.REGULAR_AA_12, styles.date]}>
          {daysAgo(item.date)}
        </Text>
      </View>
    </View>
  );
};

const Alarm = () => {
  const [active, setActive] = useState(categories[0].value);
  return (
    <View style={{...commonStyle.CONTAINER, marginHorizontal: -16}}>
      <View style={styles.tabBar}>
        <TabBar categories={categories} active={active} onChange={setActive} />
      </View>
      <FlatList
        data={alarms.filter(el => el.category === active)}
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
});
export default Alarm;
