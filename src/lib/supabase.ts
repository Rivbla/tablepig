import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nvaagcgwnlpbtviuqvfa.supabase.co'
const supabaseKey = 'sb_secret_c5XjX7zDAA0CGX-LayK0jQ_hp2m0Lqf'

export const supabase = createClient(supabaseUrl, supabaseKey)
