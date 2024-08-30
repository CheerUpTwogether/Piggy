import {SUPABASE_URL, SUPABASE_KEY} from '@env';
import {createClient, SupabaseClient} from '@supabase/supabase-js';

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
