import React, {useState, useCallback} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getGoodsAPI} from '@/api/kakao/gift';
import GoodsFlatItem from '@/components/goods/GoodsFlatItem';
import {GoodsList} from '@/types/gift';
import {commonStyle} from '@/styles/common';
import {useToastStore} from '@/store/store';
import SkeletonGoodsItem from '@/components/skeleton/SkeletonGoodsItem';

const Goods = () => {
  const [goods, setGoods] = useState<GoodsList>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const addToast = useToastStore(state => state.addToast);

  useFocusEffect(
    useCallback(() => {
      getGoods();
    }, []),
  );

  const getGoods = async () => {
    try {
      const res = await getGoodsAPI();
      setGoods(res.data.contents);
    } catch (e) {
      addToast({
        success: false,
        text: '상품 리스트를 가져오는데 실패했어요.',
      });
    } finally {
      setInitialLoading(false);
    }
  };

  // 스켈레톤 임시 데이터
  const skeletonData = Array.from({length: 6}).map((_, index) => ({
    product: {
      product_thumb_image_url: `skeleton-${index}`,
      product_name: '',
      brand_name: '',
      product_price: 0,
      brand_image_url: '',
      product_image_url: '',
    },
  }));

  return (
    <View style={styles.container}>
      <FlatList
        data={initialLoading ? skeletonData : goods}
        bounces={false}
        keyExtractor={item => item.product.product_thumb_image_url}
        renderItem={({item}) =>
          initialLoading ? <SkeletonGoodsItem /> : <GoodsFlatItem item={item} />
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderBanner}
        numColumns={2}
        style={{
          paddingHorizontal: 8,
        }}
      />
    </View>
  );
};

const renderBanner = () => {
  return (
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
    backgroundColor: '#efefef',
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: -20,
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
