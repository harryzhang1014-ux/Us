import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dkrobghdkdahtiysvutg.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcm9iZ2hka2RhaHRpeXN2dXRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDE3NDI5OSwiZXhwIjoyMDg5NzUwMjk5fQ.CGQqjlEWOcJ0tEWYZxKRsxyo_mPEL-3Sccc3PzGCzdA';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function main() {
  const sql = `
    CREATE TABLE IF NOT EXISTS albums (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      created_at TIMESTAMPTZ DEFAULT now(),
      pair_id TEXT NOT NULL,
      author_id UUID REFERENCES auth.users(id),
      url TEXT NOT NULL,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS days_matter (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      created_at TIMESTAMPTZ DEFAULT now(),
      pair_id TEXT NOT NULL,
      author_id UUID REFERENCES auth.users(id),
      title TEXT NOT NULL,
      date TEXT NOT NULL
    );
  `;
  // There is no rpc('exec_sql') by default unless we set it up. We can just use REST API if there's a way.
}
main();
