import {Database} from '@/types/supabase';

export interface FapData {
  question: string;
  answer: string;
  created_at: string;
}

export type InquiryBase = Database['public']['Tables']['inquiry_log']['Insert'];

export interface InquiryDetail {
  id: number;
  subject: string;
  contents: string;
  email: string;
  inquiry_date: string;
  response: string | null;
  response_date: string | null;
  img_url?: string[];
}

export type HelpDetailRouteParams = {
  HelpDetail: {
    id: string;
  };
};

export interface Inquiry {
  id: number;
  subject: string;
  contents: string;
  email: string;
  inquiry_date: string;
  response: string | null;
  response_date: string | null;
}
