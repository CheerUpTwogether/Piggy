import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AppointmentProps} from '@/mock/Home/type';
import {useRoute} from '@react-navigation/native';
import {commonStyle} from '@/styles/common';
import LocationSvg from '@/assets/icons/location.svg';
import DateSvg from '@/assets/icons/calendar.svg';
import TimeSvg from '@/assets/icons/clock.svg';
import CoinSvg from '@/assets/icons/coin.svg';
import FlatItemsFriends from '@/components/common/FlatItemsFriends';
import Button from '@/components/common/Button';

const AppointmentDetail = () => {
  const route = useRoute();

  const item = route.params as AppointmentProps;

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
              <LocationSvg
                width={16}
                height={16}
                color="#777"
                style={styles.mr8}
              />
              <Text style={commonStyle.REGULAR_33_16}>{item.location}</Text>
            </View>
            <View style={styles.infoSentence}>
              <DateSvg width={16} height={16} color="#777" style={styles.mr8} />
              <Text style={commonStyle.REGULAR_33_16}>{item.date}</Text>
            </View>
            <View style={styles.infoSentence}>
              <TimeSvg width={16} height={16} color="#777" style={styles.mr8} />
              <Text style={commonStyle.REGULAR_33_16}>{item.time}</Text>
            </View>
            <View style={styles.infoSentence}>
              <CoinSvg width={16} height={16} color="#777" style={styles.mr8} />
              <Text style={[commonStyle.BOLD_33_16, styles.mr4]}>
                {item.penalty}
              </Text>
              <Text style={commonStyle.BOLD_PRIMARY_16}>PIGGY</Text>
            </View>
          </View>
          <View style={styles.friends}>
            <FlatItemsFriends images={item.friends.map(el => el.url)} />
          </View>
        </View>
      </View>

      <View style={styles.btnArea}>
        <Button
          onPress={() => {}}
          text={'인증하기'}
          disable={true}
          style={{marginBottom: 8}}
        />
        <Button onPress={() => {}} text={'경로찾기'} theme="outline" />
      </View>
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
    //paddingBottom: 20,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  mr4: {
    marginRight: 4,
  },
  mr8: {
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
