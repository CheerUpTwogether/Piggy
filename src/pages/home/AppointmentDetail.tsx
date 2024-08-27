import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {AppointmentProps} from '@/mock/Home/type';
import {useRoute} from '@react-navigation/native';
import {commonStyle} from '@/styles/common';
import FlatItemsFriends from '@/components/common/FlatItemsFriends';
import Button from '@/components/common/Button';
import SideSlideModal from '@/components/common/SideSlideModal';

import LocationSvg from '@/assets/icons/location.svg';
import DateSvg from '@/assets/icons/calendar.svg';
import TimeSvg from '@/assets/icons/clock.svg';
import CoinSvg from '@/assets/icons/coin.svg';
import FriendItem from '@/components/home/FriendItem';

const AppointmentDetail = () => {
  const route = useRoute();
  const [isShow, setIsShow] = useState(false);
  const item = route.params as AppointmentProps;
  const cancelStatus = ['cancelled', 'expired'];
  const textColor = cancelStatus.includes(item.appointment_status)
    ? commonStyle.REGULAR_AA_16
    : commonStyle.REGULAR_33_16;
  return (
    <View style={commonStyle.CONTAINER}>
      <Image
        style={styles.mapImg}
        source={{
          uri: 'https://www.100news.kr/imgdata/100news_kr/202405/2024050916458352.png',
        }}
      />

      <View style={styles.contentContainer}>
        <Text style={[commonStyle.BOLD_33_20, styles.subject]}>
          {item.subject}
        </Text>
        <View style={styles.contentWrapper}>
          <View>
            <View style={styles.infoSentence}>
              <LocationSvg color="#777" style={styles.svg} />
              <Text style={textColor}>{item.place_name}</Text>
            </View>
            <View style={styles.infoSentence}>
              <DateSvg color="#777" style={styles.svg} />
              <Text style={textColor}>
                {item.appointment_date.split(' ')[0]}
              </Text>
            </View>
            <View style={styles.infoSentence}>
              <TimeSvg color="#777" style={styles.svg} />
              <Text style={textColor}>
                {item.appointment_date.split(' ')[1]}
              </Text>
            </View>
            <View style={styles.infoSentence}>
              <CoinSvg color="#777" style={styles.svg} />
              <Text
                style={[
                  cancelStatus.includes(item.appointment_status)
                    ? commonStyle.BOLD_AA_16
                    : commonStyle.BOLD_PRIMARY_16,
                  styles.mr4,
                ]}>
                {item.deal_piggy_count}
              </Text>
              <Text
                style={
                  cancelStatus.includes(item.appointment_status)
                    ? commonStyle.REGULAR_AA_16
                    : commonStyle.REGULAR_33_16
                }>
                PIGGY
              </Text>
            </View>
          </View>
          <View style={styles.friends}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setIsShow(true);
              }}>
              <FlatItemsFriends
                images={item.appointment_participants_list.map(el => el.url)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.btnArea}>
        <Button
          onPress={() => {}}
          text={'경로찾기'}
          theme="outline"
          style={{marginBottom: 8}}
        />
        <Button onPress={() => {}} text={'인증하기'} disable={true} />
      </View>

      <SideSlideModal isShow={isShow} setIsShow={setIsShow} title="참석자">
        <FlatList
          data={item.appointment_participants_list}
          keyExtractor={item => String(item.uid)}
          renderItem={FriendItem}
        />
      </SideSlideModal>
    </View>
  );
};

const styles = StyleSheet.create({
  mapImg: {
    marginHorizontal: -16,
    height: 320,
    marginTop: -16,
  },
  subject: {
    paddingTop: 8,
    paddingBottom: 12,
  },
  contentContainer: {
    paddingTop: 16,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  mr4: {
    marginRight: 4,
  },
  svg: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  infoSentence: {
    flexDirection: 'row',
    paddingVertical: 4,
    alignItems: 'center',
  },
  friends: {
    alignContent: 'flex-end',
    alignItems: 'flex-end',
  },
  btnArea: {
    position: 'absolute',
    bottom: 32,
    left: 16,
    width: '100%',
  },
});

export default AppointmentDetail;
