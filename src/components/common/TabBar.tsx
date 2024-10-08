import {color_primary, color_sub, commonStyle} from '@/styles/common';
import {TabBarProps} from '@/types/Common';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const TabBar = ({categories, active, onChange, allData = []}: TabBarProps) => {
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
          {allData.some(data => data.filter_criteria === el.value) && (
            <View style={styles.confirmState} />
          )}
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
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: color_primary,
    borderRadius: 100,
    paddingVertical: 4,
  },
  confirmState: {
    width: 10,
    height: 10,
    borderRadius: 8,
    backgroundColor: color_sub,
  },
});

export default TabBar;
