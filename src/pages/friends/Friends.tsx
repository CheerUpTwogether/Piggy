import React, {useState, useCallback} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import EmptyResult from '@/components/common/EmptyResult';
import BottomSheet from '@/components/common/BottomSheet';
import ProfileDetailComponent from '@/components/setting/ProfileDetailComponent';
import ButtonBottomSheet from '@/components/common/ButtonBottomSheet';
import {useUserStore, useToastStore, useModalStore} from '@/store/store';
import {useFriendActions} from '@/hooks/useFriendActions';
import {getFriendsSpb, deleteFriendshipSpb} from '@/supabase/FriendsSpb';
import {Friend, User} from '@/types/friends';
import {commonStyle} from '@/styles/common';

import MoreSvg from '@/assets/icons/more.svg';
const basicProfile = require('@/assets/images/basicProfile.png');

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
  });
  const userData = useUserStore(state => state.userData);
  const addToast = useToastStore(state => state.addToast);
  const {openModal, closeModal: closeConfirmModal} = useModalStore();
  const {friendsList, onFriendAdded, onFriendRemoved, setFriendsList} =
    useFriendActions([]);

  useFocusEffect(
    useCallback(() => {
      fetchFriends();
    }, []),
  );

  const fetchFriends = async () => {
    const friends = await getFriendsSpb(userData.id);
    if (friends) {
      setFriendsList(friends);
    } else {
      addToast({
        success: false,
        text: '친구 목록을 불러오지 못했습니다.',
        multiText: '다시 시도해주세요.',
      });
    }
  };

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

          setFriendsList(prevFriends =>
            prevFriends.filter(friend => friend.id !== selectedUser.id),
          );
        } catch (error) {
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

  const renderProfileDetailModal = ({closeModal}: {closeModal: () => void}) => {
    return (
      <ProfileDetailComponent
        selectedUser={selectedUser}
        closeModal={closeModal}
        onFriendAdded={onFriendAdded}
        onFriendRemoved={onFriendRemoved}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView style={commonStyle.CONTAINER}>
        <View style={{marginBottom: 30}}>
          <TouchableOpacity
            style={styles.profileWrapper}
            activeOpacity={0.8}
            onPress={() => handleProfilePress(userData)}>
            {userData.profile_img_url ? (
              <View style={styles.profileBorder}>
                <Image
                  source={{uri: userData.profile_img_url}}
                  style={styles.profile}
                  alt="profile"
                />
              </View>
            ) : (
              <View style={[styles.basicProfileWrapper, styles.profile]}>
                <Image source={basicProfile} style={styles.basicProfile} />
              </View>
            )}

            <View style={styles.myData}>
              <Text style={commonStyle.MEDIUM_33_20}>{userData.nickname}</Text>
              <Text style={commonStyle.REGULAR_AA_14}>{userData.email}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.friendListWrapper}>
            <View style={{flexDirection: 'row'}}>
              <Text style={commonStyle.MEDIUM_33_16}>친구 </Text>
              <Text style={commonStyle.BOLD_33_16}>{friendsList.length}</Text>
              <Text style={commonStyle.MEDIUM_33_16}>명</Text>
            </View>
            {friendsList.length === 0 ? (
              <View style={{marginTop: 60}}>
                <EmptyResult
                  reason="추가된 친구가 없어요."
                  solution="친구를 추가하고 약속을 잡아보세요!"
                />
              </View>
            ) : (
              <View style={styles.friendList}>
                {friendsList.map(item => (
                  <View key={item.id} style={[styles.friendContainer]}>
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
                            styles.basicProfileWrapper,
                            styles.friendProfile,
                          ]}>
                          <Image
                            source={basicProfile}
                            style={styles.basicProfile}
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
                ))}
              </View>
            )}
          </View>
        </View>
        <BottomSheet
          isShow={isShow}
          setIsShow={setIsShow}
          size={0.6}
          component={renderProfileDetailModal}
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
  profileWrapper: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: '#EFEFEF',
    borderBottomColor: '#FFC3C2',
    borderBottomWidth: 5,
    alignItems: 'center',
    gap: 14,
    height: 110,
    paddingHorizontal: 14,
  },
  profileBorder: {
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 50,
  },
  basicProfileWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#EFEFEF',
    borderRadius: 90,
  },
  basicProfile: {width: '99%', height: '99%'},
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
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
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
});

export default Friends;
