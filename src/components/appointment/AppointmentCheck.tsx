import React, {useRef} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
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
import WebView from 'react-native-webview';
import {useLocation} from '@/hooks/useLocation';

const AppointmentCheck = ({children}: {children?: React.ReactElement}) => {
  const {appointmentForm} = useAppointmentForm();
  const totalAmount =
    Number(appointmentForm.deal_piggy_count) *
    ((appointmentForm?.appointment_participants_list?.length || 0) + 1);

  const {location, error} = useLocation();
  let webViewRef = useRef(null);

  const sendPlacePosition = () => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(
        JSON.stringify({
          placeData: {
            latitude: appointmentForm.latitude,
            longitude: appointmentForm.longitude,
          },
        }),
      );
    }
  };
  const sendMyMetaData = () => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(
        JSON.stringify({
          myMetaData: {
            nickname: userData.nickname,
            profileImgUrl: userData.profile_img_url,
          },
          myLocationData: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        }),
      );
    }
  };

  const renderItem = ({item}: {item: FriendsProps}) => (
    <View style={styles.friendWrapper}>
      {item.url || item.profile_img_url ? (
        <Image
          source={{uri: item.url || item.profile_img_url}}
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
        {item?.nickname}
      </Text>
    </View>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.HeaderWrapper}>
        <Text style={commonStyle.BOLD_33_24}>{appointmentForm.subject}</Text>
      </View>

      <View style={styles.wrapper}>
        {appointmentForm.id === 0 && (
          <View style={styles.row}>
            <View style={styles.rowTitle}>
              <LocationSvg width={20} height={20} color={'#AAA'} />
              <Text style={commonStyle.MEDIUM_33_16}>장소</Text>
            </View>
            <Text style={commonStyle.BOLD_33_16}>
              {appointmentForm.place_name || appointmentForm.address}
            </Text>
          </View>
        )}
        <View style={styles.row}>
          <View style={styles.rowTitle}>
            <DateSvg width={20} height={20} color={'#AAA'} />
            <Text style={commonStyle.MEDIUM_33_16}>날짜</Text>
          </View>
          <Text style={commonStyle.BOLD_33_16}>{appointmentForm.date}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.rowTitle}>
            <TimeSvg width={20} height={20} color={'#AAA'} />
            <Text style={commonStyle.MEDIUM_33_16}>시간</Text>
          </View>
          <Text style={commonStyle.BOLD_33_16}>
            {` ${appointmentForm?.time}`}
          </Text>
        </View>
      </View>

      {appointmentForm.id !== 0 && (
        <View style={styles.wrapper}>
          <View style={styles.rowTitle}>
            <LocationSvg width={20} height={20} color={'#AAA'} />
            <Text style={commonStyle.BOLD_33_16}>
              {appointmentForm.place_name || appointmentForm.address}
            </Text>
          </View>
          <View style={styles.mapImg}>
            {location && (
              <>
                <WebView
                  ref={webViewRef}
                  originWhitelist={['*']}
                  source={{
                    uri: 'https://www.piggynative.kro.kr:8080/mapHtml',
                  }}
                  onLoadEnd={() => {
                    sendPlacePosition();
                  }}
                  onMessage={event => {
                    const parseData = JSON.parse(event.nativeEvent.data);
                    // switch로 분기처리
                  }}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    sendMyMetaData();
                  }}
                  style={styles.mapCurrentLocationIcon}>
                  <LocationSvg color="#777" width={24} height={24} />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      )}

      <View style={styles.wrapper}>
        <View style={styles.row}>
          <View style={styles.rowTitle}>
            <PeopleSvg width={20} height={20} color={'#333'} />
            <Text style={commonStyle.BOLD_33_16}>함께하는 사람들</Text>
          </View>
        </View>
        <FlatList
          keyExtractor={item => item.nickname}
          renderItem={renderItem}
          data={appointmentForm?.appointment_participants_list}
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
      {children}
    </ScrollView>
  );
};

const WIDTH = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  mapImg: {
    marginHorizontal: -16,
    height: 320,
    marginTop: -16,
  },
  mapCurrentLocationIcon: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#777',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  mapWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    height: 320,
    width: WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
