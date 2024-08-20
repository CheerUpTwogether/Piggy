import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {commonStyle, color_primary, color_ef} from '@/styles/common';
import Button from '@/components/common/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppointmentItem from '@/components/home/AppointmentItem';
import {dummy_profile} from '@/mock/Friends/Friends';
import {appointments} from '@/mock/Home/Home';

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
            <Text style={commonStyle.REGULAR_FF_14}>
              {dummy_profile.nick_name}
            </Text>
            <Text style={commonStyle.MEDIUM_FF_20}>
              {dummy_profile.piggy} Piggy
            </Text>
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
