import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {StackHeaderProps} from '@react-navigation/stack';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/Router';
import {LeftItemProps} from '@/types/Common';

import AlertSvg from '@/assets/icons/alert.svg';
import SearchSvg from '@/assets/icons/search.svg';
import GoodsBoxSvg from '@/assets/icons/goodsBox.svg';
import BackSvg from '@/assets/icons/leftArrow.svg';
import EditSvg from '@/assets/icons/edit.svg';

const topLogo = require('@/assets/icons/topLogo.png');

const LeftItem = ({name, headerLeftLabelVisible}: LeftItemProps) => {
  const mainName = ['Home', 'Friends', 'Goods', 'Settings'];

  if (mainName.includes(name)) {
    return <Image source={topLogo} style={styles.logo} />;
  }

  if (headerLeftLabelVisible) {
    return (
      <TouchableOpacity style={styles.button}>
        <BackSvg width={24} height={24} />
      </TouchableOpacity>
    );
  }

  return <View style={styles.empty} />;
};

const Title = ({title}: {title: string}) => {
  return !title ? <View /> : <Text style={styles.title}>{title}</Text>;
};

const Alarm = () => (
  <TouchableOpacity style={styles.icon}>
    <AlertSvg width={24} height={24} />
  </TouchableOpacity>
);

type NavigationProp = StackNavigationProp<RootStackParamList, 'FriendSearch'>;
const RightItems = ({name}: {name: string}) => {
  const navigation = useNavigation<NavigationProp>();

  switch (name) {
    case 'Friends':
      return (
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.navigate('FriendSearch')}>
            <SearchSvg width={24} height={24} color={'#555555'} />
          </TouchableOpacity>
          <Alarm />
        </View>
      );
    case 'Goods':
    case 'GoodsDetail':
      return (
        <View style={styles.iconContainer}>
          <TouchableOpacity style={[styles.directionRow, styles.icon]}>
            <Text style={styles.text}>500</Text>
            <Text style={[styles.text, styles.colorRed]}>P</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <GoodsBoxSvg width={24} height={24} color={'#555555'} />
          </TouchableOpacity>
          <Alarm />
        </View>
      );
    case 'Settings':
      return (
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.icon}>
            <EditSvg width={24} height={24} color={'#555555'} />
          </TouchableOpacity>
          <Alarm />
        </View>
      );
    case 'Alert':
      return <View style={styles.empty} />;
    default:
      return <Alarm />;
  }
};

const TopTab = ({route, options}: BottomTabHeaderProps | StackHeaderProps) => {
  return (
    <View style={styles.container}>
      <LeftItem
        name={route.name}
        headerLeftLabelVisible={options?.headerLeftLabelVisible || false}
      />
      <Title title={options.title || ''} />
      <RightItems name={route.name} />
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
  title: {
    color: '#333333',
    fontSize: 16,
    fontFamily: 'NotoSansKR-Medium',
  },
  empty: {
    width: 48,
  },
  button: {
    padding: 8,
    margin: -8,
  },
});
export default TopTab;
