import {color_primary, commonStyle} from '@/styles/common';
import {TabBarProps} from '@/types/Common';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const TabBar = ({categories, active, onChange}: TabBarProps) => {
  return (
    <View style={styles.tab}>
      {categories.map(el => (
        <TouchableOpacity
          key={el.label}
          style={[styles.tabBtn, active === el.value && styles.tabBtnActive]}
          onPress={() => onChange(el.value)}
          activeOpacity={0.8}>
          <Text
            style={
              active === el.value
                ? commonStyle.MEDIUM_FF_18
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
    marginHorizontal: -16,
    padding: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabBtn: {
    paddingHorizontal: 20,
    marginHorizontal: 16,
    justifyContent: 'center',
  },
  tabBtnActive: {
    backgroundColor: color_primary,
    borderRadius: 100,
    paddingVertical: 4,
  },
});

export default TabBar;
