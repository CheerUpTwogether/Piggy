import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CancleSvg from '@/assets/icons/X.svg';
import BasicProfileSvg from '@/assets/icons/basicProfile.svg';
import {commonStyle} from '@/styles/common';
import {SelectFriendItemProp} from '@/types/friend';

const SelectFriendItem = ({item, handleFriendDelete}: SelectFriendItemProp) => {
  return (
    <TouchableOpacity
      style={styles.firendSelectWrapper}
      onPress={() => handleFriendDelete(item)}>
      {item.profile_img_url || item.profile_img_path ? (
        <>
          <Image
            source={{uri: item.profile_img_url || item.profile_img_path}}
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
            <BasicProfileSvg width={24} height={24} />
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
