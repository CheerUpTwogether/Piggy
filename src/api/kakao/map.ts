import {KAKAO_API_KEY} from '@env';
import axios from 'axios';

// 키워드 검색
export const searchLocation = async (
  keyword: string,
  latitude: number,
  longitude: number,
) => {
  try {
    const response = await axios.get(
      'https://dapi.kakao.com/v2/local/search/keyword.json',
      {
        params: {
          query: keyword,
          x: longitude,
          y: latitude,
          // radius : 1500 => 반경 추가가능 단위 (m)
        },
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      },
    );

    return response.data.documents;
  } catch (error) {
    console.error(error);
  }
};

// 주소 검색
export const searchAddress = async (address: string) => {
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      },
    );

    return response.data.documents;
  } catch (error) {
    console.error(error);
  }
};
