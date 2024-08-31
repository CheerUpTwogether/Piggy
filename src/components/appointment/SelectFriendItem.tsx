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
      {item.profile_image_path ? (
        <>
          <Image
            source={{uri: item.profile_image_path}}
            style={styles.friendSelectProfile}
            alt={`${item.nickname}profile`}
          />
          <View style={styles.friendSelectCancleContainer}>
            <CancleSvg width={12} height={8} stroke={'#FFF'} />
          </View>
        </>
      ) : (
        <View style={[styles.friendEmptyProfile, styles.friendSelectProfile]}>
          <BasicProfileSvg width={24} height={24} />
        </View>
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
  },
  friendEmptyProfile: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
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
    top: 0,
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
    maxWidth: 52,
    flexWrap: 'wrap',
  },
});
export default SelectFriendItem;
