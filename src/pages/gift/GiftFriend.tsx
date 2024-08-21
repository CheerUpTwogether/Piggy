import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {commonStyle} from '@/styles/common';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/Router';

import SearchFriend from '@/assets/icons/searchFriend.svg';

type NavigationProp = StackNavigationProp<RootStackParamList, 'FriendSearch'>;

const GiftFriend = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleMoveToFriendSearch = () => {
    navigation.navigate('FriendSearch', {previousScreen: 'GiftFriend'});
  };

  return (
    <View style={[commonStyle.CONTAINER, styles.container]}>
      <View style={styles.wrapper}>
        <View style={styles.textWrapper}>
          <Text style={commonStyle.BOLD_33_20}>어떤 친구에게 </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={commonStyle.BOLD_PRIMARY_20}>Piggy</Text>
            <Text style={commonStyle.BOLD_33_20}>를 선물할까요?</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.findFriends}
          onPress={handleMoveToFriendSearch}>
          <View style={styles.iconWrapper}>
            <SearchFriend width={64} height={64} color={'#777'} />
          </View>
          <Text style={[commonStyle.MEDIUM_AA_20, {textAlign: 'center'}]}>
            친구 찾기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 120,
  },
  wrapper: {justifyContent: 'center', alignItems: 'center'},
  textWrapper: {gap: 4, justifyContent: 'center', alignItems: 'center'},
  findFriends: {marginVertical: 60, gap: 16},
  iconWrapper: {
    width: 160,
    height: 160,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GiftFriend;
