import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CancleSvg from '@/assets/icons/X.svg';
import {commonStyle} from '@/styles/common';
import {SelectFriendItemProp} from '@/types/friend';
const basicProfile = require('@/assets/images/basicProfile.png');

const SelectFriendItem = ({item, handleFriendDelete}: SelectFriendItemProp) => {
  return (
    <TouchableOpacity
      style={styles.firendSelectWrapper}
      onPress={() => handleFriendDelete(item)}>
      {item.profile_img_url ? (
        <>
          <Image
            source={{uri: item.profile_img_url}}
            style={styles.friendSelectProfile}
            alt={`${item.nickname}profile`}
          />
          <View style={styles.friendSelectCancleContainer}>
            <CancleSvg width={12} height={8} stroke={'#FFF'} />
          </View>
        </>
      ) : (
        <>
          <View style={[styles.friendSelectProfile, styles.friendEmptyProfile]}>
            <Image source={basicProfile} style={styles.basicProfile} />
          </View>
          <View style={styles.friendSelectCancleContainer}>
            <CancleSvg width={12} height={8} stroke={'#FFF'} />
          </View>
        </>
      )}

      <Text style={styles.nickname} numberOfLines={1} ellipsizeMode="tail">
        {item.nickname}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  friendSelectProfile: {
    width: 48,
    height: 48,
    borderRadius: 30,
    borderWidth: 1,
  },
  friendEmptyProfile: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#DDD',
  },
  basicProfile: {width: '100%', height: '100%'},
  friendSelectCancleContainer: {
    width: 14,
    height: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 12,
    right: 0,
  },
  firendSelectContainer: {
    marginHorizontal: 8,
  },
  firendSelectWrapper: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  nickname: {
    ...commonStyle.REGULAR_33_12,
    maxWidth: 60,
    flexWrap: 'wrap',
  },
});
export default SelectFriendItem;
