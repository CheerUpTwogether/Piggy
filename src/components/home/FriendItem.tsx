import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {color_ef, commonStyle} from '@/styles/common';
import {FriendsProps} from '@/mock/Home/type';
import ProfileSvg from '@/assets/icons/basicProfile.svg';
import ArriveCheck from '@/assets/icons/arriveCheck.svg';

const FriendItem = ({item}: {item: FriendsProps}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        {item?.url ? (
          <Image
            source={{uri: item.url}}
            width={40}
            height={40}
            style={styles.img}
            alt={`${item.nick_name}Image`}
          />
        ) : (
          <View style={styles.imgContainer}>
            <ProfileSvg width={28} height={28} />
          </View>
        )}
        <Text
          style={
            item.isJoin ? commonStyle.MEDIUM_33_16 : commonStyle.MEDIUM_AA_16
          }>
          {item.nick_name}
        </Text>
      </View>
      {item.isProof && <ArriveCheck />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  img: {borderRadius: 100, borderColor: color_ef, borderWidth: 1},
  imgContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderColor: '#EFEFEF',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default FriendItem;
