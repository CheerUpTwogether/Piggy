import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {AppointmentProps} from '@/mock/Home/type';
import {useRoute} from '@react-navigation/native';
import {color_ef, commonStyle} from '@/styles/common';
import FlatItemsFriends from '@/components/common/FlatItemsFriends';
import Button from '@/components/common/Button';
import SideSlideModal from '@/components/common/SideSlideModal';
import ProfileSvg from '@/assets/icons/basicProfile.svg';
import LocationSvg from '@/assets/icons/location.svg';
import DateSvg from '@/assets/icons/calendar.svg';
import TimeSvg from '@/assets/icons/clock.svg';
import CoinSvg from '@/assets/icons/coin.svg';

const Friends = ({item}) => {
  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', padding: 8, gap: 8}}>
      {item?.url ? (
        <Image
          source={{uri: item.url}}
          width={48}
          height={48}
          style={{borderRadius: 100, borderColor: color_ef, borderWidth: 1}}
        />
      ) : (
        <View style={styles.profile}>
          <ProfileSvg width={28} height={28} />
        </View>
      )}
      <Text style={commonStyle.MEDIUM_33_16}>{item.nick_name}</Text>
    </View>
  );
};

const AppointmentDetail = () => {
  const route = useRoute();
  const [isShow, setIsShow] = useState(false);
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
              <LocationSvg color="#777" style={styles.svg} />
              <Text style={commonStyle.REGULAR_33_16}>{item.location}</Text>
            </View>
            <View style={styles.infoSentence}>
              <DateSvg color="#777" style={styles.svg} />
              <Text style={commonStyle.REGULAR_33_16}>{item.date}</Text>
            </View>
            <View style={styles.infoSentence}>
              <TimeSvg color="#777" style={styles.svg} />
              <Text style={commonStyle.REGULAR_33_16}>{item.time}</Text>
            </View>
            <View style={styles.infoSentence}>
              <CoinSvg color="#777" style={styles.svg} />
              <Text style={[commonStyle.BOLD_33_16, styles.mr4]}>
                {item.penalty}
              </Text>
              <Text style={commonStyle.BOLD_PRIMARY_16}>PIGGY</Text>
            </View>
          </View>
          <View style={styles.friends}>
            <TouchableOpacity
              onPress={() => {
                setIsShow(true);
              }}>
              <FlatItemsFriends images={item.friends.map(el => el.url)} />
            </TouchableOpacity>
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

      <SideSlideModal isShow={isShow} setIsShow={setIsShow}>
        <FlatList
          data={item.friends}
          keyExtractor={item => String(item.uid)}
          renderItem={Friends}
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
  profile: {
    width: 48,
    height: 48,
    borderRadius: 100,
    borderColor: '#EFEFEF',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
