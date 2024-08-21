import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import {commonStyle} from '@/styles/common';
import InputBox from '@/components/common/InputBox';
import {dummy_friends_data} from '@/mock/Friends/Friends';
import useDebounce from '@/hooks/useDebounce';
import {Friend} from '@/mock/Friends/type';

import SearchFriendSvg from '@/assets/icons/searchFriend.svg';
import AddFriendSvg from '@/assets/icons/addFriend.svg';
import EmptyResult from '@/components/common/EmptyResult';

const FriendSearch = () => {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 500);

  const filterFriend = debouncedKeyword
    ? dummy_friends_data
        .filter(friend =>
          friend.nick_name.toLowerCase().includes(keyword.toLowerCase()),
        )
        .sort((a, b) => {
          const nameA = a.nick_name.toLowerCase();
          const nameB = b.nick_name.toLowerCase();
          return nameA.localeCompare(nameB, 'ko');
        })
    : [];

  const friends = filterFriend.filter(friend => friend.friend);
  const nonFriends = filterFriend.filter(friend => !friend.friend);

  const sortedData = [...friends, ...nonFriends];

  const renderItem = ({item}: {item: Friend}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.friendContainer}
      onPress={() => console.log('TODO: 프로필 상세 모달')}>
      <View style={styles.friendWrapper}>
        <Image
          source={{uri: item.profile_image_path}}
          style={styles.friendProfile}
        />
        <Text style={commonStyle.MEDIUM_33_14}>{item.nick_name}</Text>
      </View>
      {item.friend ? (
        <View />
      ) : (
        <AddFriendSvg width={18} height={18} color={'#333'} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={commonStyle.CONTAINER}>
      <InputBox
        value={keyword}
        setValue={setKeyword}
        placeholder="친구를 검색해보세요."
        icon={SearchFriendSvg}
        isLarge={false}
        goBack={true}
      />
      <FlatList
        data={sortedData}
        renderItem={renderItem}
        keyExtractor={item => item.uuid.toString()}
        ListEmptyComponent={
          !keyword ? (
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
  friendContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  friendWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  friendProfile: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
});

export default FriendSearch;
