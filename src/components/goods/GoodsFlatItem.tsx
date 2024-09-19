import {GoodsNavigationProp} from '@/pages/goods/type';

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {commonStyle} from '@/styles/common';
import {GoodsItem} from '@/types/gift';
const GoodsFlatItem = ({item}: {item: GoodsItem}) => {
  const navigation = useNavigation<GoodsNavigationProp>();

  const gotoDetail = () => {
    navigation.navigate('GoodsDetail', {...item});
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
      <View style={{margin: 8, gap: 4}}>
        <Text style={commonStyle.REGULAR_77_14} numberOfLines={1}>
          {item.product.brand_name}
        </Text>
        <Text style={commonStyle.MEDIUM_33_18} numberOfLines={1}>
          {item.product.product_name}
        </Text>
        <View style={styles.priceWrapper}>
          <Text style={commonStyle.REGULAR_PRIMARY_16} numberOfLines={1}>
            {item.product.product_price.toLocaleString()}P
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 40,
    width: Dimensions.get('window').width / 2 - 24,
    resizeMode: 'contain',
    objectFit: 'contain',
    marginHorizontal: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
    paddingVertical: 1,
    marginHorizontal: 24,
  },
  itemImg: {
    width: Dimensions.get('window').width / 2 - 24,
    height: Dimensions.get('window').width / 2 - 24,
    borderColor: '#DDD',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    resizeMode: 'contain',
    objectFit: 'contain',
  },
  priceWrapper: {flexDirection: 'row', alignItems: 'center', gap: 4},
});
export default GoodsFlatItem;
