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
import {User, Friend} from '@/types/Friends';
import EmptyResult from '@/components/common/EmptyResult';

import MoreSvg from '@/assets/icons/more.svg';

const dummy_profile: User = {
  profile_image_path: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
  nick_name: '움파룸파',
  email: 'oompaLoompa@gmail.com',
};

const dummy_data: Friend[] = [
  {
    id: 1,
    profile_image_path: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
    nick_name: '일스틴',
  },
  {
    id: 2,
    profile_image_path:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
    nick_name: '이스틴',
  },
  {
    id: 3,
    profile_image_path: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
    nick_name: '삼스틴',
  },
  {
    id: 4,
    profile_image_path:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
    nick_name: '사스틴',
  },
  {
    id: 5,
    profile_image_path: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
    nick_name: '오스틴',
  },
  {
    id: 6,
    profile_image_path:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
    nick_name: '육스틴',
  },
  {
    id: 7,
    profile_image_path: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
    nick_name: '칠스틴',
  },
  {
    id: 8,
    profile_image_path:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
    nick_name: '팔스틴',
  },
  {
    id: 9,
    profile_image_path: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
    nick_name: '구스틴',
  },
  {
    id: 10,
    profile_image_path:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
    nick_name: '심스틴',
  },
  {
    id: 11,
    profile_image_path: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
    nick_name: '가스틴',
  },
  {
    id: 12,
    profile_image_path:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
    nick_name: '나스틴',
  },
  {
    id: 13,
    profile_image_path: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
    nick_name: '다스틴',
  },
  {
    id: 14,
    profile_image_path:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
    nick_name: '라스틴',
  },
  {
    id: 15,
    profile_image_path: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
    nick_name: '마스틴',
  },
  {
    id: 16,
    profile_image_path:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
    nick_name: '바스틴',
  },
  {
    id: 17,
    profile_image_path: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
    nick_name: '사스틴',
  },
  {
    id: 18,
    profile_image_path:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
    nick_name: '아스틴',
  },
  {
    id: 19,
    profile_image_path: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
    nick_name: '자스틴',
  },
  {
    id: 20,
    profile_image_path:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
    nick_name: '차스틴',
  },
];

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
            친구 {dummy_data.length}명
          </Text>
          {dummy_data.length === 0 ? (
            <View style={styles.emptyWrapper}>
              <EmptyResult
                reason="추가된 친구가 없어요."
                solution="친구를 추가하고 약속을 잡아보세요!"
              />
            </View>
          ) : (
            <View>
              {dummy_data.map(item => (
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
