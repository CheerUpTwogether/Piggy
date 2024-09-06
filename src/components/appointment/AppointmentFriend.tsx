import React from 'react';
import {FlatList, Text, View} from 'react-native';
import InputBox from '@/components/common/InputBox';
import EmptyResult from '@/components/common/EmptyResult';
import FreindsItem from '@/components/appointment/FriendsItem';
import SelectFriendItem from './SelectFriendItem';
import RoundHandShakeSvg from '@/assets/icons/roundHandshake.svg';
import SearchFriendSvg from '@/assets/icons/searchFriend.svg';
import useAppointmentFriendHooks from '@/hooks/useAppointmentFriendHooks';
import {commonStyle} from '@/styles/common';

const AppointmentFriend = () => {
  const {
    friends,
    changeTitle,
    keyword,
    setKeyword,
    handleFriendPress,
    handleFriendDelete,
    appointmentForm,
  } = useAppointmentFriendHooks();

  return (
    <View style={{flex: 1}}>
      {/* 제목 */}
      <InputBox
        value={appointmentForm.subject || ''}
        setValue={changeTitle}
        placeholder="약속 제목을 입력해주세요."
        label="약속 제목"
        icon={RoundHandShakeSvg}
        maxLength={15}
        msg={
          appointmentForm.subject?.length >= 15
            ? '* 15자 이내로 입력해주세요'
            : ''
        }
      />

      {/* 친구 검색 Input */}
      <Text style={commonStyle.MEDIUM_33_16}>함께할 친구</Text>
      {/* 선택한 친구 */}
      {appointmentForm.appointment_participants_list.length ? (
        <View style={{height: 100}}>
          <FlatList
            data={appointmentForm.appointment_participants_list}
            horizontal
            renderItem={({item}) => (
              <SelectFriendItem
                handleFriendDelete={handleFriendDelete}
                item={item}
              />
            )}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : (
        <></>
      )}

      {/* 검색 */}
      <InputBox
        value={keyword}
        setValue={setKeyword}
        placeholder="함께할 친구를 찾아보세요"
        icon={SearchFriendSvg}
        style={{marginTop: 8, gap: 8}}
      />

      {/* 친구 검색 결과 리스트 */}
      <FlatList
        data={friends}
        renderItem={({item}) => (
          <FreindsItem
            handleFriendPress={handleFriendPress}
            item={item}
            selectedFriends={
              appointmentForm.appointment_participants_list || []
            }
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
        style={{marginTop: -12}}
      />
    </View>
  );
};

export default AppointmentFriend;
