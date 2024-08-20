import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Animated,
  PanResponder,
} from 'react-native';
import {commonStyle} from '@/styles/common';
import EmptyResult from '@/components/common/EmptyResult';
import {dummy_friends_data, dummy_profile} from '@/mock/Friends/Friends';
import BottomSheet from '@/components/common/BottomSheet';
import ProfileDetail from './ProfileDetail';
import MoreSvg from '@/assets/icons/more.svg';
import {Friend, ProfileDetailProps} from '@/mock/Friends/type';

const SWIPE_STANDARD = -100; // 슬라이드 시 삭제 버튼 나오는 기준

const Friends = () => {
  const [openRowIndex, setOpenRowIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ProfileDetailProps | Friend>(
    {
      uuid: '',
      nick_name: '',
      totalAppointments: 0,
      completedAppointments: 0,
      profileImagePath: '',
      friend: false,
    },
  );

  const positions = useRef(
    dummy_friends_data.map(() => new Animated.Value(0)),
  ).current;

  // 애니메이션을 통해 행을 열기 || 닫는 함수
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

  // 행의 삭제 열기, 닫기를 공통으로 처리 함수
  const handleRowToggle = async (index: number) => {
    if (isAnimating) {
      return;
    }
    setIsAnimating(true);

    if (openRowIndex === index) {
      await toggleRowAnimation(index, 0); // 현재 열려 있는 행 닫기
    } else {
      if (openRowIndex !== null && openRowIndex !== index) {
        await toggleRowAnimation(openRowIndex, 0); // 이전에 열려 있던 행 닫기
      }
      await toggleRowAnimation(index, SWIPE_STANDARD); // 현재 행 열기
    }
    setIsAnimating(false);
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

  // More 버튼이 눌렸을 때의 동작
  const handleMorePress = async (index: number) => {
    if (!isAnimating) {
      await handleRowToggle(index);
    }
  };

  // 프로필 모달
  const handleProfilePress = async user => {
    // 현재 열려 있는 슬라이더가 있다면 닫기
    if (openRowIndex !== null) {
      await toggleRowAnimation(openRowIndex, 0);
    }
    setIsShow(true);
    setSelectedUser({
      uuid: user.uuid,
      nick_name: user.nick_name,
      totalAppointments: user.totalAppointments,
      completedAppointments: user.completed_appointments,
      profileImagePath: user.profile_image_path,
      friend: user.friend,
    });
  };

  return (
    <ScrollView style={commonStyle.CONTAINER}>
      <View style={{marginBottom: 30}}>
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
            <Text style={commonStyle.REGULAR_AA_14}>{dummy_profile.email}</Text>
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
            <View style={{marginTop: 10}}>
              {dummy_friends_data.map((item, index) => (
                <View key={item.uuid} style={styles.swipeContainer}>
                  <Animated.View
                    style={[
                      styles.friendContainer,
                      {
                        transform: [{translateX: positions[index]}],
                      },
                    ]}
                    {...createPanResponder(index).panHandlers}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => handleProfilePress(item)}
                      style={styles.friendWrapper}>
                      <Image
                        source={{uri: item.profile_image_path}}
                        style={styles.friendProfile}
                      />
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
        component={
          selectedUser && (
            <ProfileDetail
              uuid={selectedUser?.uuid.toString()}
              nick_name={selectedUser?.nick_name}
              totalAppointments={selectedUser.totalAppointments}
              completedAppointments={selectedUser?.completedAppointments}
              profileImagePath={selectedUser?.profileImagePath}
              friend={selectedUser?.friend}
            />
          )
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  friendListWrapper: {
    marginTop: 20,
  },
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
    // backgroundColor: 'red',
    width: '65%',
  },
  friendProfile: {
    width: 40,
    height: 40,
    borderRadius: 30,
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
