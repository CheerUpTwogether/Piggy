import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {color_ef, commonStyle} from '@/styles/common';
import DropDownPicker from 'react-native-dropdown-picker';
import PiggyUsageItem from '@/components/piggy/PiggyUsageItem';
import EmptyResult from '@/components/common/EmptyResult';
import {getPiggySpb, getPiggyLogSpb} from '@/supabase/AuthSpb';
import {useUserStore} from '@/store/store';
import {PiggyLog} from '@/types/gift';

const PiggyUsage = () => {
  const options = [
    {label: '전체', value: 'total'},
    {label: '입금', value: 'input'},
    {label: '출금', value: 'output'},
  ];
  const [value, setValue] = useState(options[0].value);
  const [items, setItems] = useState(options);
  const [open, setOpen] = useState(false);
  const [piggy, setPiggy] = useState<number>(0);
  const [piggyLog, setPiggyLog] = useState<PiggyLog[]>([]);
  const {userData, setUserDataByKey} = useUserStore();

  useFocusEffect(
    useCallback(() => {
      fetchPiggyData();
      fetchPiggyLogData();
    }, []),
  );

  const fetchPiggyData = async () => {
    const res = await getPiggySpb(userData.id);
    setPiggy(res?.latest_piggy_count);
    setUserDataByKey('piggy', res?.latest_piggy_count);
  };

  const fetchPiggyLogData = async () => {
    const res = await getPiggyLogSpb(userData.id);
    setPiggyLog(res);
  };

  const filterPiggyLog = () => {
    if (value === 'total') {
      return piggyLog;
    }

    return piggyLog.filter(item => {
      if (value === 'input') {
        return item.diff_piggy_count > 0;
      } else if (value === 'output') {
        return item.diff_piggy_count < 0;
      }
      return false;
    });
  };

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
        <Text style={commonStyle.MEDIUM_33_20}>{piggy}</Text>
        <Text style={commonStyle.MEDIUM_PRIMARY_20}>Piggy</Text>
      </View>

      {/* <ButtonCouple
        onPressLeft={() => navigation.navigate('PiggyShop')}
        onPressRight={() => {}}
        textLeft={'충전하기'}
        textRight={'선물하기'}
        theme="outline"
      /> */}

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

      {filterPiggyLog().length ? (
        <FlatList
          data={filterPiggyLog()}
          keyExtractor={item => String(item.id)}
          renderItem={PiggyUsageItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyResult
          reason={'아직 피기 사용 내역이 없어요.'}
          solution={'약속을 잡고 피기를 사용해보세요!'}
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
