import {KAKAO_API_KEY} from '@env';
import axios from 'axios';
import {bakcInstance} from '../fcm';
import {getItemSession} from '@/utils/auth';

export const instance = axios.create({
  baseURL: 'https://gateway-giftbiz.kakao.com',
  headers: {
    Authorization: `KakaoAK ${KAKAO_API_KEY}`,
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

// 실제 선물 발송 코드(주의 요함)
export const sendGoodAPI = async (
  phone_number: string,
  template_trace_id: string,
) => {
  const session = await getItemSession();

  const res = await bakcInstance.post(
    '/sendGift',
    {
      phone_number,
      template_trace_id,
    },
    {
      headers: {
        Authorization: session ? `Bearer ${session.access_token}` : '',
        'Content-Type': 'application/json',
      },
    },
  );
  return res;
};
