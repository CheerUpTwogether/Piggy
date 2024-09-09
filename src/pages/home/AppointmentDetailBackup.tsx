import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

import {useNavigation, useRoute} from '@react-navigation/native';
import {color_primary, commonStyle} from '@/styles/common';
import {AppointmentProps} from '@/types/appointment';
import FlatItemsFriends from '@/components/common/FlatItemsFriends';
import Button from '@/components/common/Button';
import SideSlideModal from '@/components/common/SideSlideModal';
import FriendItem from '@/components/home/FriendItem';
import WebView from 'react-native-webview';
import {useLocation} from '@/hooks/useLocation';
import {useUserStore, useToastStore} from '@/store/store';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types/Router';
import CalendarCancelSvg from '@/assets/icons/cancelCalendar.svg';
import LocationSvg from '@/assets/icons/location.svg';
import DateSvg from '@/assets/icons/calendar.svg';
import TimeSvg from '@/assets/icons/clock.svg';
import CoinSvg from '@/assets/icons/coin.svg';
import {getAppointmentParticipantsSpb} from '@/supabase/appointmentSpb';

const AppointmentDetailBackup = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const {userData} = useUserStore();
  const [isShow, setIsShow] = useState(false);
  const [friends, setFriends] = useState([]);
  const item = route.params as AppointmentProps;
  const cancelStatus = ['cancelled', 'expired'];
  const textColor = cancelStatus.includes(item.appointment_status)
    ? commonStyle.REGULAR_AA_16
    : commonStyle.REGULAR_33_16;
  const {location, error} = useLocation();
  let webViewRef = useRef(null);

  const sendPlacePosition = () => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(
        JSON.stringify({
          placeData: {
            latitude: item.latitude,
            longitude: item.longitude,
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

  const addToast = useToastStore(state => state.addToast);
  useEffect(() => {
    if (isShow) {
      getFriends();
    }
  }, [isShow]);

  const getFriends = async () => {
    try {
      const {data, error} = await getAppointmentParticipantsSpb(
        userData.id,
        item.appointment_id,
      );

      if (error) {
        throw error;
      }
      setFriends(data);
    } catch {
      addToast({
        success: false,
        text: '친구들의 정보를 가져오지 못했어요.',
      });
    }
  };

  return (
    <View style={commonStyle.CONTAINER}>
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

      {cancelStatus.includes(item.appointment_status) && (
        <View style={styles.mapWrapper}>
          <CalendarCancelSvg color={color_primary} width={100} height={100} />
        </View>
      )}

      <View style={styles.contentContainer}>
        <Text style={[commonStyle.BOLD_33_20, styles.subject]}>
          {item.subject}
        </Text>
        {item.place_name && (
          <View>
            <View style={styles.infoSentence}>
              <LocationSvg color="#777" style={styles.svg} />
              <Text style={textColor}>{item.place_name}</Text>
            </View>
            <Text style={[textColor, {paddingLeft: 22}]}>{item.address}</Text>
          </View>
        )}
        {!item.place_name && (
          <View style={styles.infoSentence}>
            <LocationSvg color="#777" style={styles.svg} />
            <Text style={textColor}>{item.address}</Text>
          </View>
        )}
        <View style={styles.contentWrapper}>
          <View>
            <View style={styles.infoSentence}>
              <DateSvg color="#777" style={styles.svg} />
              <Text style={textColor}>
                {item.appointment_date.split('T')[0]}
              </Text>
            </View>
            <View style={styles.infoSentence}>
              <TimeSvg color="#777" style={styles.svg} />
              <Text style={textColor}>
                {item.appointment_date.split('T')[1].substring(0, 5)}
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
          onPress={() => {
            navigation.navigate('RedirectKakaoMap', {
              myLatitude: location.latitude,
              myLongitude: location.longitude,
              placeLatitude: item.latitude,
              placeLongitude: item.longitude,
            });
          }}
          text={'경로찾기'}
          theme="outline"
          disable={location ? false : true}
          style={{marginBottom: 8}}
        />

        <Button
          onPress={() => {}}
          text={'인증하기'}
          disable={cancelStatus.includes(item.appointment_status)}
        />
      </View>

      <SideSlideModal isShow={isShow} setIsShow={setIsShow} title="참석자">
        <FlatList
          data={friends}
          keyExtractor={item => item.user_id}
          renderItem={({item}) => <FriendItem item={item} />}
        />
      </SideSlideModal>
    </View>
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
  currentLocationSvg: {
    width: 32,
    height: 32,
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

export default AppointmentDetailBackup;
