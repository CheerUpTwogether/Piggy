import axios from 'axios';
// 템플릿 조회 api
export const getGiftcons = async () => {
  try {
    const res = await axios.get(
      'https://gateway-giftbiz.kakao.com/openapi/giftbiz/v1/template?=page=0&size=20&status=REGISTERED',
      {
        headers: {
          Authorization: 'KakaoAK 96dc70e0d4196ce4d0643928cd4aaf84',
        },
      },
    );
    console.log(res);
    console.log('================');
    console.log(res.data);
  } catch (e) {
    console.log(e);
  }
};

// 선물 발송 api
export const getGifticon = async (
  template_token: string,
  phone_number: string,
) => {
  try {
    const response = await axios.post(
      'https://gateway-giftbiz.kakao.com/openapi/giftbiz/v1/template/order',
      {
        template_token: template_token,
        receiver_type: 'PHONE',
        receivers: [
          {
            name: '강현',
            receiver_id: phone_number,
            sender_name: '피기',
            mc_text: '축하드려요',
          },
        ],
        external_order_id: 'string', //요렇게 넣고 테스트 해볼까요? 아무값이나 괜춘한거 같아요
      },
      {
        headers: {
          Authorization: 'KakaoAK 96dc70e0d4196ce4d0643928cd4aaf84',
        },
      },
    );
    console.log('전달 값', response);
    return response.data.documents;
  } catch (error) {
    console.log(error);
  }
};
