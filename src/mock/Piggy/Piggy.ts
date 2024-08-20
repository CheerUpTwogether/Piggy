interface PiggyUsageHistoryProps {
  usage_history_id: number;
  type: 'charge' | 'gift' | 'panalty';
  piggy: number;
  amount: number;
  date: string;
  time?: string;
  nick_name?: string;
  appointment_title?: string;
}
export const piggyUsageHistories: PiggyUsageHistoryProps[] = [
  {
    usage_history_id: 1,
    type: 'charge',
    piggy: 100000,
    amount: 100000,
    date: '2024년 8월 01일',
    time: '00시 18분',
  },
  {
    usage_history_id: 2,
    nick_name: '육스틴',
    type: 'gift',
    piggy: 100000,
    amount: 200000,
    date: '2024년 8월 01일',
    time: '14시 21분',
  },
  {
    usage_history_id: 3,
    nick_name: '칠스틴',
    type: 'gift',
    piggy: -50000,
    amount: 150000,
    date: '2024년 8월 01일',
    time: '14시 21분',
  },
  {
    usage_history_id: 4,
    appointment_title: '또 늦어보지 왜?',
    type: 'panalty',
    piggy: 12000,
    amount: 162000,
    date: '2024년 8월 01일',
    time: '14시 31분',
  },
  {
    usage_history_id: 4,
    appointment_title: '강남역 리액트 스터디 1회차',
    type: 'panalty',
    piggy: -7000,
    amount: 157000,
    date: '2024년 8월 01일',
    time: '14시 31분',
  },
];
