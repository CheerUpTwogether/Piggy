import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {commonStyle} from '@/styles/common';
import {useRoute, RouteProp} from '@react-navigation/native';
import CoinSvg from '@/assets/icons/coin.svg';
import ClockcSvg from '@/assets/icons/clock.svg';
import UseShopSvg from '@/assets/icons/useShop.svg';
import {RootStackParamList} from '@/types/Router';

const GoodsStorageDetail = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'GoodsStorageDetail'>>();
  const {
    id,
    provider,
    title,
    price,
    expire_date,
    goods_url,
    goods_barcode_url,
    createDate,
  } = route.params;
  return (
    <View style={commonStyle.container}>
      <View style={{alignItems: 'center', marginTop: 42, marginBottom: 24}}>
        <Image
          source={{uri: goods_url}}
          style={{width: 244, height: 244, borderRadius: 8}}
          alt="goodsImage"
        />
      </View>
      <View style={{gap: 4, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{...commonStyle.REGULAR_SUB_14}}>{provider}</Text>
        <Text style={{...commonStyle.MEDIUM_33_16}}>{title}</Text>
      </View>

      <View style={styles.goodsBarcodeContainer}>
        <Image
          source={{uri: goods_barcode_url}}
          style={{width: 260, height: 100}}
          alt="goodsBarcodeImage"
        />
      </View>

      <View style={styles.goodsUseDescriptionContainer}>
        <View style={{gap: 4}}>
          <View style={{flexDirection: 'row', gap: 4}}>
            <CoinSvg width={24} height={24} fill={'#333'} />
            <Text style={commonStyle.MEDIUM_33_14}>
              매장에서 현금처럼 사용할 수 있어요.
            </Text>
          </View>
          <Text style={commonStyle.REGULAR_77_12}>
            매장 직원에게 선물함의 바코드를 제시해 사용할 수 있어요.
          </Text>
        </View>
      </View>

      <View style={{height: 1, marginVertical: 20, backgroundColor: '#EF'}} />

      <View style={styles.goodsDetailContainer}>
        <View style={{gap: 2}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 1}}>
            <ClockcSvg />
            <Text style={commonStyle.REGULAR_99_14}>유효기간</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
            <Text style={commonStyle.REGULAR_33_16}>{expire_date}</Text>
            <View style={styles.expireDateWrapper}>
              <Text style={commonStyle.MEDIUM_FF_12}>D-29</Text>
            </View>
          </View>
        </View>
        <View style={{gap: 2}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 1}}>
            <UseShopSvg />
            <Text style={commonStyle.REGULAR_99_14}>사용처</Text>
          </View>
          <Text style={commonStyle.REGULAR_33_16}>{provider}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  goodsBarcodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  goodsUseDescriptionContainer: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginTop: 14,
    padding: 14,
    gap: 8,
  },
  goodsDetailContainer: {
    marginLeft: 8,
    gap: 8,
  },
  expireDateWrapper: {
    width: 40,
    height: 18,
    borderRadius: 20,
    backgroundColor: '#ED423F',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GoodsStorageDetail;
