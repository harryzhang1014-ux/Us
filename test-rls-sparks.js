import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = 'https://dkrobghdkdahtiysvutg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcm9iZ2hka2RhaHRpeXN2dXRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNzQyOTksImV4cCI6MjA4OTc1MDI5OX0.QYooB-6Oi1czyObwjtbya2o6I03-VYlXlSrUqJgXoGA';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function check() {
  const { data: session } = await supabase.auth.signInWithPassword({
    email: 'test12345@test.com',
    password: 'password123'
  });
  const { data, error } = await supabase.from('sparks').insert({
    pair_id: 'test_pair',
    user_id: session?.user?.id,
    date: '2026-03-27',
    completed: true
  }).select();
  console.log('insert sparks:', data, error);
  
  const { data: rData, error: rError } = await supabase.from('sparks').select('*');
  console.log('read sparks:', rData, rError);
}
check();
