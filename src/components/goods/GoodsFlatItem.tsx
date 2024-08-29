import {GoodsNavigationProp} from '@/pages/goods/type';

import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {commonStyle} from '@/styles/common';
import {GoodsItem} from '@/types/gift';
const GoodsFlatItem = ({item}: {item: GoodsItem}) => {
  const navigation = useNavigation<GoodsNavigationProp>();

  const gotoDetail = () => {
    navigation.navigate('GoodsDetail', {...item.product});
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.itemContainer}
      onPress={gotoDetail}>
      <Image
        source={{uri: item.product.product_thumb_image_url}}
        style={styles.itemImg}
        alt="goodsImage"
      />
      <View style={{marginHorizontal: 10, gap: 4}}>
        <Text style={commonStyle.REGULAR_AA_14} numberOfLines={1}>
          {item.product.brand_name}
        </Text>
        <Text style={commonStyle.REGULAR_33_20} numberOfLines={1}>
          {item.product.product_name}
        </Text>
        <View style={styles.priceWrapper}>
          <Text style={commonStyle.MEDIUM_33_18} numberOfLines={1}>
            {item.product.product_price.toLocaleString()}
          </Text>
          <Text style={commonStyle.MEDIUM_PRIMARY_18}>P</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    //height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
    paddingVertical: 1,
    marginHorizontal: 24,
  },
  itemContainer: {
    marginBottom: 40,
    gap: 8,
  },
  itemImg: {
    width: '100%',
    height: 260,
    borderColor: '#DDD',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  priceWrapper: {flexDirection: 'row', alignItems: 'center', gap: 4},
});
export default GoodsFlatItem;
