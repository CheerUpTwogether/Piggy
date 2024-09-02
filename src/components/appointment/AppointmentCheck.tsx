import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {commonStyle} from '@/styles/common';
import {FriendsProps} from '@/pages/home/type';

import LocationSvg from '@/assets/icons/location.svg';
import DateSvg from '@/assets/icons/calendar.svg';
import TimeSvg from '@/assets/icons/clock.svg';
import PeopleSvg from '@/assets/icons/people.svg';
import BasicProfileSvg from '@/assets/icons/basicProfile.svg';
import CoinSvg from '@/assets/icons/coin.svg';
import {useAppointmentForm} from '@/store/store';
import {changeDateText} from '@/utils/timePicker';

const AppointmentCheck = () => {
  const {appointmentForm} = useAppointmentForm();
  const totalAmount =
    Number(appointmentForm.deal_piggy_count) *
    ((appointmentForm?.appointment_participants_list?.length || 0) + 1);

  const renderItem = ({item}: {item: FriendsProps}) => (
    <View style={styles.friendWrapper}>
      {item.url ? (
        <Image
          source={{uri: item.url}}
          style={styles.profile}
          alt={`${item.nick_name}프로필사진`}
        />
      ) : (
        <View style={styles.profileWrapper}>
          <BasicProfileSvg width={22} height={22} color={'#999'} />
        </View>
      )}
      <Text
        style={[commonStyle.REGULAR_33_12, styles.nickName]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {item.nickname}
      </Text>
    </View>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.HeaderWrapper}>
        <Text style={commonStyle.BOLD_33_24}>{appointmentForm.subject}</Text>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.row}>
          <View style={styles.rowTitle}>
            <LocationSvg width={20} height={20} color={'#AAA'} />
            <Text style={commonStyle.MEDIUM_33_16}>장소</Text>
          </View>
          <Text style={commonStyle.BOLD_33_16}>
            {appointmentForm.place_name || appointmentForm.address}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.rowTitle}>
            <DateSvg width={20} height={20} color={'#AAA'} />
            <Text style={commonStyle.MEDIUM_33_16}>날짜</Text>
          </View>
          <Text style={commonStyle.BOLD_33_16}>
            {String(appointmentForm.date)}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.rowTitle}>
            <TimeSvg width={20} height={20} color={'#AAA'} />
            <Text style={commonStyle.MEDIUM_33_16}>시간</Text>
          </View>
          <Text style={commonStyle.BOLD_PRIMARY_16}>
            {`${changeDateText(
              appointmentForm.time.getHours(),
            )} : ${changeDateText(appointmentForm.time.getMinutes())}`}
          </Text>
        </View>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.row}>
          <View style={styles.rowTitle}>
            <PeopleSvg width={20} height={20} color={'#333'} />
            <Text style={commonStyle.BOLD_33_16}>함께하는 사람들</Text>
          </View>
        </View>
        <FlatList
          keyExtractor={item => String(item.uuid)}
          renderItem={renderItem}
          data={appointmentForm.appointment_participants_list}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.lastWrapper}>
        <View style={styles.row}>
          <View style={styles.rowTitle}>
            <CoinSvg width={20} height={20} color={'#333'} />
            <Text style={commonStyle.BOLD_33_16}>벌금 사용</Text>
          </View>
        </View>
        <View style={styles.penaltyRow}>
          <Text style={commonStyle.REGULAR_33_16}>벌칙금</Text>
          <View style={styles.penalty}>
            <Text style={commonStyle.REGULAR_33_16}>
              {appointmentForm.deal_piggy_count}
            </Text>
            <Text style={commonStyle.REGULAR_PRIMARY_16}>Piggy</Text>
          </View>
        </View>
        <View style={styles.penaltyRow}>
          <Text style={commonStyle.REGULAR_33_16}>모집 인원</Text>
          <View style={styles.penalty}>
            <Text style={commonStyle.REGULAR_33_16}>
              {(appointmentForm?.appointment_participants_list?.length || 0) +
                1}
            </Text>
            <Text style={commonStyle.REGULAR_33_16}>명</Text>
          </View>
        </View>
        <View style={styles.totalWrapper}>
          <Text style={commonStyle.MEDIUM_33_20}>총합</Text>
          <Text style={commonStyle.MEDIUM_PRIMARY_20}>
            {totalAmount.toLocaleString()} Piggy
          </Text>
        </View>
        <Text style={[commonStyle.REGULAR_AA_14, {marginTop: 20}]}>
          약속 시간까지 지정 장소에서 인증하지 않은 사람을 제외한 모두에게 같은
          비율로 나눠드립니다.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  HeaderWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  wrapper: {
    paddingVertical: 36,
    paddingHorizontal: 6,
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  lastWrapper: {paddingVertical: 36, paddingHorizontal: 6, gap: 20},
  row: {flexDirection: 'row', alignItems: 'center', gap: 20},
  rowTitle: {gap: 8, flexDirection: 'row', alignItems: 'center'},
  svg: {width: 14, height: 14, color: '#AAA'},
  friendWrapper: {
    marginRight: 14,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileWrapper: {
    width: 46,
    height: 46,
    objectFit: 'cover',
    borderColor: '#AAA',
    borderWidth: 0.5,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    width: 46,
    height: 46,
    borderRadius: 30,
  },
  nickName: {
    textAlign: 'center',
    marginTop: 6,
    width: 42,
  },
  penaltyRow: {flexDirection: 'row', gap: 20, alignItems: 'center'},
  penalty: {flexDirection: 'row', gap: 4, alignItems: 'center'},
  totalWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 20,
  },
});

export default AppointmentCheck;
