import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {commonStyle, color_ef, color_primary} from '@/styles/common';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/Router';
import {appointments} from '@/mock/Home/Home';
import AppointmentItem from '@/components/home/AppointmentItem';
import EmptyResult from '@/components/common/EmptyResult';
import Profile from '@/components/home/Profile';
import TabBar from '@/components/common/TabBar';
import PulsSvg from '@/assets/icons/plus.svg';
import ButtonBottomSheet from '@/components/common/ButtonBottomSheet';

const Home = () => {
  const categories = [
    {label: '대기', value: 'pending'},
    {label: '확정', value: 'confirmed'},
    {label: '완료', value: 'complete'},
  ];
  const [bottomSheetShow, setBottomSheetShow] = useState(false);
  const [sort, setSort] = useState(categories[0].value);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleMoveToAppointment = () => {
    navigation.navigate('AppointmentForm');
  };

  const sortData = () => {
    if (sort === 'pending') {
      return appointments.filter(el => el.appointment_status === 'pending');
    } else if (sort === 'confirmed') {
      const appointment_status = [
        'confirmed',
        'cancellation-request',
        'cancellation-confirmed',
        'cancellation-rejected',
        'cancellation-pending',
      ];
      return appointments.filter(el =>
        appointment_status.includes(el.appointment_status),
      );
    } else {
      const appointment_status = ['fulfilled', 'cancelled', 'expired'];
      return appointments.filter(el =>
        appointment_status.includes(el.appointment_status),
      );
    }
  };

  // 고정 event
  const handleFixUser = () => {
    console.log('TODO: 유저 고정 api 호출');
    setBottomSheetShow(false);
  };

  // 삭제 envent
  const handleDeleteUser = () => {
    console.log('TODO: 친구 삭제 모달 -> 삭제 api 호출');
    setBottomSheetShow(false);
  };

  // 전달할 버튼 배열
  const createButtonList = () => {
    const buttons: Array<{
      text: string;
      theme?: 'sub' | 'primary' | 'outline' | undefined;
      onPress: () => void | Promise<void>;
    }> = [
      {
        text: '고정',
        onPress: handleFixUser,
        theme: 'outline',
      },
      {
        text: '삭제',
        onPress: handleDeleteUser,
      },
    ];

    return buttons;
  };

  // 더보기 버튼 누를 때
  const onPressMore = () => {
    console.log('test');
    setBottomSheetShow(true);
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
              <AppointmentItem item={item} onPressMore={onPressMore} />
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
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
