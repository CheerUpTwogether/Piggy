import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {color_ef, commonStyle} from '@/styles/common';
import {piggyUsageHistories} from '@/mock/Piggy/Piggy';
import DropDownPicker from 'react-native-dropdown-picker';
import ButtonCouple from '@/components/common/ButtonCouple';
import PiggyUsageItem from '@/components/piggy/PiggyUsageItem';
import EmptyResult from '@/components/common/EmptyResult';

const PiggyUsage = () => {
  const options = [
    {label: '전체', value: 'total'},
    {label: '입금', value: 'input'},
    {label: '출금', value: 'output'},
  ];
  const [value, setValue] = useState(options[0].value);
  const [items, setItems] = useState(options);
  const [open, setOpen] = useState(false);
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
        <Text style={commonStyle.MEDIUM_33_20}>50000</Text>
        <Text style={commonStyle.MEDIUM_PRIMARY_20}>Piggy</Text>
      </View>

      <ButtonCouple
        onPressLeft={() => {}}
        onPressRight={() => {}}
        textLeft={'충전하기'}
        textRight={'선물하기'}
        theme="outline"
      />

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={{...styles.dropdown, ...commonStyle.BOLD_33_16}}
        containerStyle={styles.dropdownContainer}
        showTickIcon={false}
        dropDownContainerStyle={{
          borderColor: color_ef,
        }}
      />

      {piggyUsageHistories.length ? (
        <FlatList
          data={piggyUsageHistories}
          keyExtractor={item => String(item.usage_history_id)}
          renderItem={PiggyUsageItem}
        />
      ) : (
        <EmptyResult
          reason={'아직 피기 사용내역이 없어요'}
          solution={'피기를 충전하고 약속을 잡아볼까요?'}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  piggyContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
    paddingTop: 4,
    marginBottom: 32,
  },
  dropdown: {
    borderWidth: 0,
    maxWidth: 80,
    marginTop: 8,
  },
  dropdownContainer: {
    backgroundColor: '#ffffff',
    zIndex: 10,
    maxWidth: 80,
    borderColor: color_ef,
  },
});
export default PiggyUsage;
