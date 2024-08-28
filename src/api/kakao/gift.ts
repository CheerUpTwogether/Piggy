import {KAKAO_BIZ_API_KEY} from '@env';
import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://gateway-giftbiz.kakao.com',
  headers: {
    Authorization: `KakaoAK ${KAKAO_BIZ_API_KEY}`,
  },
});

// 상품 리스트
// https://giftbiz-kakao.readme.io/reference/inquirytemplatelist
export const getGoodsAPI = () => {
  return instance.get(
    '/openapi/giftbiz/v1/template?=page=0&size=20&status=ALIVE',
  );
};

// 상품 상세
// https://giftbiz-kakao.readme.io/reference/inquiryordertemplate
export const getGoodAPI = () => {
  return instance.get(
    '/openapi/giftbiz/v1/template?=page=0&size=20&status=ALIVE',
  );
};
