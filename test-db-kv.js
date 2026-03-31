import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dkrobghdkdahtiysvutg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcm9iZ2hka2RhaHRpeXN2dXRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNzQyOTksImV4cCI6MjA4OTc1MDI5OX0.QYooB-6Oi1czyObwjtbya2o6I03-VYlXlSrUqJgXoGA';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function check() {
  const { data, error } = await supabase.from('kv_store_99bff791').select('*').limit(1);
  console.log('kv_store:', data, error);
}
check();
