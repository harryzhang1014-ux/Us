import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dkrobghdkdahtiysvutg.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcm9iZ2hka2RhaHRpeXN2dXRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDE3NDI5OSwiZXhwIjoyMDg5NzUwMjk5fQ.CGQqjlEWOcJ0tEWYZxKRsxyo_mPEL-3Sccc3PzGCzdA';
const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function clearAll() {
  console.log('🧹 Starting full database and auth cleanup...');

  // 1. Clear Data Tables
  console.log('Clearing sparks...');
  const { error: err1 } = await supabaseAdmin.from('sparks').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (err1) console.error('Error clearing sparks:', err1);

  console.log('Clearing notes (including albums & days matter)...');
  const { error: err2 } = await supabaseAdmin.from('notes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (err2) console.error('Error clearing notes:', err2);

  console.log('Clearing profiles...');
  const { error: err3 } = await supabaseAdmin.from('profiles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (err3) console.error('Error clearing profiles:', err3);

  console.log('Clearing pairings...');
  const { error: err4 } = await supabaseAdmin.from('pairings').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (err4) console.error('Error clearing pairings:', err4);

  // 2. Clear Auth Users
  console.log('Fetching all users...');
  const { data: usersData, error: uErr } = await supabaseAdmin.auth.admin.listUsers();
  if (uErr) {
    console.error('Error fetching users:', uErr);
  } else if (usersData && usersData.users) {
    console.log(`Found ${usersData.users.length} users to delete...`);
    for (const user of usersData.users) {
      const { error: dErr } = await supabaseAdmin.auth.admin.deleteUser(user.id);
      if (dErr) {
        console.error(`Failed to delete user ${user.email}:`, dErr);
      } else {
        console.log(`Deleted user: ${user.email}`);
      }
    }
  }

  console.log('✅ Cleanup finished successfully!');
}

clearAll();
