import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import HomeSvg from '@/assets/icons/bottomTab/home.svg';
import FriendsSvg from '@/assets/icons/bottomTab/friends.svg';
import GoodsSvg from '@/assets/icons/bottomTab/goods.svg';
import SettingsSvg from '@/assets/icons/bottomTab/settings.svg';

const BottomTab = ({state}) => {
  const navigation = useNavigation();
  // 탭 클릭 이벤트
  const moveTab = name => {
    navigation.navigate(name);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => moveTab('Home')} activeOpacity={0.8}>
        <HomeSvg
          width={24}
          height={24}
          color={state.index === 0 ? '#555' : '#bbb'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => moveTab('Friends')} activeOpacity={0.8}>
        <FriendsSvg
          width={24}
          height={24}
          color={state.index === 1 ? '#555' : '#bbb'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => moveTab('Goods')} activeOpacity={0.8}>
        <GoodsSvg
          width={24}
          height={24}
          color={state.index === 2 ? '#555' : '#bbb'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => moveTab('Settings')} activeOpacity={0.8}>
        <SettingsSvg
          width={24}
          height={24}
          color={state.index === 3 ? '#555' : '#bbb'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    gap: 40,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderColor: '#efefef',
    backgroundColor: '#fff',
  },
});

export default BottomTab;
