import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {commonStyle} from '@/styles/common';
import {useRoute} from '@react-navigation/native';
import Button from '../common/Button';

const GoodsDetail = () => {
  const route = useRoute();
  const {id, provider, title, sub_title, price, expire_date, goods_url} =
    route.params;
  return (
    <View style={commonStyle.container}>
      <View style={{alignItems: 'center', marginTop: 42, marginBottom: 42}}>
        <Image
          source={{uri: goods_url}}
          style={{width: 244, height: 244, borderRadius: 8}}
        />
      </View>
      <View style={{gap: 14}}>
        <Text style={{...commonStyle.MEDIUM_33_20, textAlign: 'center'}}>
          {title}
        </Text>
        <View style={styles.goodsPriceContainer}>
          <Text style={commonStyle.BOLD_33_20}>
            {new Intl.NumberFormat('ko-KR').format(price)}
          </Text>
          <Text style={commonStyle.BOLD_PRIMARY_20}>P</Text>
        </View>
      </View>

      <View style={styles.goodsDetailContainer}>
        <View style={{gap: 2}}>
          <Text style={commonStyle.REGULAR_99_14}>유효기간</Text>
          <Text style={commonStyle.REGULAR_33_16}>{expire_date}</Text>
        </View>
        <View style={{gap: 2}}>
          <Text style={commonStyle.REGULAR_99_14}>사용처</Text>
          <Text style={commonStyle.REGULAR_33_16}>{provider}</Text>
        </View>
      </View>
      <Text style={{...commonStyle.MEDIUM_PRIMARY_12, marginVertical: 10}}>
        *해당 쿠폰은 일부 점포에서는 취급하지 않는 상품일 수 있습니다.
      </Text>
      <View style={{marginVertical: 24}}>
        <Button text="구매" onPress={() => {}} size="full" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  goodsPriceContainer: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goodsDetailContainer: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginTop: 20,
    padding: 14,
    gap: 8,
  },
});

export default GoodsDetail;
