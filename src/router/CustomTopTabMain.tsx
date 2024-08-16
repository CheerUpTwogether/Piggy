import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import AlertSvg from '@/assets/icons/alert.svg';
import SearchSvg from '@/assets/icons/search.svg';
import GoodsBoxSvg from '@/assets/icons/goodsBox.svg';
import SettingSvg from '@/assets/icons/setting.svg';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
const topLogo = require('@/assets/icons/topLogo.png');

const RightItems = ({name}: {name: string}) => {
  switch (name) {
    case 'Friends':
      return (
        <TouchableOpacity style={styles.icon}>
          <SearchSvg width={24} height={24} color={'#555555'} />
        </TouchableOpacity>
      );
    case 'Goods':
      return (
        <>
          <TouchableOpacity style={[styles.directionRow, styles.icon]}>
            <Text style={styles.text}>500</Text>
            <Text style={[styles.text, styles.colorRed]}>P</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <GoodsBoxSvg width={24} height={24} color={'#555555'} />
          </TouchableOpacity>
        </>
      );
    case 'Settings':
      return (
        <>
          <TouchableOpacity style={styles.icon}>
            <SettingSvg width={24} height={24} color={'#555555'} />
          </TouchableOpacity>
        </>
      );
    default:
      return <></>;
  }
};

const CustomTopTabMain = ({route}: BottomTabHeaderProps) => {
  return (
    <View style={styles.container}>
      <Image source={topLogo} style={styles.logo} />
      <View style={styles.iconContainer}>
        <RightItems name={route.name} />
        <TouchableOpacity style={styles.icon}>
          <AlertSvg width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  logo: {
    height: 32,
    width: 80,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    padding: 8,
    color: '#555555',
  },
  text: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'medium',
    fontFamily: 'NotoSansKR-Medium',
    lineHeight: 24,
  },
  colorRed: {
    color: '#ED423F',
  },
  directionRow: {
    flexDirection: 'row',
  },
});
export default CustomTopTabMain;
