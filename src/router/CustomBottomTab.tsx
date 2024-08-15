import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const BottomTab = ({state}) => {
  const navigation = useNavigation();
  // 탭 클릭 이벤트
  const moveTab = name => {
    navigation.navigate(name);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => moveTab('Home')}>
        {/* <HomeSvg
          width={36}
          height={36}
          color={state.index === 0 ? '#555' : '#ddd'}
        /> */}
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => moveTab('Search')}>
        {/* <SearchSvg
          width={36}
          height={36}
          color={state.index === 1 ? '#555' : '#ddd'}
        /> */}
        <Text>Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => moveTab('Plus')}>
        {/* <PlusSvg
          width={36}
          height={36}
          color={state.index === 2 ? '#555' : '#ddd'}
        /> */}
        <Text>Goods</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => moveTab('Play')}>
        {/* <PlaySvg
          width={36}
          height={36}
          color={state.index === 3 ? '#555' : '#ddd'}
        /> */}
        <Text>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 0.5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
});

export default BottomTab;
