import React, {useState} from 'react';
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
import ProfileDetail from './ProfileDetail';
import {commonStyle} from '@/styles/common';
import {dummy_friends_data, dummy_profile} from '@/mock/Friends/Friends';
import {Friend, User} from '@/mock/Friends/type';
import ButtonBottomSheet from '@/components/common/ButtonBottomSheet';

import MoreSvg from '@/assets/icons/more.svg';
import BasicProfileSvg from '@/assets/icons/basicProfile.svg';

const Friends = () => {
  const [isShow, setIsShow] = useState(false);
  const [moreShow, setMoreShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Friend | User>({
    uuid: '',
    nick_name: '',
    total_appointments: 0,
    completed_appointments: 0,
    profile_image_path: '',
    friend: false,
  });

  // 친구 목록을 이름순으로 정렬
  const sortedFriends = dummy_friends_data.sort((a, b) => {
    const nameA = a.nick_name.toLowerCase();
    const nameB = b.nick_name.toLowerCase();
    return nameA.localeCompare(nameB, 'ko');
  });

  // 프로필 클릭 처리
  const handleProfilePress = (user: Friend) => {
    setIsShow(true);
    setSelectedUser({
      uuid: user.uuid,
      nick_name: user.nick_name,
      total_appointments: user.total_appointments,
      completed_appointments: user.completed_appointments,
      profile_image_path: user.profile_image_path,
      friend: user.friend,
    });
  };

  const handleMorePress = (user: Friend) => {
    setSelectedUser(user);
    setMoreShow(true);
  };

  const handleDeleteUser = () => {
    console.log('TODO: 친구 삭제 모달 -> 삭제 api 호출');
    setMoreShow(false);
  };

  const createButtonList = () => {
    const buttons: Array<{
      text: string;
      theme?: 'sub' | 'primary' | 'outline' | undefined;
      onPress: () => void | Promise<void>;
    }> = [
      {
        text: '삭제',
        onPress: handleDeleteUser,
      },
    ];

    return buttons;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView style={commonStyle.CONTAINER}>
        <View style={styles.profileSection}>
          <TouchableOpacity
            style={styles.profileWrapper}
            activeOpacity={0.8}
            onPress={() => handleProfilePress(dummy_profile)}>
            <Image
              source={{uri: dummy_profile.profile_image_path}}
              style={styles.profile}
            />
            <View style={styles.myData}>
              <Text style={commonStyle.MEDIUM_33_20}>
                {dummy_profile.nick_name}
              </Text>
              <Text style={commonStyle.REGULAR_AA_14}>
                {dummy_profile.email}
              </Text>
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
                  <View key={item.uuid} style={styles.swipeContainer}>
                    <View style={styles.friendContainer}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => handleProfilePress(item)}
                        style={styles.friendWrapper}>
                        {item.profile_image_path ? (
                          <Image
                            source={{uri: item.profile_image_path}}
                            style={styles.friendProfile}
                          />
                        ) : (
                          <View
                            style={[
                              styles.friendEmptyProfile,
                              styles.friendProfile,
                            ]}>
                            <BasicProfileSvg width={24} height={24} />
                          </View>
                        )}
                        <Text style={commonStyle.MEDIUM_33_16}>
                          {item.nick_name}
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
        {/* ProfileDetail 모달 */}
        <BottomSheet
          isShow={isShow}
          setIsShow={setIsShow}
          size={0.6}
          component={({closeModal}) =>
            selectedUser && (
              <ProfileDetail
                uuid={selectedUser.uuid}
                nick_name={selectedUser.nick_name}
                total_appointments={selectedUser.total_appointments ?? 0}
                completed_appointments={
                  selectedUser.completed_appointments ?? 0
                }
                profile_image_path={selectedUser.profile_image_path}
                friend={selectedUser.friend ?? false}
                closeModal={closeModal}
              />
            )
          }
        />

        {/* more 버튼 모달 */}
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
