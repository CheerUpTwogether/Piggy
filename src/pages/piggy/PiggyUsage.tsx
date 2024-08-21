import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {commonStyle} from '@/styles/common';
import {piggyUsageHistories} from '@/mock/Piggy/Piggy';
import ButtonCouple from '@/components/common/ButtonCouple';
import PiggyUsageItem from '@/components/piggy/PiggyUsageItem';

const PiggyUsage = () => {
  return (
    <View style={commonStyle.CONTAINER}>
      <Text
        style={[
          commonStyle.REGULAR_77_16,
          {textAlign: 'center', paddingTop: 12},
        ]}>
        현재 보유
      </Text>

      <View style={styles.piggyContainer}>
        <Text style={commonStyle.BOLD_PRIMARY_20}>50000</Text>
        <Text style={commonStyle.BOLD_33_20}>Piggy</Text>
      </View>

      <ButtonCouple
        onPressLeft={() => {}}
        onPressRight={() => {}}
        textLeft={'충전하기'}
        textRight={'선물하기'}
        theme="outline"
      />

      <FlatList
        data={piggyUsageHistories}
        keyExtractor={item => String(item.usage_history_id)}
        renderItem={PiggyUsageItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  piggyContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
    paddingTop: 4,
    marginBottom: 24,
  },
});
export default PiggyUsage;
