import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types/Router';
import {commonStyle} from '@/styles/common';
import {dummy_friends_data, dummy_profile} from '@/mock/Friends/Friends';
import ToggleButton from '@/components/common/ToggleButton';
import {useUserStore} from '@/store/store';

const Settings = () => {
  const [isOn, setIsOn] = useState(false);
  const {setGotoProfile} = useUserStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const numberStyle =
    Platform.OS === 'ios' ? commonStyle.BOLD_33_18 : commonStyle.BOLD_33_22;

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    setGotoProfile(gotoProfile);
  }, []);

  const gotoProfile = () => {
    navigation.navigate('EditProfile', {...dummy_profile});
  };
  return (
    <View style={commonStyle.CONTAINER}>
      <View style={{flexDirection: 'row', gap: 18, alignItems: 'center'}}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => gotoProfile()}>
          <Image
            source={{uri: dummy_profile.profile_img_url}}
            style={{width: 80, height: 80, borderRadius: 80}}
            alt="profile"
          />
        </TouchableOpacity>

        <View style={{gap: 6}}>
          <Text style={commonStyle.MEDIUM_33_20}>{dummy_profile.nickname}</Text>
          <Text style={commonStyle.REGULAR_AA_16}>{dummy_profile.email}</Text>
        </View>
      </View>

      <View style={styles.dashBoardContainer}>
        <View style={styles.boxWrapper}>
          <Text style={commonStyle.REGULAR_77_14}>친구</Text>
          <Text style={numberStyle}>{dummy_friends_data.length}</Text>
        </View>
        <View style={[styles.boxWrapper, styles.totalAppointment]}>
          <Text style={commonStyle.REGULAR_77_14}>전체 약속</Text>
          <Text style={numberStyle}>{dummy_profile.total_appointment}</Text>
        </View>
        <View style={styles.boxWrapper}>
          <Text style={commonStyle.REGULAR_77_14}>이행 횟수</Text>
          <Text style={numberStyle}>{dummy_profile.completed_appointment}</Text>
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
  boxWrapper: {flexGrow: 1, justifyContent: 'center', alignItems: 'center'},
  totalAppointment: {
    borderColor: '#DDD',
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
});

export default Settings;
