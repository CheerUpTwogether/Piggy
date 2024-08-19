import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {commonStyle} from '@/styles/common';
import EmptyResult from '@/components/common/EmptyResult';
import {dummy_friends_data, dummy_profile} from '@/mock/Friends/dummy';

import MoreSvg from '@/assets/icons/more.svg';

const Friends = () => {
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
            <View>
              {dummy_friends_data.map(item => (
                <View key={item.id} style={styles.friendContainer}>
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
                    style={styles.moreButton}>
                    <MoreSvg width={20} height={20} />
                  </TouchableOpacity>
                </View>
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
    marginTop: 20,
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
    paddingRight: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyWrapper: {marginTop: 60},
});

export default Friends;
