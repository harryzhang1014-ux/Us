import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const SUPABASE_URL = 'https://dkrobghdkdahtiysvutg.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcm9iZ2hka2RhaHRpeXN2dXRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDE3NDI5OSwiZXhwIjoyMDg5NzUwMjk5fQ.CGQqjlEWOcJ0tEWYZxKRsxyo_mPEL-3Sccc3PzGCzdA';
const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const testPrefix = `test_${crypto.randomBytes(4).toString('hex')}`;
const user1Email = `${testPrefix}_1@test.com`;
const user2Email = `${testPrefix}_2@test.com`;
const password = 'password123';

async function runTests() {
  console.log('--- Starting Integration Tests ---');
  
  // 1. Auth Tests
  console.log('\n1. Testing Auth Flow...');
  const { data: user1, error: u1Err } = await supabaseAdmin.auth.admin.createUser({ email: user1Email, password, email_confirm: true, user_metadata: { name: 'User 1' } });
  const { data: user2, error: u2Err } = await supabaseAdmin.auth.admin.createUser({ email: user2Email, password, email_confirm: true, user_metadata: { name: 'User 2' } });
  if (u1Err || u2Err) return console.error('Auth setup failed:', u1Err || u2Err);
  console.log('✅ Users created successfully');

  // 2. Pairing Tests
  console.log('\n2. Testing Pairing Flow...');
  const code = 'TEST' + crypto.randomBytes(2).toString('hex').toUpperCase();
  const pairId = `pair_${Date.now()}`;
  
  const { error: p1Err } = await supabaseAdmin.from('pairings').insert({ code, creator_id: user1.user.id, creator_name: 'User 1', pair_id: pairId, status: 'pending' });
  if (p1Err) return console.error('Create pairing failed:', p1Err);
  console.log('✅ Pairing code created');

  const { error: p2Err } = await supabaseAdmin.from('pairings').update({ partner_id: user2.user.id, partner_name: 'User 2', status: 'completed' }).eq('code', code);
  if (p2Err) return console.error('Join pairing failed:', p2Err);
  
  await supabaseAdmin.from('profiles').upsert({ id: user1.user.id, pair_id: pairId, partner_id: user2.user.id, partner_name: 'User 2' });
  await supabaseAdmin.from('profiles').upsert({ id: user2.user.id, pair_id: pairId, partner_id: user1.user.id, partner_name: 'User 1' });
  console.log('✅ Pairing joined successfully');

  // 3. Core Features Tests
  console.log('\n3. Testing Core Features...');
  
  // 3.1 Notes
  const noteContent = 'Hello from User 1';
  const { data: note, error: nErr } = await supabaseAdmin.from('notes').insert({ pair_id: pairId, author_id: user1.user.id, content: noteContent }).select().single();
  if (nErr) return console.error('Note creation failed:', nErr);
  console.log('✅ Shared Note created');

  const { data: notes, error: nReadErr } = await supabaseAdmin.from('notes').select('*').eq('pair_id', pairId);
  if (nReadErr || !notes.find(n => n.content === noteContent)) return console.error('Note read failed:', nReadErr);
  console.log('✅ Shared Note read back successfully');

  // 3.2 Sparks
  const today = new Date().toISOString().split('T')[0];
  const { error: sErr } = await supabaseAdmin.from('sparks').insert({ pair_id: pairId, user_id: user1.user.id, date: today, completed: true });
  if (sErr) return console.error('Spark creation failed:', sErr);
  console.log('✅ Spark created');

  const { data: sparks, error: sReadErr } = await supabaseAdmin.from('sparks').select('*').eq('pair_id', pairId).eq('date', today);
  if (sReadErr || sparks.length === 0) return console.error('Spark read failed:', sReadErr);
  console.log('✅ Spark read back successfully');

  // 3.3 Album (via Notes table)
  const albumData = '[ALBUM]:[{"id":"1","src":"test.jpg"}]';
  const { error: aErr } = await supabaseAdmin.from('notes').insert({ pair_id: pairId, author_id: user1.user.id, content: albumData });
  if (aErr) return console.error('Album save failed:', aErr);
  console.log('✅ Album photos saved');

  // 3.4 Days Matter (via Notes table)
  const daysData = '[DAYS_MATTER]:[{"id":"1","title":"Anniversary","type":"anniversary"}]';
  const { error: dErr } = await supabaseAdmin.from('notes').insert({ pair_id: pairId, author_id: user1.user.id, content: daysData });
  if (dErr) return console.error('Days Matter save failed:', dErr);
  console.log('✅ Days Matter saved');

  console.log('\n--- All Integration Tests Passed! ---');
  
  // Cleanup
  console.log('\nCleaning up test data...');
  await supabaseAdmin.from('sparks').delete().eq('pair_id', pairId);
  await supabaseAdmin.from('notes').delete().eq('pair_id', pairId);
  await supabaseAdmin.from('profiles').delete().in('id', [user1.user.id, user2.user.id]);
  await supabaseAdmin.from('pairings').delete().eq('pair_id', pairId);
  await supabaseAdmin.auth.admin.deleteUser(user1.user.id);
  await supabaseAdmin.auth.admin.deleteUser(user2.user.id);
  console.log('✅ Cleanup complete');
}

runTests();
