import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {commonStyle, color_ef, color_primary} from '@/styles/common';
import AppointmentItem from '@/components/home/AppointmentItem';
import EmptyResult from '@/components/common/EmptyResult';
import Profile from '@/components/home/Profile';
import TabBar from '@/components/common/TabBar';
import PulsSvg from '@/assets/icons/plus.svg';
import ButtonBottomSheet from '@/components/common/ButtonBottomSheet';
import useHomeAppointments from '@/hooks/useHomeAppointments';

const Home = () => {
  const {
    categories,
    appointments,
    sort,
    changeSort,
    goAppointmentForm,
    onPressMore,
    onPressFix,
    createButtonList,
    bottomSheetShow,
    setBottomSheetShow,
  } = useHomeAppointments();

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
