import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import {useToastStore} from '@/store/store';
import {useButtonBottomSheet} from '@/hooks/useButtonBottomSheet';
import {StackNavigation} from '@/types/Router';
import {
  AppointmentStatus,
  AppointmentTabCategory,
  AppointmentTabStatus,
} from '@/types/appointment';
import {commonStyle, color_ef, color_primary} from '@/styles/common';
import {getAppointmentsSpb} from '@/supabase/appointmentSpb';
import AppointmentItem from '@/components/home/AppointmentItem';
import EmptyResult from '@/components/common/EmptyResult';
import Profile from '@/components/home/Profile';
import TabBar from '@/components/common/TabBar';
import PulsSvg from '@/assets/icons/plus.svg';
import ButtonBottomSheet from '@/components/common/ButtonBottomSheet';

const categories: AppointmentTabCategory[] = [
  {label: '대기', value: 'pending', status: ['pending']},
  {label: '확정', value: 'confirmed', status: ['confirmed']},
  {
    label: '완료',
    value: 'fulfilled',
    status: ['fulfilled', 'cancelled', 'expired'],
  },
];

const Home = () => {
  const [sort, setSort] = useState<AppointmentTabStatus>(categories[0].value);
  const [appointments, setAppointments] = useState([]);
  const {createButtonList, bottomSheetShow, setBottomSheetShow} =
    useButtonBottomSheet();
  const addToast = useToastStore(state => state.addToast);
  const navigation = useNavigation<StackNavigation>();

  useFocusEffect(
    React.useCallback(() => {
      getAppointment(sort);
    }, []),
  );

  const handleMoveToAppointment = () => {
    navigation.navigate('AppointmentForm');
  };

  const changeSort = (sortValue: AppointmentTabStatus) => {
    setSort(sortValue);
    getAppointment(sortValue);
  };

  const getAppointment = async (sortValue: AppointmentStatus) => {
    const {data, error} = await getAppointmentsSpb(
      '8b9f1998-084e-447f-b586-d18c72cf1db4',
      categories.filter(el => el.value === sortValue)[0].status,
    );
    if (error) {
      addToast({
        success: false,
        text: '약속 정보를 불러오지 못했어요.',
      });
      return;
    }
    console.log(data);
    setAppointments(data);
  };

  return (
    <View style={commonStyle.CONTAINER}>
      {/* 사용자 프로필 */}
      <Profile />

      {/* 약속 정렬 탭 */}
      <View style={styles.tab}>
        <TabBar categories={categories} active={sort} onChange={changeSort} />
      </View>

      {/* 약속 리스트 */}
      {appointments.length ? (
        <FlatList
          data={appointments}
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
