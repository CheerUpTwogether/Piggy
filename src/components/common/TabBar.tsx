import {commonStyle} from '@/styles/common';
import {TabBarProps} from '@/types/Common';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const TabBar = ({categories, active, onChange}: TabBarProps) => {
  return (
    <View style={styles.tab}>
      {categories.map(el => (
        <TouchableOpacity
          key={el.label}
          style={styles.tabBtn}
          onPress={() => onChange(el.value)}
          activeOpacity={0.8}>
          <Text
            style={
              active === el.value
                ? commonStyle.MEDIUM_PRIMARY_18
                : commonStyle.MEDIUM_77_18
            }>
            {el.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    marginLeft: -8,
  },
  tabBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
});

export default TabBar;
