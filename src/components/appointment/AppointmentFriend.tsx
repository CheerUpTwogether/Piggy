import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import useDebounce from '@/hooks/useDebounce';
import {useToastStore} from '@/store/store';
import {getUsersSpb} from '@/supabase/FriendsSpb';
import {FriendProp} from '@/types/friend';
import InputBox from '@/components/common/InputBox';
import EmptyResult from '@/components/common/EmptyResult';
import FreindsItem from '@/components/appointment/FriendsItem';
import SelectFriendItem from './SelectFriendItem';
import RoundHandShakeSvg from '@/assets/icons/roundHandshake.svg';
import SearchFriendSvg from '@/assets/icons/searchFriend.svg';

const {height: screenHeight} = Dimensions.get('screen');

const AppointmentFriend = () => {
  const [title, setTitle] = useState('');
  const [keyword, setKeyword] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<FriendProp[]>([]);
  const [users, setUsers] = useState<FriendProp[]>([]);
  const [usersShow, setUsersShow] = useState(false);
  const debouncedKeyword = useDebounce(keyword, 100);
  const addToast = useToastStore(state => state.addToast);

  // debouncedKeyword가 변경될 때 라디오 상태 초기화 (선택된 친구는 유지)
  useEffect(() => {
    setKeyword(debouncedKeyword);
    getUsers();
  }, [debouncedKeyword]);

  const handleFriendPress = (friend: FriendProp) => {
    const isSelected = selectedFriends.some(item => item.id === friend.id);

    if (isSelected) {
      // 이미 선택된 친구일 경우 선택 해제
      setSelectedFriends(prev =>
        prev.filter((item: FriendProp) => item.id !== friend.id),
      );
    } else {
      // 새로운 친구 선택
      setSelectedFriends([friend, ...selectedFriends]);
    }
  };

  const handleFriendDelete = (friend: FriendProp) => {
    const newSelectedFriends = selectedFriends.filter(
      item => item.id !== friend.id,
    );
    setSelectedFriends(newSelectedFriends);
  };

  const onFocusFriend = () => {
    setUsersShow(true);
    getUsers();
  };

  const getUsers = async () => {
    const {data, error} = await getUsersSpb(
      '8b9f1998-084e-447f-b586-d18c72cf1db4',
      keyword,
    );
    if (error) {
      addToast({
        success: false,
        text: '친구리스트를 불러오지 못했어요',
      });
      return;
    }
    setUsers(data.filter((el: FriendProp) => el.is_friend));
  };

  return (
    <View>
      {/* 제목 */}
      <InputBox
        value={title}
        setValue={setTitle}
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
        onFocus={onFocusFriend}
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
          !usersShow ? (
            <View />
          ) : (
            <EmptyResult
              reason="검색 결과가 없어요."
              solution="올바른 닉네임을 검색해보세요."
            />
          )
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
