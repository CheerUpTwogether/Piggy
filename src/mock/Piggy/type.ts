export interface PiggyUsageHistoryProps {
  usage_history_id: number;
  type: 'charge' | 'gift' | 'panalty';
  piggy: number;
  amount: number;
  date: string;
  time?: string;
  nick_name?: string;
  appointment_title?: string;
  image_url?: string;
}

// 이동 완료
export interface PiggyUsageHistoryProps2 {
  id: number;
  changed_category: string;
  diff_piggy_count: number;
  present_piggy_count: number;
  diff_piggy_date: string;
  nick_name?: string;
  appointment_title?: string;
  image_url?: string;
}

export interface PiggyShopListProps {
  id: number;
  price: number;
}
