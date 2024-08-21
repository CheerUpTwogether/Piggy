import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/Router';
import useDebounce from '@/hooks/useDebounce';
import InputBox from '@/components/common/InputBox';
import BottomSheet from '@/components/common/BottomSheet';
import ProfileDetail from './ProfileDetail';
import {commonStyle} from '@/styles/common';
import {dummy_friends_data} from '@/mock/Friends/Friends';
import {Friend} from '@/mock/Friends/type';

import SearchFriendSvg from '@/assets/icons/searchFriend.svg';
import AddFriendSvg from '@/assets/icons/addFriend.svg';
import EmptyResult from '@/components/common/EmptyResult';
import BasicProfileSvg from '@/assets/icons/basicProfile.svg';

type FriendSearchRouteProp = RouteProp<RootStackParamList, 'FriendSearch'>;
type FriendSearchNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FriendSearch'
>;

const FriendSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Friend>({
    uuid: '',
    nick_name: '',
    total_appointments: 0,
    completed_appointments: 0,
    profile_image_path: '',
    friend: false,
  });
  const route = useRoute<FriendSearchRouteProp>();
  const {previousScreen} = route.params;
  const navigation = useNavigation<FriendSearchNavigationProp>();
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

  const handleProfilePress = (user: Friend) => {
    if (previousScreen === 'Friends') {
      setSelectedUser({
        uuid: user.uuid,
        nick_name: user.nick_name,
        total_appointments: user.total_appointments,
        completed_appointments: user.completed_appointments,
        profile_image_path: user.profile_image_path,
        friend: user.friend,
      });
      setIsShow(true);
    } else {
      navigation.navigate('GiftAmount', {
        // TODO: 친구만 가능하게
        uuid: user.uuid,
        nick_name: user.nick_name,
        profile_image_path: user.profile_image_path,
      });
    }
  };

  const renderItem = ({item}: {item: Friend}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.friendContainer}
      onPress={() => handleProfilePress(item)}>
      <View style={styles.friendWrapper}>
        {item.profile_image_path ? (
          <Image
            source={{uri: item.profile_image_path}}
            style={styles.friendProfile}
          />
        ) : (
          <View style={[styles.friendEmptyProfile, styles.friendProfile]}>
            <BasicProfileSvg width={24} height={24} />
          </View>
        )}
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
      <BottomSheet
        isShow={isShow}
        setIsShow={setIsShow}
        size={0.6}
        component={
          selectedUser && (
            <ProfileDetail
              uuid={selectedUser.uuid}
              nick_name={selectedUser.nick_name}
              total_appointments={selectedUser.total_appointments ?? 0}
              completed_appointments={selectedUser.completed_appointments ?? 0}
              profile_image_path={selectedUser.profile_image_path}
              friend={selectedUser.friend ?? false}
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
  friendEmptyProfile: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
  },
});

export default FriendSearch;
