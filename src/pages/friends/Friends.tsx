import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {commonStyle} from '@/styles/common';
import EmptyResult from '@/components/common/EmptyResult';
import {dummy_friends_data, dummy_profile} from '@/mock/Friends/dummy';

import MoreSvg from '@/assets/icons/more.svg';

const Friends = () => {
  const [openSwipeableIndex, setOpenSwipeableIndex] = useState<number | null>(
    null,
  );
  const swipeableRefs = useRef<(Swipeable | null)[]>([]);

  // 우측 슬라이더
  const renderDeleteSlider = () => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        activeOpacity={0.8}
        onPress={() => console.log('TODO: 삭제 확인 모달 & 삭제 구현')}>
        <Text style={commonStyle.REGULAR_FF_12}>삭제</Text>
      </TouchableOpacity>
    );
  };

  const handleMorePress = (index: number) => {
    // 이전에 열린 Swipeable을 닫음
    if (openSwipeableIndex !== null && openSwipeableIndex !== index) {
      swipeableRefs.current[openSwipeableIndex]?.close();
    }

    // 현재 Swipeable을 열고 상태 업데이트
    swipeableRefs.current[index]?.openRight();
    setOpenSwipeableIndex(index);
  };

  const handleSwipeableOpen = (index: number) => {
    // 이전에 열린 Swipeable을 닫음
    if (openSwipeableIndex !== null && openSwipeableIndex !== index) {
      swipeableRefs.current[openSwipeableIndex]?.close();
    }

    // 현재 Swipeable을 열고 상태 업데이트
    setOpenSwipeableIndex(index);
  };

  const handleSwipeableClose = (index: number) => {
    if (openSwipeableIndex === index) {
      setOpenSwipeableIndex(null);
    }
  };

  return (
    <ScrollView style={commonStyle.CONTAINER}>
      <View style={{marginBottom: 30}}>
        <TouchableOpacity style={styles.profileWrapper} activeOpacity={0.8}>
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
                <Swipeable
                  key={item.id}
                  ref={ref => (swipeableRefs.current[index] = ref)}
                  renderRightActions={renderDeleteSlider}
                  onSwipeableOpen={() => handleSwipeableOpen(index)}
                  onSwipeableClose={() => handleSwipeableClose(index)}>
                  <View style={styles.friendContainer}>
                    <View style={styles.friendWrapper}>
                      <Image
                        source={{uri: item.profile_image_path}}
                        style={styles.friendProfile}
                      />
                      <Text style={commonStyle.MEDIUM_33_16}>
                        {item.nick_name}
                      </Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.moreButton}
                      onPress={() => handleMorePress(index)}>
                      <MoreSvg width={20} height={20} />
                    </TouchableOpacity>
                  </View>
                </Swipeable>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    width: 80,
    height: '100%',
  },
  emptyWrapper: {marginTop: 60},
});

export default Friends;
