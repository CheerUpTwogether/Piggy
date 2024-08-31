import {Database} from '@/types/supabase';

export interface FapData {
  question: string;
  answer: string;
  created_at: string;
}

export type Inquiry = Database['public']['Tables']['inquiry_log']['Insert'];
