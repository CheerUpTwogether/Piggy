import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  FriendSearchRouteProp,
  FriendSearchNavigationProp,
} from '@/pages/friends/type';
import {commonStyle} from '@/styles/common';
import {Friend} from '@/mock/Friends/type';
import useDebounce from '@/hooks/useDebounce';
import InputBox from '@/components/common/InputBox';
import BottomSheet from '@/components/common/BottomSheet';
import ProfileDetail from './ProfileDetail';
import {useUserStore} from '@/store/store';
import {getUsersSpb} from '@/supabase/FriendsSpb';
import {useFriendActions} from '@/hooks/useFriendActions';

import SearchFriendSvg from '@/assets/icons/searchFriend.svg';
import AddFriendSvg from '@/assets/icons/addFriend.svg';
import EmptyResult from '@/components/common/EmptyResult';
import BasicProfileSvg from '@/assets/icons/basicProfile.svg';

const FriendSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Friend>({
    id: '',
    nickname: '',
    total_appointment: 0,
    completed_appointment: 0,
    profile_img_url: '',
    is_friend: false,
    piggy_grade: '',
  });
  const route = useRoute<FriendSearchRouteProp>();
  const {previousScreen} = route.params;
  const navigation = useNavigation<FriendSearchNavigationProp>();
  const debouncedKeyword = useDebounce(keyword, 500);
  const currentUserId = useUserStore(state => state.userData.id);

  // useFriendActions 훅 사용
  const {friendsList, onFriendAdded, onFriendRemoved, setFriendsList} =
    useFriendActions([]);

  useEffect(() => {
    fetchUsers();
  }, [debouncedKeyword]);

  const fetchUsers = async () => {
    if (debouncedKeyword) {
      try {
        const data = await getUsersSpb(currentUserId, debouncedKeyword);
        setFriendsList(data || []); // 검색 결과를 friendsList에 설정
      } catch (e) {
        console.error(e);
        setFriendsList([]);
      }
    } else {
      setFriendsList([]);
    }
  };

  const filterFriend = friendsList.sort((a, b) => {
    const nameA = a.nickname.toLowerCase();
    const nameB = b.nickname.toLowerCase();
    return nameA.localeCompare(nameB, 'ko');
  });

  const friends = filterFriend.filter(friend => friend.is_friend);
  const nonFriends = filterFriend.filter(friend => !friend.is_friend);

  const sortedData = [...friends, ...nonFriends];

  const handleProfilePress = (user: Friend) => {
    if (previousScreen === 'Friends') {
      setSelectedUser({
        id: user.id,
        nickname: user.nickname,
        total_appointment: user.total_appointment,
        completed_appointment: user.completed_appointment,
        profile_img_url: user.profile_img_url,
        is_friend: user.is_friend,
        piggy_grade: user.piggy_grade,
      });
      setIsShow(true);
    } else {
      navigation.navigate('GiftAmount', {
        uuid: user.id,
        nickname: user.nickname,
        profile_image_path: user.profile_img_url,
      });
      setIsShow(false);
    }
  };

  const renderItem = ({item}: {item: Friend}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.friendContainer}
      onPress={() => handleProfilePress(item)}>
      <View style={styles.friendWrapper}>
        {item.profile_img_url ? (
          <Image
            source={{uri: item.profile_img_url}}
            style={styles.friendProfile}
            alt="friendImage"
          />
        ) : (
          <View style={[styles.friendEmptyProfile, styles.friendProfile]}>
            <BasicProfileSvg width={24} height={24} />
          </View>
        )}
        <Text style={commonStyle.MEDIUM_33_14}>{item.nickname}</Text>
      </View>
      {!item.is_friend && (
        <AddFriendSvg width={18} height={18} color={'#333'} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={commonStyle.CONTAINER}>
      <View style={styles.ios}>
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
          keyExtractor={item => item.id}
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
          component={({closeModal}) => (
            <ProfileDetail
              id={selectedUser.id}
              nickname={selectedUser.nickname}
              total_appointment={selectedUser.total_appointment ?? 0}
              completed_appointment={selectedUser.completed_appointment ?? 0}
              profile_img_url={selectedUser.profile_img_url}
              is_friend={selectedUser.is_friend ?? false}
              closeModal={closeModal}
              onFriendAdded={onFriendAdded}
              onFriendRemoved={onFriendRemoved}
            />
          )}
        />
      </View>
    </SafeAreaView>
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
  ios: {paddingHorizontal: Platform.OS === 'ios' ? 10 : 0},
});

export default FriendSearch;
