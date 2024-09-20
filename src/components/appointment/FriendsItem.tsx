import {commonStyle} from '@/styles/common';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FriendItemProp} from '@/types/friend';
const basicProfile = require('@/assets/images/basicProfile.png');

const FriendsItem = ({
  item,
  handleFriendPress,
  selectedFriends,
}: FriendItemProp) => {
  const active = selectedFriends.find(el => el.id === item.id);
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.friendContainer, active && {borderColor: '#ED423F'}]}
      onPress={() => handleFriendPress(item)}>
      <View style={styles.friendWrapper}>
        {item.profile_img_url ? (
          <Image
            source={{uri: item.profile_img_url}}
            style={styles.friendProfile}
            alt={`${item.nickname}profile`}
          />
        ) : (
          <View style={[styles.friendEmptyProfile, styles.friendProfile]}>
            <Image source={basicProfile} style={styles.basicProfile} />
          </View>
        )}
        <Text style={commonStyle.MEDIUM_33_14}>{item.nickname}</Text>
      </View>

      <View style={[styles.radioContainer, active && styles.radioSelected]}>
        {active && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  friendContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFF',
    zIndex: 1,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
  },
  friendWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  friendProfile: {
    width: 34,
    height: 34,
    borderRadius: 34,
  },
  friendSelectProfile: {
    width: 48,
    height: 48,
    borderRadius: 30,
  },
  friendEmptyProfile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  basicProfile: {width: '100%', height: '100%'},
  radioContainer: {
    width: 14,
    height: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#AAA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#ED423F',
    backgroundColor: '#ED423F',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});
export default FriendsItem;
