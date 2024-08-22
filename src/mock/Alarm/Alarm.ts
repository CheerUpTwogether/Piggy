export const noticeDetail = {
  join: '약속에 초대되었어요',
  cancel_request: '약속 취소 요청이 왔어요',
  update_request: '약속 변경 요청이 왔어요',
  update: '약속이 변경되었어요',
  delete: '약속이 파기되었어요',
  accomplish: '약속이 성사되었어요',
  corner: '약속 10분 전이에요',
  getPiggyPanalty: '약속 벌금이 들어왔어요',
  givePiggyPanalty: '약속 벌금이 나갔어요',
  getPiggyGift: '피기를 선물받았어요',
  givePiggyGift: '피기를 선물했어요',
  chargePiggy: '피기를 충전했어요',
  buyGoods: '상품을 구매했어요',
};

export const notices = [
  {
    detail: 'join', // '약속에 초대되었어요',
    appointment_id: 1,
    appointment_title: '또 늦어보지 왜?',
    date: '2024년 8월 15일 12:30',
  },
  {
    type: 'cancel_request', //'약속 취소 요청이 왔어요',
    appointment_id: 2,
    appointment_title: '또 늦어보지 왜?',
    date: '2024년 8월 15일 12:30',
    uid: 1,
    nick_name: '홍길동',
  },
  {
    type: 'update', // '약속 변경 요청이 왔어요'
    appointment_id: 2,
    appointment_title: '또 늦어보지 왜?',
    date: '2024년 8월 15일 12:30',
    uid: 2,
    nick_name: '홍길동',
  },
  {
    type: 'delete', // '약속이 파기되었어요'
    title: '약속 파기',
    appointment_id: 1,
    appointment_title: '또 늦어보지 왜?',
    date: '2024년 8월 15일 12:30',
  },
  {
    type: 'accomplish', //accomplish: '약속이 성사되었어요',
    appointment_id: 1,
    appointment_title: '또 늦어보지 왜?',
    date: '2024년 8월 15일 12:30',
  },
  {
    type: 'corner', // corner: '약속 10분 전이에요'
    appointment_id: 1,
    appointment_title: '또 늦어보지 왜?',
    date: '2024년 8월 15일 12:30',
  },
  {
    type: 'getPiggyPanalty', // getPiggyPanalty: '약속 벌금이 들어왔어요',
    appointment_id: 1,
    appointment_title: '또 늦어보지 왜?',
    date: '2024년 8월 15일 12:30',
  },
  {
    type: 'getPiggyPanalty', // givePiggyPanalty: '약속 벌금이 나갔어요',
    appointment_id: 1,
    appointment_title: '또 늦어보지 왜?',
    date: '2024년 8월 15일 12:30',
  },
  {
    type: 'getPiggyGift', // getPiggyGift: '피기를 선물받았어요',
    uid: 2,
    nick_name: '홍길동',
    date: '2024년 8월 15일 12:30',
    piggy: 10000,
  },
  {
    type: 'givePiggyGift', // givePiggyGift: '피기를 선물했어요',
    uid: 2,
    nick_name: '홍길동',
    date: '2024년 8월 15일 12:30',
    piggy: 5000,
  },
  {
    type: 'chargePiggy', // chargePiggy: '피기를 충전했어요',
    date: '2024년 8월 15일 12:30',
    piggy: 5000,
  },
  {
    type: 'chargePiggy', // buyGoods: '상품을 구매했어요',
    date: '2024년 8월 15일 12:30',
    piggy: 5000,
  },
];
