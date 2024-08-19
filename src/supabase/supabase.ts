import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {SUPABASE_URL, SUPABASE_KEY} from '@env';

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
