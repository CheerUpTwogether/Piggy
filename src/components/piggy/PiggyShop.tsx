import {commonStyle} from '@/styles/common';
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {piggyShopList} from '@/mock/Piggy/Piggy';
import Button from '../common/Button';

const PiggyShop = () => {
  const [piggy, setPiggy] = useState(0);
  const categories = piggyShopList.map(item => item.price);
  const [radioArray, setRadioArray] = useState(
    new Array(categories.length).fill(false),
  );

  const handleSelect = (index: number) => {
    setPiggy(categories[index]);
    setRadioArray(prevArray => prevArray.map((_, i) => i === index));
  };

  return (
    <View style={commonStyle.CONTAINER}>
      <View style={styles.piggyInfoContainer}>
        <Text style={commonStyle.MEDIUM_33_14}>충전</Text>
        <View style={styles.piggyContainer}>
          <Text style={commonStyle.BOLD_33_14}>{piggy.toLocaleString()}</Text>
          <Text style={commonStyle.MEDIUM_PRIMARY_14}>Piggy</Text>
        </View>
      </View>

      {categories.map((category, index) => (
        <View
          style={[
            styles.buyPiggyWrapper,
            radioArray[index] && {borderColor: '#ED423F'},
          ]}>
          <View style={styles.selectPiggyWrapper}>
            <TouchableOpacity key={index} onPress={() => handleSelect(index)}>
              <View
                style={[
                  styles.radioContainer,
                  radioArray[index] && styles.radioSelected,
                ]}>
                {radioArray[index] && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
            <Text
              style={
                radioArray[index]
                  ? commonStyle.REGULAR_PRIMARY_14
                  : commonStyle.REGULAR_33_14
              }>
              {category.toLocaleString()} Piggy
            </Text>
          </View>
          <Text style={commonStyle.MEDIUM_77_12}>
            {category.toLocaleString()}원
          </Text>
        </View>
      ))}

      <View style={{marginTop: 220}}>
        <Button
          text="충전"
          disable={!piggy}
          onPress={() => console.log('충전')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  piggyInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    borderRadius: 100,
    borderColor: '#AAA',
    borderWidth: 0.5,
    marginTop: 32,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  piggyContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  buyPiggyWrapper: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    borderWidth: 0.5,
    borderColor: '#AAA',
  },
  selectPiggyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radioContainer: {
    width: 14,
    height: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#AAA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#ED423F',
    backgroundColor: '#ED423F',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default PiggyShop;
