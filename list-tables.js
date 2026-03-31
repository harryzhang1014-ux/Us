import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://dkrobghdkdahtiysvutg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcm9iZ2hka2RhaHRpeXN2dXRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDE3NDI5OSwiZXhwIjoyMDg5NzUwMjk5fQ.CGQqjlEWOcJ0tEWYZxKRsxyo_mPEL-3Sccc3PzGCzdA');
async function list() {
  const { data, error } = await supabase.from('information_schema.tables').select('table_name').eq('table_schema', 'public');
  console.log(data || error);
}
list();
