import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {commonStyle, color_ef, color_primary} from '@/styles/common';
import {StackNavigation} from '@/types/Router';
import {appointments} from '@/mock/Home/Home';
import {getAppointmentsSpb} from '@/supabase/appointmentSpb';
import {useFocusEffect} from '@react-navigation/native';
import {useToastStore} from '@/store/store';
import {useButtonBottomSheet} from '@/hooks/useButtonBottomSheet';
import {AppointmentStatus} from '@/types/appointment';

import AppointmentItem from '@/components/home/AppointmentItem';
import EmptyResult from '@/components/common/EmptyResult';
import Profile from '@/components/home/Profile';
import TabBar from '@/components/common/TabBar';
import PulsSvg from '@/assets/icons/plus.svg';
import ButtonBottomSheet from '@/components/common/ButtonBottomSheet';

const categories: {
  label: string;
  value: 'confirmed' | 'complete' | 'pending';
  status: AppointmentStatus[];
}[] = [
  {label: '대기', value: 'pending', status: ['pending']},
  {
    label: '확정',
    value: 'confirmed',
    status: [
      'confirmed',
      'cancellation-request',
      'cancellation-confirmed',
      'cancellation-rejected',
      'cancellation-pending',
    ],
  },
  {
    label: '완료',
    value: 'complete',
    status: ['fulfilled', 'cancelled', 'expired'],
  },
];

const Home = () => {
  const [sort, setSort] = useState(categories[0].value);
  const {createButtonList, bottomSheetShow, setBottomSheetShow} =
    useButtonBottomSheet();
  const addToast = useToastStore(state => state.addToast);
  const navigation = useNavigation<StackNavigation>();

  useFocusEffect(
    React.useCallback(() => {
      getAppointment();
    }, []),
  );

  const handleMoveToAppointment = () => {
    navigation.navigate('AppointmentForm');
  };

  const sortData = () => {
    if (sort === 'pending') {
      return appointments.filter(el => el.appointment_status === 'pending');
    } else if (sort === 'confirmed') {
      return appointments.filter(el =>
        categories[1].status.includes(el.appointment_status),
      );
    } else {
      return appointments.filter(el =>
        categories[2].status.includes(el.appointment_status),
      );
    }
  };

  const getAppointment = async () => {
    const {data, error} = await getAppointmentsSpb(
      '1238b9f1998-084e-447f-b586-d18c72cf1db4123',
      [],
    );
    if (error) {
      addToast({
        success: false,
        text: 'Error',
        multiText: error.message,
      });
      console.log(error.message);
      console.log('==============');
      console.log(error);
      return;
    }
    console.log(data);
  };

  return (
    <View style={commonStyle.CONTAINER}>
      {/* 사용자 프로필 */}
      <Profile />

      {/* 약속 정렬 탭 */}
      <View style={styles.tab}>
        <TabBar categories={categories} active={sort} onChange={setSort} />
      </View>

      {/* 약속 리스트 */}
      {sortData().length ? (
        <FlatList
          data={sortData()}
          keyExtractor={item => String(item.appointment_id)}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AppointmentDetail', {...item})
              }>
              <AppointmentItem
                item={item}
                onPressMore={() => setBottomSheetShow(true)}
              />
            </TouchableOpacity>
          )}
          style={{marginHorizontal: -16}}
        />
      ) : (
        <View style={{flex: 1, paddingTop: 40}}>
          <EmptyResult
            reason={'아직 약속이 없어요'}
            solution={'친구들과의 약속을 등록해보세요!'}
          />
        </View>
      )}

      {/* 약속 추가 버튼 */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.plusBtn}
        onPress={handleMoveToAppointment}>
        <PulsSvg color="#FFF" />
      </TouchableOpacity>

      <ButtonBottomSheet
        isShow={bottomSheetShow}
        setIsShow={setBottomSheetShow}
        buttons={createButtonList()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
