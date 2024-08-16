import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootBottomTabParamList} from 'types/Router';

import HomeSvg from '@/assets/icons/bottomTab/home.svg';
import FriendsSvg from '@/assets/icons/friend.svg';
import GoodsSvg from '@/assets/icons/goods.svg';
import SettingsSvg from '@/assets/icons/setting.svg';

const BottomTab: React.FC<BottomTabBarProps> = ({state}) => {
  const navigation =
    useNavigation<StackNavigationProp<RootBottomTabParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        activeOpacity={0.8}
        style={styles.iconButton}>
        <HomeSvg
          width={24}
          height={24}
          color={state.index === 0 ? '#555' : '#bbb'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Friends')}
        activeOpacity={0.8}
        style={styles.iconButton}>
        <FriendsSvg
          width={24}
          height={24}
          color={state.index === 1 ? '#555' : '#bbb'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Goods')}
        activeOpacity={0.8}
        style={styles.iconButton}>
        <GoodsSvg
          width={24}
          height={24}
          color={state.index === 2 ? '#555' : '#bbb'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Settings')}
        activeOpacity={0.8}
        style={styles.iconButton}>
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
    //justifyContent: 'space-between',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderColor: '#efefef',
    backgroundColor: '#fff',
  },
  iconButton: {
    paddingTop: 10,
    paddingBottom: 10,
    padding: 20,
  },
});

export default BottomTab;
