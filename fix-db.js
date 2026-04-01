import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dkrobghdkdahtiysvutg.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcm9iZ2hka2RhaHRpeXN2dXRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDE3NDI5OSwiZXhwIjoyMDg5NzUwMjk5fQ.CGQqjlEWOcJ0tEWYZxKRsxyo_mPEL-3Sccc3PzGCzdA';

const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function run() {
  const sql = `
    -- Disable RLS for testing or create proper policies
    ALTER TABLE notes DISABLE ROW LEVEL SECURITY;
    ALTER TABLE sparks DISABLE ROW LEVEL SECURITY;
    ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
    ALTER TABLE pairings DISABLE ROW LEVEL SECURITY;
  `;
  
  // Actually, we can't run raw SQL from JS client without an RPC function.
  // But we can check if it works using admin client insert.
  const { data, error } = await supabaseAdmin.from('notes').insert({
    pair_id: 'test_pair',
    content: '__ALBUM__:[]'
  }).select();
  console.log('admin insert:', data, error);
}
run();
