import supabase from '@/supabase/supabase';
import {getPiggySpb} from './AuthSpb';

// 템플릿 정보 조회 (토큰 x)
export const getTemplateInfoSpb = async (template_trace_id: string) => {
  const {data, error} = await supabase
    .from('gift_template_info')
    .select('id, template_trace_id, template_name, template_description, price')
    .eq('template_trace_id', template_trace_id);
  if (error) {
    return null;
  }

  return data ? data[0] : null;
};
