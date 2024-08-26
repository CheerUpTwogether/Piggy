import axios from 'axios';

// 선물 발송 api
export const getGifticon = async (
  template_token: string,
  phone_number: string,
) => {
  try {
    const response = await axios.post(
      'https://gateway-giftbiz.kakao.com/openapi/giftbiz/v1/template/order',
      {
        data: {
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
        headers: {
          Authorization: `KakaoAK 96dc70e0d4196ce4d0643928cd4aaf84`,
        },
      },
    );
    console.log('전달 값', response);
    return response.data.documents;
  } catch (error) {
    console.log(error);
  }
};

// 선물하기 API 호출 함수
export const sendGift2 = async () => {
  const url =
    'https://gateway-giftbiz.kakao.com/openapi/giftbiz/v1/template/order';

  // 요청 데이터 구성
  const requestData = {
    data: {
      template_token: 'sdkasdasd', // 주어진 template token
      receiver_type: 'PHONE',
      receivers: [
        {
          name: '강현', // 받는 사람 이름
          receiver_id: '010-7162-5172', // 받는 사람 전화번호
          sender_name: '피기', // 보내는 사람 이름
          mc_text: '축하드려요', // 메시지 내용
        },
      ],
      external_order_id: 'string', // 외부 주문 ID (임의의 값)
    },
  };

  try {
    // Axios 요청
    const response = await axios.post(url, requestData, {
      headers: {
        Authorization: `KakaoAK 96dc70e0d4196ce4d0643928cd4aaf84`, // API Key
        'Content-Type': 'application/json', // 요청의 Content-Type
      },
    });

    console.log('선물 보내기 성공:', response.data);
  } catch (error) {
    // 에러 처리
    if (axios.isAxiosError(error)) {
      console.error('Axios 에러 발생:', error.response?.data);
    } else {
      console.error('알 수 없는 에러 발생:', error);
    }
  }
};
