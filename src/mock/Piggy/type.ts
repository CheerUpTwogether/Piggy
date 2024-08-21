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
