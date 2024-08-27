import {commonStyle} from '@/styles/common';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {dummyGoodsItem} from '@/mock/Goods/types';
import {dummyGoodsItemData} from '@/mock/Goods/Goods';
import TabBar from '@/components/common/TabBar';

const Goods = () => {
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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigation = useNavigation();

  const gotoDetail = (item: dummyGoodsItem) => {
    navigation.navigate('GoodsDetail', {...item});
  };

  const renderItem = ({item}: {item: dummyGoodsItem}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.itemContainer}
      onPress={() => gotoDetail(item)}>
      <Image
        source={{uri: item.product_thumb_image_url}}
        style={styles.itemImg}
      />
      <View style={{marginHorizontal: 10, gap: 4}}>
        <Text style={commonStyle.MEDIUM_AA_14} numberOfLines={1}>
          {item.brand_name}
        </Text>
        <Text style={commonStyle.MEDIUM_33_16} numberOfLines={1}>
          {item.product_name}
        </Text>
        <View style={styles.priceWrapper}>
          <Text style={commonStyle.MEDIUM_33_16} numberOfLines={1}>
            {item.product_price.toLocaleString()}
          </Text>
          <Text style={commonStyle.MEDIUM_PRIMARY_16}>Piggy</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <Image
        source={{
          uri: 'https://loremflickr.com/320/80/cat​',
        }}
        style={styles.bannerImg}
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
          data={dummyGoodsItemData}
          bounces={false}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bannerImg: {
    width: '100%',
    height: 80,
  },
  categoryContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 12,
    paddingVertical: 1,
    marginHorizontal: 24,
  },
  categoryTitle: {
    ...commonStyle.MEDIUM_77_18,
  },
  itemContainer: {
    marginBottom: 40,
    gap: 10,
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
