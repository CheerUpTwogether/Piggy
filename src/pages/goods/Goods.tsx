import {commonStyle} from '@/styles/common';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {getGoodsAPI} from '@/api/kakao/gift';
import {GoodsNavigationProp} from './type';
import TabBar from '@/components/common/TabBar';
import {GoodsItem, GoodsProduct} from '@/types/gift';

const categories = [
  {
    label: '전체',
    value: 'all',
  },
  {
    label: '패스트푸드',
    value: 'fastfood',
  },
  {
    label: '카페',
    value: 'cafe',
  },
  {
    label: '스낵',
    value: 'snack',
  },
];

const Goods = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [goods, setGoods] = useState([]);
  const navigation = useNavigation<GoodsNavigationProp>();

  useFocusEffect(
    React.useCallback(() => {
      getGoods();
    }, []),
  );

  const getGoods = async () => {
    try {
      const res = await getGoodsAPI();
      setGoods(res.data.contents);
    } catch (e) {
      console.log(e);
    }
  };

  const gotoDetail = (item: GoodsProduct) => {
    navigation.navigate('GoodsDetail', {...item});
  };

  const renderItem = ({item}: {item: GoodsItem}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.itemContainer}
      onPress={() => gotoDetail(item.product)}>
      <Image
        source={{uri: item.product.product_thumb_image_url}}
        style={styles.itemImg}
        alt="goodsImage"
      />
      <View style={{marginHorizontal: 10, gap: 4}}>
        <Text style={commonStyle.MEDIUM_AA_14} numberOfLines={1}>
          {item.product.brand_name}
        </Text>
        <Text style={commonStyle.REGULAR_33_18} numberOfLines={1}>
          {item.product.product_name}
        </Text>
        <View style={styles.priceWrapper}>
          <Text style={commonStyle.MEDIUM_33_20} numberOfLines={1}>
            {item.product.product_price}
          </Text>
          <Text style={commonStyle.MEDIUM_PRIMARY_18}>Piggy</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://loremflickr.com/320/80/cat​',
        }}
        style={styles.bannerImg}
        alt="bannerImage"
      />

      <View style={styles.categoryContainer}>
        <TabBar
          categories={categories}
          active={selectedCategory}
          onChange={setSelectedCategory}
        />
      </View>

      <View style={{height: 1, backgroundColor: '#DDD'}} />

      <View>
        <FlatList
          data={goods}
          bounces={false}
          keyExtractor={item => item.product.product_thumb_image_url}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingBottom: 120,
    borderRadius: 100,
    borderColor: '#efefef',
  },
  bannerImg: {
    width: '100%',
    height: 80,
  },
  categoryContainer: {
    //height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
    paddingVertical: 1,
    marginHorizontal: 24,
  },
  categoryTitle: {
    ...commonStyle.MEDIUM_77_18,
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

export default Goods;
