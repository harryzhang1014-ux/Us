import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dkrobghdkdahtiysvutg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcm9iZ2hka2RhaHRpeXN2dXRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNzQyOTksImV4cCI6MjA4OTc1MDI5OX0.QYooB-6Oi1czyObwjtbya2o6I03-VYlXlSrUqJgXoGA';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcm9iZ2hka2RhaHRpeXN2dXRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDE3NDI5OSwiZXhwIjoyMDg5NzUwMjk5fQ.CGQqjlEWOcJ0tEWYZxKRsxyo_mPEL-3Sccc3PzGCzdA';

const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function check() {
  // create user
  const { data: user, error: userErr } = await supabaseAdmin.auth.admin.createUser({
    email: 'test12345@test.com',
    password: 'password123',
    email_confirm: true
  });
  console.log('user created:', user?.user?.id, userErr?.message);
  
  const { data: session, error: signInErr } = await supabase.auth.signInWithPassword({
    email: 'test12345@test.com',
    password: 'password123'
  });
  console.log('signed in:', session?.user?.id, signInErr?.message);

  const { data, error } = await supabase.from('notes').insert({
    pair_id: 'test_pair',
    author_id: session?.user?.id,
    content: '__ALBUM__:[]'
  }).select();
  console.log('insert note:', data, error);
}
check();
