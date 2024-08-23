import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Animated,
  PanResponder,
} from 'react-native';
import EmptyResult from '@/components/common/EmptyResult';
import BottomSheet from '@/components/common/BottomSheet';
import ProfileDetail from './ProfileDetail';
import {commonStyle} from '@/styles/common';
import {dummy_friends_data, dummy_profile} from '@/mock/Friends/Friends';
import {Friend, User} from '@/mock/Friends/type';

import MoreSvg from '@/assets/icons/more.svg';
import BasicProfileSvg from '@/assets/icons/basicProfile.svg';

const SWIPE_STANDARD = -100;

const Friends = () => {
  const [openRowIndex, setOpenRowIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Friend | User>({
    uuid: '',
    nick_name: '',
    total_appointments: 0,
    completed_appointments: 0,
    profile_image_path: '',
    friend: false,
  });

  const positions = useRef(
    dummy_friends_data.map(() => new Animated.Value(0)),
  ).current;

  // 행 열기/닫기 애니메이션 처리 함수
  const toggleRowAnimation = (index: number, toValue: number) => {
    return new Promise<void>(resolve => {
      Animated.timing(positions[index], {
        toValue,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        setOpenRowIndex(toValue === 0 ? null : index);
        setIsAnimating(false);
        resolve();
      });
    });
  };

  // 특정 행을 열거나 닫는 함수
  const handleRowToggle = async (index: number) => {
    if (isAnimating) setIsAnimating(true);

    if (openRowIndex === index) {
      await toggleRowAnimation(index, 0); // 현재 열린 행 닫기
    } else {
      if (openRowIndex !== null) {
        await toggleRowAnimation(openRowIndex, 0); // 이전에 열린 행 닫기
      }
      await toggleRowAnimation(index, SWIPE_STANDARD); // 새로운 행 열기
    }
  };

  // PanResponder 생성 함수
  const createPanResponder = (index: number) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dx < 0) {
          positions[index].setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: async (e, gestureState) => {
        if (gestureState.dx < SWIPE_STANDARD / 2) {
          await handleRowToggle(index);
        } else {
          await toggleRowAnimation(index, 0); // 현재 행 닫기
        }
      },
    });
  };

  // More 버튼 클릭 처리
  const handleMorePress = async (index: number) => {
    if (!isAnimating) {
      await handleRowToggle(index);
    }
  };

  // 프로필 클릭 처리
  const handleProfilePress = async (user: Friend) => {
    if (openRowIndex !== null) {
      await toggleRowAnimation(openRowIndex, 0);
    }
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
              친구 {dummy_friends_data.length}명
            </Text>
            {dummy_friends_data.length === 0 ? (
              <View style={styles.emptyWrapper}>
                <EmptyResult
                  reason="추가된 친구가 없어요."
                  solution="친구를 추가하고 약속을 잡아보세요!"
                />
              </View>
            ) : (
              <View style={styles.friendList}>
                {dummy_friends_data.map((item, index) => (
                  <View key={item.uuid} style={styles.swipeContainer}>
                    <Animated.View
                      style={[
                        styles.friendContainer,
                        {transform: [{translateX: positions[index]}]},
                      ]}
                      {...createPanResponder(index).panHandlers}>
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
                      <Animated.View
                        style={[
                          styles.moreButton,
                          {
                            transform: [
                              {
                                translateX: positions[index].interpolate({
                                  inputRange: [SWIPE_STANDARD, 0],
                                  outputRange: [30, 0],
                                  extrapolate: 'clamp',
                                }),
                              },
                            ],
                          },
                        ]}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => handleMorePress(index)}>
                          <MoreSvg width={20} height={20} color={'#555'} />
                        </TouchableOpacity>
                      </Animated.View>
                    </Animated.View>
                    <Animated.View
                      style={[
                        styles.deleteButton,
                        {
                          transform: [
                            {
                              translateX: positions[index].interpolate({
                                inputRange: [SWIPE_STANDARD, 0],
                                outputRange: [0, 60],
                                extrapolate: 'clamp',
                              }),
                            },
                          ],
                        },
                      ]}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                          console.log('TODO: 삭제 확인 모달 & 삭제 구현')
                        }>
                        <Text style={commonStyle.REGULAR_FF_12}>삭제</Text>
                      </TouchableOpacity>
                    </Animated.View>
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
