import { createClient } from '@supabase/supabase-js'

const supabaseUrl = __api.env.SUPABASE_URL;
const supabaseAnonKey = __api.env.SUPABASE_PUBLIC_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
