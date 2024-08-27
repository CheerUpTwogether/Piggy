import {HelpItem} from './types';

export const dummy_Help_list: HelpItem[] = [
  {
    id: '3',
    subject: '프로필 이미지 변경은 어떻게 하나요?',
    contents:
      '안녕하세요. 프로필 이미지 관련 문의 드립니다. 프로필 변경을 하고 싶은데 제가 바꾸려는 이미지가 적용이 안 돼요. 아래 사진 첨부했는데 고쳐줘용~',
    email: 'test@email.com',
    img_url: [
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
    ],
    date: '2024년 8월 15일 목요일',
    response: false,
    response_date: '',
    response_data: '',
  },
  {
    id: '2',
    subject: '상품 유효기간이 지나면 어떻게 되나요?',
    contents:
      '안녕하세요. 지난 달 피기로 GS25 편의점 3000원권을 구매했습니다. 그동안 확인을 못하고 있어서 유효기간이 지났는데 사용하거나 환불받을 수 있나요?',
    email: 'usetEmail@email.com',
    img_url: [],
    date: '2024년 8월 11일 일요일',
    response: true,
    response_date: '2024년 8월 13일 화요일',
    response_data:
      '이용에 불편을 드려서 죄송합니다.아쉽지만 프로필 이미지는 jpg 형식만 입력할 수 있습니다. 이미지 형식을 확인 후 다시 시도해주세요.',
  },
  {
    id: '1',
    subject: '상품 유효기간이 지나면 어떻게 되나요?',
    contents:
      '안녕하세요. 지난 달 피기로 GS25 편의점 3000원권을 구매했습니다. 근데 확인을 못하고 있어서 유효기간이 지났는데 사용하거나 환불받을 수 있나요?',
    email: 'usetEmail@email.com',
    img_url: [
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
    ],
    date: '2024년 8월 11일 일요일',
    response: true,
    response_date: '2024년 8월 13일 화요일',
    response_data:
      '이용에 불편을 드려서 죄송합니다. 아쉽지만 현재 따로 환불 시스템은 없습니다.',
  },
];
