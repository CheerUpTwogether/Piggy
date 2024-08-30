import {Database} from '@/types/supabase';

export type Appointment = Database['public']['Tables']['appointment']['Row'];
