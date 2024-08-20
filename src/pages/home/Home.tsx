import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {commonStyle, color_primary, color_ef} from '@/styles/common';
import Button from '@/components/common/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppointmentItem from '@/components/home/AppointmentItem';

const userInfo = {
  nickname: '우다우다',
  piggy: 500,
};

const appointments = [
  {
    appointment_id: 1,
    subject: '강남역 리액트 스터디',
    location: '서울 강남구 강남대로84길',
    date: '2024년 8월 31일',
    time: '18시 30분',
    penalty: 10000,
    isFixed: true,
    friends: [
      {
        uid: 1,
        url: 'https://i.pravatar.cc/250',
      },
      {
        uid: 2,
        url: 'https://i.pravatar.cc/250',
      },
      {
        uid: 3,
        url: 'https://i.pravatar.cc/250',
      },
    ],
  },
  {
    appointment_id: 2,
    subject: '또 늦어보지 왜?',
    location: '서울 용산구 한강대로 405',
    date: '2024년 9월 17일',
    time: '07시 30분',
    penalty: 50000,
    isFixed: false,
    friends: [
      {
        uid: 1,
        url: 'https://i.pravatar.cc/250',
      },
      {
        uid: 2,
        url: 'https://i.pravatar.cc/250',
      },
      {
        uid: 3,
        url: 'https://i.pravatar.cc/250',
      },
      {
        uid: 4,
        url: 'https://i.pravatar.cc/250',
      },
      {
        uid: 5,
        url: 'https://i.pravatar.cc/250',
      },
    ],
  },
];

const Home = () => {
  const [sort, setSort] = useState('next');
  const tabText = (value: string) => {
    if (value === sort) {
      return commonStyle.MEDIUM_PRIMARY_16;
    }
    return commonStyle.REGULAR_77_16;
  };

  return (
    <View style={commonStyle.CONTAINER}>
      {/* 사용자 프로필 */}
      <View style={styles.myInfoBox}>
        <View style={styles.flexRow}>
          <Image
            source={{
              uri: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
            }}
            style={styles.profileImg}
          />
          <View>
            <Text style={commonStyle.REGULAR_FF_14}>{userInfo.nickname}</Text>
            <Text style={commonStyle.MEDIUM_FF_20}>{userInfo.piggy} Piggy</Text>
          </View>
        </View>
        <View style={styles.btnArea}>
          <Button
            text="사용내역"
            onPress={() => {}}
            theme="outline"
            size="sm"
          />
          <Button
            text="충전하기"
            onPress={() => {}}
            theme="outline"
            size="sm"
          />
        </View>
      </View>

      {/* 약속 정렬 탭 */}
      <View style={styles.tab}>
        <TouchableOpacity style={styles.tabBtn} onPress={() => setSort('next')}>
          <Text style={tabText('next')}>미래 약속</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => setSort('prev')}>
          <Text style={tabText('prev')}>지난 약속</Text>
        </TouchableOpacity>
      </View>

      {/* 약속 리스트 */}
      <FlatList
        data={appointments}
        keyExtractor={item => String(item.appointment_id)}
        renderItem={AppointmentItem}
        style={{marginHorizontal: -16}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  myInfoBox: {
    borderRadius: 10,
    backgroundColor: color_primary,
    height: 140,
    padding: 16,
  },
  flexRow: {
    flexDirection: 'row',
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 8,
  },
  btnArea: {
    flexDirection: 'row',
    paddingTop: 28,
    justifyContent: 'flex-end',
    gap: 4,
  },
  tab: {
    marginTop: 40,
    flexDirection: 'row',
    borderBlockColor: color_ef,
    borderBottomWidth: 1,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  tabBtn: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
});

export default Home;
