import React from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import InputBox from '@/components/common/InputBox';
import EmptyResult from '@/components/common/EmptyResult';
import FreindsItem from '@/components/appointment/FriendsItem';
import SelectFriendItem from './SelectFriendItem';
import RoundHandShakeSvg from '@/assets/icons/roundHandshake.svg';
import SearchFriendSvg from '@/assets/icons/searchFriend.svg';
import useAppointmentFriend from '@/hooks/useAppointmentFriend';

const {height: screenHeight} = Dimensions.get('screen');

const AppointmentFriend = () => {
  const {
    users,
    changeTitle,
    keyword,
    setKeyword,
    handleFriendPress,
    handleFriendDelete,
    selectedFriends,
    appointmentForm,
  } = useAppointmentFriend();

  return (
    <View>
      {/* 제목 */}
      <InputBox
        value={appointmentForm.subject}
        setValue={changeTitle}
        placeholder="약속 제목을 입력해주세요."
        label="약속 제목"
        icon={RoundHandShakeSvg}
      />

      {/* 친구 검색 Input */}
      <InputBox
        value={keyword}
        setValue={setKeyword}
        placeholder="함께할 친구를 찾아보세요"
        label="함께할 친구"
        icon={SearchFriendSvg}
        style={{marginTop: 8, gap: 8}}
      />

      {/* 선택한 친구 */}
      <FlatList
        data={selectedFriends}
        horizontal
        renderItem={({item}) => (
          <SelectFriendItem
            handleFriendDelete={handleFriendDelete}
            item={item}
          />
        )}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.firendSelectContainer}
      />

      {/* 친구 검색 결과 리스트 */}
      <FlatList
        style={{height: screenHeight * 0.37, marginTop: 12}}
        data={users}
        renderItem={({item}) => (
          <FreindsItem
            handleFriendPress={handleFriendPress}
            item={item}
            selectedFriends={selectedFriends}
          />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyResult
            reason="검색 결과가 없어요."
            solution="올바른 닉네임을 검색해보세요."
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  firendSelectContainer: {
    marginHorizontal: 8,
  },
  firendSelectWrapper: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
});

export default AppointmentFriend;
