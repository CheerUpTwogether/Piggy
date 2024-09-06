import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {commonStyle} from '@/styles/common';
import {useRoute, RouteProp} from '@react-navigation/native';
import Button from '@/components/common/Button';
import {RootStackParamList} from '@/types/Router';
import {useToastStore, useUserStore} from '@/store/store';
import {sendGoodAPI} from '@/api/kakao/gift';
import {buyGoodSpb} from '@/supabase/goods';

const GoodsDetail = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'GoodsDetail'>>();
  const addToast = useToastStore(state => state.addToast);
  const {template_name, template_trace_id, product} = route.params;
  const {
    brand_name,
    product_name,
    product_price,
    product_thumb_image_url,
    brand_image_url,
  } = product;
  console.log();
  const {userData, setUserDataByKey} = useUserStore();

  const handleBuyGood = async () => {
    if (userData) {
      const data = await buyGoodSpb(userData.id, product_price);
      if (!data) {
        // 수파베이스 요청 실패
        addToast({
          success: false,
          text: '구매에 실패했습니다.',
          multiText: '관리자에게 문의해주세요.',
        });
        return;
      }
      const res = await sendGoodAPI(userData.phone_number, template_trace_id);
      if (res.status === 200) {
        // 피기 전역 정보 업데이트
        setUserDataByKey('piggy', data.latest_piggy_count);
        addToast({
          success: true,
          text: '성공적으로 구매하셨습니다.',
          multiText: '휴대전화를 확인해주세요!.',
        });
      } else {
        // 노드 서버 요청 실패
        addToast({
          success: false,
          text: '구매에 실패했습니다.',
          multiText: '관리자에게 문의해주세요.',
        });
      }
    }
  };

  return (
    userData && (
      <View style={commonStyle.container}>
        <View style={{alignItems: 'center', marginTop: 42, marginBottom: 42}}>
          <Image
            source={{uri: product_thumb_image_url}}
            style={{width: 244, height: 244, borderRadius: 8}}
            alt={`${product_name}Image`}
          />
        </View>
        <View style={{gap: 14, marginVertical: 8}}>
          <Text style={{...commonStyle.REGULAR_33_20, textAlign: 'center'}}>
            {product_name}
          </Text>
          <View style={styles.goodsPriceContainer}>
            <Text style={commonStyle.BOLD_33_20}>
              {new Intl.NumberFormat('ko-KR').format(product_price)}
            </Text>
            <Text style={commonStyle.BOLD_PRIMARY_20}>P</Text>
          </View>
        </View>

        <View style={styles.goodsDetailContainer}>
          <View style={{gap: 2}}>
            <Text style={commonStyle.REGULAR_99_14}>사용처</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{uri: brand_image_url}}
                style={{width: 32, height: 32, borderRadius: 8}}
                alt={`${brand_image_url}Image`}
              />
              <Text style={commonStyle.REGULAR_33_16}>{brand_name}</Text>
            </View>
          </View>
        </View>
        <Text style={{...commonStyle.MEDIUM_PRIMARY_12, marginVertical: 10}}>
          *해당 쿠폰은 일부 점포에서는 취급하지 않는 상품일 수 있습니다.
        </Text>

        <View style={{marginVertical: 24}}>
          <Button
            text="구매"
            disable={userData.piggy >= product_price ? false : true}
            onPress={() => {
              handleBuyGood();
            }}
            size="full"
          />
        </View>
      </View>
    )
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
