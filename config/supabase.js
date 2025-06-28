import { createClient } from '@supabase/supabase-js'
import { SUPABASE_API_KEY } from './config.js'

const supabaseUrl = 'https://zinrbwrqoewbpebyjqdo.supabase.co'
const supabaseKey = SUPABASE_API_KEY
export const USER_FILES_BUCKET = 'user-files'
export const supabase = createClient(supabaseUrl, supabaseKey)
