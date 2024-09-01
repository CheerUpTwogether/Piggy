import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import EmptyResult from '@/components/common/EmptyResult';
import BottomSheet from '@/components/common/BottomSheet';
import {commonStyle} from '@/styles/common';
import {Friend, User} from '@/mock/Friends/type';
import ButtonBottomSheet from '@/components/common/ButtonBottomSheet';
import {useUserStore, useToastStore, useModalStore} from '@/store/store';
import {getFriendsSpb, deleteFriendshipSpb} from '@/supabase/FriendsSpb';
import {useFriendActions} from '@/hooks/useFriendActions';
import ProfileDetailComponent from '@/components/setting/ProfileDetailComponent';

import MoreSvg from '@/assets/icons/more.svg';
import BasicProfileSvg from '@/assets/icons/basicProfile.svg';

const Friends = () => {
  const [isShow, setIsShow] = useState(false);
  const [moreShow, setMoreShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Friend | User>({
    id: '',
    nickname: '',
    total_appointment: 0,
    completed_appointment: 0,
    profile_img_url: '',
    is_friend: false,
    piggy_grade: '',
  });
  const userData = useUserStore(state => state.userData);
  const addToast = useToastStore(state => state.addToast);
  const {openModal, closeModal: closeConfirmModal} = useModalStore();

  const {friendsList, onFriendAdded, onFriendRemoved, setFriendsList} =
    useFriendActions([]);

  useEffect(() => {
    fetchFriends();
  }, []);

  useEffect(() => {
    console.log('ddd', selectedUser);
  }, [selectedUser]);

  const fetchFriends = async () => {
    const friends = await getFriendsSpb(userData.id);
    if (friends) {
      // 각 친구 객체에 is_friend 속성을 추가하는 로직을 추가할 수 있습니다.
      const friendsWithStatus = friends.map(friend => ({
        ...friend,
        is_friend: true, // 이 부분을 적절히 수정해야 할 수 있습니다.
      }));
      setFriendsList(friendsWithStatus);
    } else {
      addToast({
        success: false,
        text: '친구 목록을 불러오지 못했습니다.',
        multiText: '다시 시도해주세요.',
      });
    }
  };

  const sortedFriends = friendsList.sort((a, b) => {
    const nameA = a.nickname ? a.nickname.toLowerCase() : '';
    const nameB = b.nickname ? b.nickname.toLowerCase() : '';
    return nameA.localeCompare(nameB, 'ko');
  });

  const handleProfilePress = (user: Friend) => {
    setSelectedUser(user);
    setIsShow(true);
  };

  const handleMorePress = (user: Friend) => {
    setSelectedUser(user);
    setMoreShow(true);
  };

  const handleDeleteUser = () => {
    openModal({
      title: '친구를 삭제하시겠습니까?',
      content: '삭제할 경우 해당 친구와 약속을 생성할 수 없습니다.',
      text: '삭제하기',
      onPress: async () => {
        try {
          const res = await deleteFriendshipSpb(userData.id, selectedUser.id);
          if (!res) {
            addToast({
              success: false,
              text: '친구 삭제에 실패했습니다.',
              multiText: '다시 시도해주세요.',
            });
            return;
          }

          addToast({
            success: true,
            text: '친구가 성공적으로 삭제되었습니다.',
          });

          onFriendRemoved(selectedUser.id);

          // 삭제된 친구를 친구 목록에서 제거
          setFriendsList(prevFriends =>
            prevFriends.filter(friend => friend.id !== selectedUser.id),
          );
        } catch (error) {
          console.error('Error deleting friend:', error);
          addToast({
            success: false,
            text: '친구 삭제에 실패했습니다.',
            multiText: '다시 시도해주세요.',
          });
        } finally {
          closeConfirmModal();
          setMoreShow(false);
        }
      },
      textCancel: '취소',
    });
  };

  const createButtonList = () => [
    {
      text: '삭제',
      onPress: handleDeleteUser,
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView style={commonStyle.CONTAINER}>
        <View style={styles.profileSection}>
          <TouchableOpacity
            style={styles.profileWrapper}
            activeOpacity={0.8}
            onPress={() => handleProfilePress(userData)}>
            {userData.profile_img_url ? (
              <Image
                source={{uri: userData.profile_img_url}}
                style={styles.profile}
                alt="profile"
              />
            ) : (
              <View style={[styles.basicProfileWrapper, styles.profile]}>
                <BasicProfileSvg width={40} height={40} />
              </View>
            )}

            <View style={styles.myData}>
              <Text style={commonStyle.MEDIUM_33_20}>{userData.nickname}</Text>
              <Text style={commonStyle.REGULAR_AA_14}>{userData.email}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.friendListWrapper}>
            <Text style={commonStyle.MEDIUM_33_16}>
              친구 {sortedFriends.length}명
            </Text>
            {sortedFriends.length === 0 ? (
              <View style={styles.emptyWrapper}>
                <EmptyResult
                  reason="추가된 친구가 없어요."
                  solution="친구를 추가하고 약속을 잡아보세요!"
                />
              </View>
            ) : (
              <View style={styles.friendList}>
                {sortedFriends.map(item => (
                  <View key={item.id} style={styles.swipeContainer}>
                    <View style={styles.friendContainer}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => handleProfilePress(item)}
                        style={styles.friendWrapper}>
                        {item.profile_img_url ? (
                          <Image
                            source={{uri: item.profile_img_url}}
                            style={styles.friendProfile}
                            alt="profile"
                          />
                        ) : (
                          <View
                            style={[
                              styles.friendEmptyProfile,
                              styles.friendProfile,
                            ]}>
                            <BasicProfileSvg
                              width={24}
                              height={24}
                              color={'#555'}
                            />
                          </View>
                        )}
                        <Text style={commonStyle.MEDIUM_33_16}>
                          {item.nickname}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.moreButton}
                        activeOpacity={0.8}
                        onPress={() => handleMorePress(item)}>
                        <MoreSvg width={20} height={20} color={'#555'} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        <BottomSheet
          isShow={isShow}
          setIsShow={setIsShow}
          size={0.6}
          component={({closeModal}) => (
            <ProfileDetailComponent
              selectedUser={selectedUser}
              closeModal={closeModal}
              onFriendAdded={onFriendAdded}
              onFriendRemoved={onFriendRemoved}
            />
          )}
        />

        <ButtonBottomSheet
          isShow={moreShow}
          setIsShow={setMoreShow}
          buttons={createButtonList()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileSection: {marginBottom: 30},
  swipeContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  profileWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
    gap: 14,
    height: 90,
    paddingHorizontal: 14,
  },
  basicProfileWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  profile: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  myData: {gap: 4},
  friendListWrapper: {marginTop: 20},
  friendList: {marginTop: 10},
  friendContainer: {
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
    width: '65%',
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
  moreButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  deleteButton: {
    backgroundColor: '#ED423F',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 0,
  },
  emptyWrapper: {marginTop: 60},
});

export default Friends;
