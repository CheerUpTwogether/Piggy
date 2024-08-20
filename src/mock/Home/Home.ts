import {AppointmentProps} from './type';

export const appointments: AppointmentProps[] = [
  {
    appointment_id: 1,
    subject: '강남역 리액트 스터디 1회차',
    location: '서울 강남구 강남대로84길',
    date: '2024년 8월 31일',
    time: '18시 30분',
    penalty: 10000,
    isFixed: true,
    isCanceled: false,
    friends: [
      {
        uid: 1,
        url: 'https://i.pravatar.cc/250',
      },
      {
        uid: 2,
        url: 'https://i.pravatar.cc/250',
      },
      {
        uid: 3,
        url: 'https://i.pravatar.cc/250',
      },
    ],
  },
  {
    appointment_id: 4,
    subject: '강남역 리액트 스터디 2회차',
    location: '서울 강남구 강남대로84길',
    date: '2024년 9월 6일',
    time: '18시 30분',
    penalty: 5000,
    isFixed: false,
    isCanceled: true,
    friends: [
      {
        uid: 1,
        url: 'https://i.pravatar.cc/250',
      },
      {
        uid: 2,
        url: 'https://i.pravatar.cc/250',
      },
      {
        uid: 3,
        url: 'https://i.pravatar.cc/250',
      },
      {
        uid: 4,
        url: 'https://i.pravatar.cc/250',
      },
      {
        uid: 5,
        url: 'https://i.pravatar.cc/250',
      },
    ],
  },
  {
    appointment_id: 2,
    subject: '또 늦어보지 왜?',
    location: '서울 용산구 한강대로 405',
    date: '2024년 9월 17일',
    time: '07시 30분',
    penalty: 50000,
    isFixed: false,
    isCanceled: false,
    friends: [
      {
        uid: 1,
        url: 'https://i.pravatar.cc/250',
      },
      {
        uid: 2,
        url: 'https://i.pravatar.cc/250',
      },
      {
        uid: 3,
        url: 'https://i.pravatar.cc/250',
      },
      {
        uid: 4,
        url: 'https://i.pravatar.cc/250',
      },
      {
        uid: 5,
        url: 'https://i.pravatar.cc/250',
      },
    ],
  },
  {
    appointment_id: 3,
    subject: '지각은 쥬금뿐.',
    location: '경기도 용인시 수지구 만현로44',
    date: '2024년 9월 30일',
    time: '17시 00분',
    penalty: 5000,
    isFixed: false,
    isCanceled: false,
    friends: [
      {
        uid: 1,
        url: 'https://i.pravatar.cc/250',
      },
      {
        uid: 2,
        url: 'https://i.pravatar.cc/250',
      },
      {
        uid: 3,
        url: 'https://i.pravatar.cc/250',
      },
      {
        uid: 4,
        url: 'https://i.pravatar.cc/250',
      },
      {
        uid: 5,
        url: 'https://i.pravatar.cc/250',
      },
    ],
  },
];
