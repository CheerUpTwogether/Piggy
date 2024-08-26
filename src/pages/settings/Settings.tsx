import ToggleButton from '@/components/common/ToggleButton';
import {dummy_friends_data, dummy_profile} from '@/mock/Friends/Friends';
import {commonStyle} from '@/styles/common';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@/types/Router';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useUserStore} from '@/store/store';
import {getGifticon} from '@/api/kakao/gift';

const Settings = () => {
  const [isOn, setIsOn] = useState(false);
  const {setGotoProfile} = useUserStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  const handlegift = async () => {
    try {
      const res = await getGifticon(
        'aFdWWThTZ3N3NHBZbG04aGtPdVczNHJ2RnRSNEt3WDBDRW5XUU8xY1l1YVZoemt3NG04bmRFUHZpUGlTVWNDNQ',
        '010-9156-2464',
      );
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setGotoProfile(gotoProfile);
  }, []);

  const gotoProfile = () => {
    navigation.navigate('EditProfile', {...dummy_profile});
  };
  return (
    <View style={commonStyle.CONTAINER}>
      <TouchableOpacity onPress={() => handlegift()}>
        <Text>배고파</Text>
      </TouchableOpacity>
      <Text> . </Text>
      <TouchableOpacity onPress={() => handlegift()}>
        <Text>배고2</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', gap: 18, alignItems: 'center'}}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => gotoProfile()}>
          <Image
            source={{uri: dummy_profile.profile_image_path}}
            style={{width: 80, height: 80, borderRadius: 80}}
          />
        </TouchableOpacity>

        <View>
          <Text style={commonStyle.MEDIUM_33_20}>
            {dummy_profile.nick_name}
          </Text>
          <Text style={commonStyle.REGULAR_AA_14}>{dummy_profile.email}</Text>
        </View>
      </View>

      <View style={styles.dashBoardContainer}>
        <View
          style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={commonStyle.REGULAR_33_14}>친구</Text>
          <Text style={commonStyle.MEDIUM_33_16}>
            {dummy_friends_data.length}
          </Text>
        </View>
        <View
          style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={commonStyle.REGULAR_33_14}>전체 약속</Text>
          <Text style={commonStyle.MEDIUM_33_16}>
            {dummy_profile.total_appointments}
          </Text>
        </View>
        <View
          style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={commonStyle.REGULAR_33_14}>이행 횟수</Text>
          <Text style={commonStyle.MEDIUM_33_16}>
            {dummy_profile.completed_appointments}
          </Text>
        </View>
      </View>

      <View style={{gap: 28}}>
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
            onPress={() => navigation.navigate('HelpDesk')}>
            <Text style={commonStyle.MEDIUM_33_16}>문의하기</Text>
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

        <View style={{gap: 16}}>
          <Text style={commonStyle.MEDIUM_AA_14}>알림 센터</Text>
          <View style={styles.alertContainer}>
            <Text style={commonStyle.MEDIUM_33_16}>알림설정</Text>
            <ToggleButton initialState={isOn} onToggle={handleToggle} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dashBoardContainer: {
    flexDirection: 'row',
    height: 90,
    marginTop: 26,
    marginLeft: -16,
    marginRight: -16,
    marginBottom: 30,
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
});

export default Settings;
