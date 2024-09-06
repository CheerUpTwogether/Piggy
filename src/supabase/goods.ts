import supabase from '@/supabase/supabase';
import {getPiggySpb} from './AuthSpb';
export const buyGoodSpb = async (id: string, goodsPrice: string) => {
  const piggyData = await getPiggySpb(id);
  if (!piggyData) {
    return null;
  }

  const {data, error} = await supabase
    .from('piggy')
    .update({
      latest_piggy_count:
        parseInt(piggyData.latest_piggy_count) - parseInt(goodsPrice),
    })
    .eq('user_id', id)
    .select('latest_piggy_count');
  console.log(data);

  if (error) {
    return null;
  }

  return data ? data[0] : null;
};
