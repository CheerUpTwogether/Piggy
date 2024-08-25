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

  const renderHotItem = ({item}: {item: dummyGoodsItem}) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.hotItemWrapper}>
      <Image source={{uri: item.goods_url}} style={styles.hotItemImg} />
    </TouchableOpacity>
  );

  const renderItem = ({item}: {item: dummyGoodsItem}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{marginVertical: 9, gap: 10}}
      onPress={() => gotoDetail(item)}>
      <View style={styles.itemWrapper}>
        <Text style={commonStyle.MEDIUM_FF_12}>추천 상품</Text>
      </View>
      <Image
        source={{uri: 'https://picsum.photos/120/120'}}
        style={styles.itemImg}
      />
      <View style={{marginHorizontal: 10, gap: 2}}>
        <Text style={commonStyle.MEDIUM_33_14} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={commonStyle.MEDIUM_33_16} numberOfLines={1}>
          {item.price.toLocaleString()}원
        </Text>
        <Text style={commonStyle.MEDIUM_AA_12} numberOfLines={1}>
          {item.sub_title}
        </Text>
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
      <Text style={styles.hotTitle}>이런 상품은 어떠신가요? 🔥</Text>

      <View style={{marginHorizontal: 16}}>
        <FlatList
          data={dummyGoodsItemData}
          horizontal={true}
          bounces={false}
          keyExtractor={item => item.id}
          renderItem={renderHotItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.categoryContainer}>
        <TabBar
          categories={categories}
          active={selectedCategory}
          onChange={setSelectedCategory}
        />
      </View>

      <View style={{height: 1, backgroundColor: '#DDD'}} />

      <View style={styles.itemContainer}>
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
  hotTitle: {
    ...commonStyle.MEDIUM_33_16,
    marginLeft: 24,
    marginTop: 14,
    marginBottom: 16,
  },
  hotItemWrapper: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 8,
  },
  hotItemImg: {
    width: 120,
    height: 120,
    borderRadius: 8,
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
    marginTop: 9,
    paddingBottom: 320,
    marginHorizontal: 24,
  },
  itemWrapper: {
    width: 70,
    height: 22,
    borderRadius: 20,
    backgroundColor: '#ED423F',
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    right: 10,
  },
  itemImg: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    borderColor: '#DDD',
  },
});

export default Goods;
