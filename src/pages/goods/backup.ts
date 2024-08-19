import React, {useState, useRef} from 'react';
import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {dummyGoodsItemData} from '@/mook/goods/goods';
import {dummyGoodsItem} from '@/mook/goods/types';
import {commonStyle} from '@/styles/common';

const Goods = () => {
  const categories = ['전체', '패스트푸드', '카페', '스낵'];
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const scrollY = useRef(new Animated.Value(0)).current;

  const renderHotItem = ({item}: {item: dummyGoodsItem}) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.hotItemWrapper}>
      <Image source={{uri: item.goods_url}} style={styles.hotItemImg} />
    </TouchableOpacity>
  );

  const renderItem = ({item}: {item: dummyGoodsItem}) => (
    <TouchableOpacity activeOpacity={0.8} style={{marginVertical: 9, gap: 10}}>
      <View style={styles.itemWrapper}>
        <Text style={{...commonStyle.MEDIUM_FF_12}}>추천 상품</Text>
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
          {item.price}원
        </Text>
        <Text style={commonStyle.MEDIUM_AA_12} numberOfLines={1}>
          {item.sub_title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <Animated.View
        style={[
          styles.bannerContainer,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, -80],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <Image
          source={{
            uri: 'https://loremflickr.com/320/80/cat​',
          }}
          style={styles.bannerImg}
        />
        <Text style={styles.hotTitle}>이런 상품은 어떠신가요? 🔥</Text>

        <FlatList
          data={dummyGoodsItemData}
          horizontal={true}
          bounces={false}
          keyExtractor={item => item.id}
          renderItem={renderHotItem}
          showsHorizontalScrollIndicator={false}
          style={styles.hotList}
        />
      </Animated.View>

      <View style={styles.categoryContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}>
            <Text
              style={[
                styles.categoryTitle,
                selectedCategory === category && {color: '#ED423F'},
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{height: 1, backgroundColor: '#DDD'}} />

      <Animated.FlatList
        data={dummyGoodsItemData}
        bounces={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        style={styles.itemContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
  },
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
  hotList: {
    marginHorizontal: 16,
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
    gap: 6,
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
    height: 144,
    borderRadius: 8,
    borderColor: '#DDD',
  },
});

export default Goods;
