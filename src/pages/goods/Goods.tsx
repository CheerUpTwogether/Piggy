import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getGoodsAPI} from '@/api/kakao/gift';
import GoodsFlatItem from '@/assets/goods/GoodsFlatItem';
import {GoodsList} from '@/types/gift';
import {commonStyle} from '@/styles/common';

const Goods = () => {
  const [goods, setGoods] = useState<GoodsList>([]);

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

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={goods}
          bounces={false}
          keyExtractor={item => item.product.product_thumb_image_url}
          renderItem={({item}) => <GoodsFlatItem item={item} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.bannerContainer}>
              <Image
                source={require('@/assets/icons/gift.png')}
                alt="bannerImage"
                style={styles.bannerImg}
              />
              <View>
                <Text style={styles.bannerText}>
                  적립하신 피기로 상품을 구매해보세요
                </Text>
              </View>
            </View>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    borderColor: '#efefef',
  },
  bannerContainer: {
    height: 80,
    backgroundColor: '#FFD9D8',
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImg: {
    width: 52,
    height: 52,
  },
  bannerText: {
    ...commonStyle.MEDIUM_33_18,
    padding: 8,
  },
});

export default Goods;
