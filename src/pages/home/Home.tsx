import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, Platform} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {commonStyle, color_ef, color_primary} from '@/styles/common';
import AppointmentItem from '@/components/home/AppointmentItem';
import EmptyResult from '@/components/common/EmptyResult';
import Profile from '@/components/home/Profile';
import TabBar from '@/components/common/TabBar';
import ButtonBottomSheet from '@/components/common/ButtonBottomSheet';
import useHomeAppointments from '@/hooks/useHomeAppointments';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFcmTokenSpb} from '@/supabase/auth';
import {useModalStore, useToastStore, useUserStore} from '@/store/store';
import messaging from '@react-native-firebase/messaging';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
import PulsSvg from '@/assets/icons/plus.svg';

const Home = () => {
  const {openModal, closeModal} = useModalStore();
  const {addToast} = useToastStore();
  const {userData} = useUserStore();
  const {
    categories,
    appointments,
    sort,
    goAppointmentForm,
    onPressMore,
    onPressFix,
    createButtonList,
    bottomSheetShow,
    setBottomSheetShow,
    changeSort,
  } = useHomeAppointments();

  // 안드로이드 버전 체크 함수
  const isAndroid13OrAbove = () => {
    if (Platform.OS === 'android') {
      const androidVersion = DeviceInfo.getSystemVersion();
      console.log(androidVersion);
      return parseInt(androidVersion, 10) >= 13;
    }
    return false;
  };

  const clickAlarmModal = async () => {
    const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

    if (result === RESULTS.GRANTED) {
      addToast({
        success: true,
        text: '푸시 알림을 활성화하였습니다.',
      });
    } else {
      addToast({
        success: true,
        text: '푸시 알림이 비활성화되었습니다.',
      });
    }
    closeModal();
  };

  const openAlarmModal = () => {
    openModal({
      title: '푸쉬알림을 받아 보시겠어요?',
      content: '앱 종료시에도 약속 관련 중요한 소식을 놓치지 않을 수 있어요!',
      text: '알림받기',
      onPress: () => {
        clickAlarmModal();
      },
      textCancel: '닫기',
    });
  };

  const checkAlarmModal = async () => {
    // 안드로이드 13(API33) 보다 낮은 버전일때
    if (!isAndroid13OrAbove()) {
      return;
    }
    // 안드로이드 13이상부터는 권한 확인 필요
    const device_token = await AsyncStorage.getItem('device_token');
    if (!device_token) {
      const fcmToken = await messaging().getToken();
      await AsyncStorage.setItem('device_token', fcmToken);
      openAlarmModal();
    }

    const {data, error} = await getFcmTokenSpb(userData.id);

    if (error) {
      // 토큰 불러오기 에러
    }

    if (data.length > 0) {
      if (device_token !== data[0].device_token) {
        await AsyncStorage.setItem('device_token', data[0].device_token);
        openAlarmModal();
      }
    }
  };

  useEffect(() => {
    checkAlarmModal();
  }, []);

  return (
    <View style={styles.container}>
      {/* 사용자 프로필 */}
      <Profile />

      {/* 약속 정렬 탭 */}
      <View style={styles.tab}>
        <TabBar categories={categories} active={sort} onChange={changeSort} />
      </View>

      {/* 약속 리스트 */}
      <FlatList
        data={appointments}
        keyExtractor={item => String(item.appointment_id)}
        renderItem={({item}) => (
          <AppointmentItem
            item={item}
            onPressMore={onPressMore}
            onPressFix={onPressFix}
          />
        )}
        style={{marginHorizontal: -16}}
        ListEmptyComponent={
          <View style={{flex: 1, paddingTop: 40}}>
            <EmptyResult
              reason={'아직 약속이 없어요'}
              solution={'친구들과의 약속을 등록해보세요!'}
            />
          </View>
        }
      />

      {/* 약속 추가 버튼 */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.plusBtn}
        onPress={goAppointmentForm}>
        <PulsSvg color="#FFF" />
      </TouchableOpacity>

      {/* 더보기 버튼 클릭 시 나타나는 바텀 시트 */}
      <ButtonBottomSheet
        isShow={bottomSheetShow}
        setIsShow={setBottomSheetShow}
        buttons={createButtonList()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyle.CONTAINER,
    paddingBottom: 0,
  },
  tab: {
    marginTop: 40,
    borderBlockColor: color_ef,
    borderBottomWidth: 1,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  tabBtn: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  deleteButton: {
    width: 100,
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  plusBtn: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 48,
    height: 48,
    backgroundColor: color_primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
