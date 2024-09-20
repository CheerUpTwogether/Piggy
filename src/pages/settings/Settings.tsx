import React, {useState, useCallback} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Linking,
  ScrollView,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types/Router';
import {commonStyle} from '@/styles/common';
import {useToastStore, useUserStore} from '@/store/store';
import {getMySettingsSpb} from '@/supabase/SettingSpb';
import {MyProfileData} from '@/types/setting';
import DeviceInfo from 'react-native-device-info';
const basicProfile = require('@/assets/images/basicProfile.png');

const Settings = () => {
  const [myData, setMyData] = useState<MyProfileData | null>(null);
  const {setGotoProfile} = useUserStore();
  const userData = useUserStore(state => state.userData);
  const {addToast} = useToastStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const numberStyle =
    Platform.OS === 'ios' ? commonStyle.BOLD_33_18 : commonStyle.BOLD_33_22;

  useFocusEffect(
    useCallback(() => {
      fetchData();
      setGotoProfile(gotoProfile);
    }, []),
  );

  const handleAlarmSetting = () => {
    if (Platform.OS === 'android') {
      const androidVersion = parseInt(DeviceInfo.getSystemVersion(), 10);
      const packageName = 'com.piggy'; // 안드로이드 패키지 이름

      if (androidVersion >= 8) {
        // Android 8.0 이상이면 앱의 설정으로 이동
        Linking.openSettings().catch(() =>
          addToast({
            success: false,
            text: '설정으로 이동 할 수 없습니다.',
          }),
        );
      } else {
        // Android 8.0 미만이면 시스템 설정 화면으로 이동
        Linking.openURL(`package:${packageName}`).catch(() =>
          addToast({
            success: false,
            text: '설정으로 이동 할 수 없습니다.',
          }),
        );
      }
    } else if (Platform.OS === 'ios') {
      // iOS 설정 화면으로 이동
      Linking.openURL('app-settings:').catch(() =>
        addToast({
          success: false,
          text: '설정으로 이동 할 수 없습니다.',
        }),
      );
    } else {
      addToast({
        success: false,
        text: '알림 설정 이동을 지원하지 않는 플랫폼입니다.',
      });
    }
  };

  const fetchData = async () => {
    try {
      const res = await getMySettingsSpb(userData.id);
      setMyData(res[0] as MyProfileData);
    } catch (error) {
      console.error('Failed to fetch settings data: ', error);
    }
  };

  const gotoProfile = () => {
    navigation.navigate('EditProfile', {...userData});
  };

  return (
    <ScrollView style={[commonStyle.CONTAINER, {paddingVertical: 0}]}>
      <View style={{flexDirection: 'row', gap: 18, alignItems: 'center'}}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => gotoProfile()}>
          {userData.profile_img_url ? (
            <Image
              source={{uri: userData.profile_img_url}}
              style={styles.profileImage}
              alt="profile"
            />
          ) : (
            <View style={styles.basicProfileWrapper}>
              <Image source={basicProfile} style={styles.basicProfile} />
            </View>
          )}
        </TouchableOpacity>

        <View style={{gap: 6}}>
          <Text style={commonStyle.MEDIUM_33_20}>{userData.nickname}</Text>
          <Text style={commonStyle.REGULAR_AA_16}>{userData.email}</Text>
        </View>
      </View>

      <View style={styles.dashBoardContainer}>
        <View style={styles.boxWrapper}>
          <Text style={commonStyle.REGULAR_77_14}>친구</Text>
          <Text style={numberStyle}>{myData?.friend_count ?? 0}</Text>
        </View>
        <View style={[styles.boxWrapper, styles.totalAppointment]}>
          <Text style={commonStyle.REGULAR_77_14}>전체 약속</Text>
          <Text style={numberStyle}>{myData?.total_appointment ?? 0}</Text>
        </View>
        <View style={styles.boxWrapper}>
          <Text style={commonStyle.REGULAR_77_14}>이행 횟수</Text>
          <Text style={numberStyle}>{myData?.completed_appointments ?? 0}</Text>
        </View>
      </View>

      <View style={{gap: 28, marginLeft: 4}}>
        <View style={{gap: 16}}>
          <Text style={commonStyle.MEDIUM_AA_14}>서비스 소식</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('NoticeBoard')}>
            <Text style={commonStyle.MEDIUM_33_16}>공지사항</Text>
          </TouchableOpacity>
        </View>
        <View style={{gap: 16}}>
          <Text style={commonStyle.MEDIUM_AA_14}>고객 센터</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('HelpHistory')}>
            <Text style={commonStyle.MEDIUM_33_16}>1 : 1 문의</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('FAQBoard')}>
            <Text style={commonStyle.MEDIUM_33_16}>FAQ</Text>
          </TouchableOpacity>
        </View>

        <View style={{gap: 16}}>
          <Text style={commonStyle.MEDIUM_AA_14}>이용약관</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ServiceAgreement')}>
            <Text style={commonStyle.MEDIUM_33_16}>서비스</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('PaymentAgreement')}>
            <Text style={commonStyle.MEDIUM_33_16}>결제</Text>
          </TouchableOpacity>
        </View>

        <View style={{gap: 16, marginBottom: 16}}>
          <Text style={commonStyle.MEDIUM_AA_14}>알림 센터</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleAlarmSetting()}>
            <Text style={commonStyle.MEDIUM_33_16}>알림설정</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dashBoardContainer: {
    flexDirection: 'row',
    height: 90,
    marginTop: 26,
    marginLeft: -16,
    marginRight: -16,
    marginBottom: 18,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  alertContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxWrapper: {flexGrow: 1, justifyContent: 'center', alignItems: 'center'},
  totalAppointment: {
    borderColor: '#DDD',
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  profileImageWrapper: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  basicProfileWrapper: {
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  basicProfile: {width: '100%', height: '100%'},
  profileImage: {width: 80, height: 80, borderRadius: 30},
});

export default Settings;
