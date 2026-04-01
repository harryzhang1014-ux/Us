import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const SUPABASE_URL = `https://${projectId}.supabase.co`;

// Singleton Supabase client
const _supabase = createClient(SUPABASE_URL, publicAnonKey);
export function getSupabase() {
  return _supabase;
}

async function getDbPairContext(userId: string) {
  const sb = getSupabase();
  const { data: profile } = await sb
    .from('profiles')
    .select('pair_id, partner_id, partner_name')
    .eq('id', userId)
    .maybeSingle();

  if (profile?.pair_id) {
    return {
      pairId: profile.pair_id as string,
      partnerId: (profile.partner_id || '') as string,
      partnerName: (profile.partner_name || '') as string,
    };
  }

  const { data: pCreator } = await sb
    .from('pairings')
    .select('*')
    .eq('creator_id', userId)
    .eq('status', 'completed')
    .maybeSingle();
  const { data: pPartner } = await sb
    .from('pairings')
    .select('*')
    .eq('partner_id', userId)
    .eq('status', 'completed')
    .maybeSingle();

  const match = pCreator || pPartner;
  if (!match) return null;

  const isCreator = match.creator_id === userId;
  return {
    pairId: match.pair_id as string,
    partnerId: (isCreator ? match.partner_id : match.creator_id) as string,
    partnerName: (isCreator ? match.partner_name : match.creator_name) as string,
  };
}

// ============ Local storage helpers ============
export function lsGet<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}
export function lsSet(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getUserKey(suffix: string): string {
  const storageKey = `sb-${projectId}-auth-token`;
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      const uid = parsed?.user?.id || 'anon';
      return `unitespark_${uid}_${suffix}`;
    }
  } catch {}
  return `unitespark_anon_${suffix}`;
}
export { getUserKey };

// ============ Auth ============
export async function signup(name: string, email: string, password: string) {
  const sb = getSupabase();
  const { data, error } = await sb.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) throw new Error(error.message);
  if (!data.user) throw new Error('Registration failed: no user returned');

  if (!data.session) {
    const { data: signInData, error: signInError } = await sb.auth.signInWithPassword({ email, password });
    if (signInError) return { userId: data.user.id, session: null, confirmationRequired: true };
    return { userId: data.user.id, session: signInData.session, confirmationRequired: false };
  }

  lsSet(getUserKey('profile'), { name, email, avatar: '', partnerId: '', partnerName: '', pairId: '' });
  return { userId: data.user.id, session: data.session, confirmationRequired: false };
}

export async function login(email: string, password: string) {
  const sb = getSupabase();
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
}

export async function signOut() {
  const sb = getSupabase();
  await sb.auth.signOut();
}

export async function getSession() {
  const sb = getSupabase();
  const { data } = await sb.auth.getSession();
  return data?.session;
}

// ============ Profile ============
export async function getMyProfile() {
  const sb = getSupabase();
  const { data: sessionData } = await sb.auth.getSession();
  const user = sessionData?.session?.user;
  if (user) {
    try {
      let { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
      
      if (!profile?.pair_id) {
        const { data: pCreator } = await sb.from('pairings').select('*').eq('creator_id', user.id).eq('status', 'completed').maybeSingle();
        const { data: pPartner } = await sb.from('pairings').select('*').eq('partner_id', user.id).eq('status', 'completed').maybeSingle();
        const pMatch = pCreator || pPartner;
        if (pMatch) {
          const isCreator = pMatch.creator_id === user.id;
          const pairInfo = {
            pair_id: pMatch.pair_id,
            partner_id: isCreator ? pMatch.partner_id : pMatch.creator_id,
            partner_name: isCreator ? pMatch.partner_name : pMatch.creator_name
          };
          await sb.from('profiles').upsert({ id: user.id, ...pairInfo });
          profile = { ...profile, ...pairInfo };
        }
      }

      if (profile) {
        return {
          id: user.id,
          name: profile.name || user.user_metadata?.name || '',
          email: user.email || '',
          avatar: profile.avatar ?? '',
          pairId: profile.pair_id || '',
          partnerId: profile.partner_id || '',
          partnerName: profile.partner_name || '',
        };
      }
    } catch (err) { console.error('getMyProfile DB error:', err); }
  }

  const stored = lsGet(getUserKey('profile'), {});
  return {
    id: user?.id || '',
    name: stored.name || user?.user_metadata?.name || '',
    email: stored.email || user?.email || '',
    avatar: stored.avatar || '',
    partnerId: stored.partnerId || '',
    partnerName: stored.partnerName || '',
    pairId: stored.pairId || '',
  };
}

export async function updateMyProfile(updates: { avatar?: string; name?: string; pair_id?: string; partner_id?: string; partner_name?: string }) {
  const profile = lsGet(getUserKey('profile'), {});
  lsSet(getUserKey('profile'), { ...profile, ...updates });
  
  const sb = getSupabase();
  const { data: sessionData } = await sb.auth.getSession();
  const userId = sessionData?.session?.user?.id;

  if (userId) {
    try { await sb.from('profiles').upsert({ id: userId, ...updates }); } catch {}
  }
}

export async function getPartnerProfile() {
  const sb = getSupabase();
  const { data: session } = await sb.auth.getSession();
  const userId = session?.session?.user?.id;
  if (!userId) return { name: '', avatar: '' };

  const ctx = await getDbPairContext(userId);
  if (!ctx?.partnerId) return { name: ctx?.partnerName || '', avatar: '' };

  const { data, error } = await sb.from('profiles').select('name, avatar').eq('id', ctx.partnerId).maybeSingle();
  if (error || !data) return { name: ctx.partnerName || '', avatar: '' };
  return data;
}

// ============ Pairing ============
export async function createPairingCode() {
  const sb = getSupabase();
  const { data: sessionData } = await sb.auth.getSession();
  const userId = sessionData?.session?.user?.id;
  const userName = sessionData?.session?.user?.user_metadata?.name || 'Partner';
  
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const pairId = `pair_${Date.now()}`;

  try {
    const { error } = await sb.from('pairings').insert({
      code,
      creator_id: userId,
      creator_name: userName,
      pair_id: pairId,
      status: 'pending'
    });
    if (error) throw error;
  } catch (err) { console.warn('Pairing create error:', err); }
  
  lsSet(`unitespark_pair_${code}`, { creatorId: userId, creatorName: userName, partnerId: '', partnerName: '', pairId });
  return { code, pairId };
}

export async function joinPairingCode(code: string, partnerName: string) {
  const sb = getSupabase();
  const { data: sessionData } = await sb.auth.getSession();
  const myId = sessionData?.session?.user?.id;
  const myName = sessionData?.session?.user?.user_metadata?.name || partnerName;

  try {
    const { data, error } = await sb.from('pairings').select('*').eq('code', code.toUpperCase()).eq('status', 'pending').maybeSingle();
    if (!error && data) {
      const { pair_id, creator_id, creator_name } = data;
      await sb.from('pairings').update({ partner_id: myId, partner_name: myName, status: 'completed' }).eq('code', code.toUpperCase());
      await sb.from('profiles').upsert({ id: myId, pair_id: pair_id, partner_id: creator_id, partner_name: creator_name });
      return { pairId: pair_id, partnerId: creator_id, partnerName: creator_name };
    }
  } catch (err) { console.error('Cloud join error:', err); }

  const pairData = lsGet(`unitespark_pair_${code.toUpperCase()}`, null);
  if (!pairData) throw new Error('Code not found.');
  return { pairId: pairData.pairId || `local_${code}`, partnerId: pairData.creatorId, partnerName: pairData.creatorName || 'Partner' };
}

export async function checkPairingStatus(code: string) {
  const sb = getSupabase();
  try {
    const { data, error } = await sb.from('pairings').select('*').eq('code', code.toUpperCase()).maybeSingle();
    if (!error && data && data.status === 'completed') {
      return { paired: true, partnerId: data.partner_id, partnerName: data.partner_name, pairId: data.pair_id };
    }
  } catch {}
  const pairData = lsGet(`unitespark_pair_${code.toUpperCase()}`, null);
  return { paired: !!pairData?.partnerId, ...pairData };
}

export async function unpairUsers() {
  const sb = getSupabase();
  const { data: session } = await sb.auth.getSession();
  const userId = session?.session?.user?.id;
  if (!userId) throw new Error("Not authenticated");

  const ctx = await getDbPairContext(userId);
  if (!ctx?.pairId) return; // Not paired

  try {
    // 1. Delete pairing record
    await sb.from('pairings').delete().eq('pair_id', ctx.pairId);
    
    // 2. Clear pair info for both users in profiles
    if (ctx.partnerId) {
      await sb.from('profiles').update({ pair_id: null, partner_id: null, partner_name: null }).eq('id', ctx.partnerId);
    }
    await sb.from('profiles').update({ pair_id: null, partner_id: null, partner_name: null }).eq('id', userId);

  } catch (err) {
    console.error('Failed to unpair:', err);
    throw err;
  }
}

// ============ Status (No-op after removal) ============
export async function setMyStatus(status: { label: string; dotColor: string; bg: string }) {}
export async function getPartnerStatus() { return { label: 'Offline', dotColor: '#9ca3af', bg: '#f3f4f6' }; }

// ============ Spark ============
export async function setSpark(date: string, completed: boolean) {
  const sb = getSupabase();
  const { data: session } = await sb.auth.getSession();
  const userId = session?.session?.user?.id;
  if (!userId) return;
  const ctx = await getDbPairContext(userId);
  const pairId = ctx?.pairId || `solo_${userId}`;

  const { data: existing } = await sb.from('sparks')
    .select('id')
    .eq('pair_id', pairId)
    .eq('user_id', userId)
    .eq('date', date)
    .maybeSingle();

  if (existing) {
    await sb.from('sparks').update({ completed }).eq('id', existing.id);
  } else {
    await sb.from('sparks').insert({ pair_id: pairId, user_id: userId, date, completed });
  }
}

export async function getSparkStatus(date: string) {
  const sb = getSupabase();
  const { data: session } = await sb.auth.getSession();
  const userId = session?.session?.user?.id;
  if (!userId) return { myCompleted: false, partnerCompleted: false, streak: 0 };
  
  const ctx = await getDbPairContext(userId);
  const pairId = ctx?.pairId || `solo_${userId}`;
  const partnerId = ctx?.partnerId;

  const { data: sparks } = await sb.from('sparks').select('*').eq('pair_id', pairId);
  let myCompleted = false;
  let partnerCompleted = false;
  
  if (sparks) {
    const todayMy = sparks.find(s => s.date === date && s.user_id === userId);
    if (todayMy) myCompleted = todayMy.completed;
    
    if (partnerId) {
      const todayPartner = sparks.find(s => s.date === date && s.user_id === partnerId);
      if (todayPartner) partnerCompleted = todayPartner.completed;
    }
  }

  let streak = 0;
  if (partnerId && sparks) {
    const perDay = new Map();
    for (const s of sparks) {
      if (!s.completed) continue;
      if (!perDay.has(s.date)) perDay.set(s.date, new Set());
      perDay.get(s.date).add(s.user_id);
    }
    streak = Array.from(perDay.values()).filter(users => users.has(userId) && users.has(partnerId)).length;
  }

  return { myCompleted, partnerCompleted, streak, myUpdatedAt: 0, partnerUpdatedAt: 0 };
}

export function subscribeToPairUpdates(
  pairId: string,
  callbacks: {
    onSparksUpdate?: () => void;
    onNotesUpdate?: () => void;
    onProfilesUpdate?: () => void;
  }
) {
  const sb = getSupabase();
  const channel = sb.channel(`pair_updates_${pairId}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'sparks', filter: `pair_id=eq.${pairId}` },
      () => { callbacks.onSparksUpdate?.(); }
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'notes', filter: `pair_id=eq.${pairId}` },
      () => { callbacks.onNotesUpdate?.(); }
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'profiles' }, // Partner profile might update
      () => { callbacks.onProfilesUpdate?.(); }
    )
    .subscribe();

  return () => {
    sb.removeChannel(channel);
  };
}
export async function addSharedNote(content: string) {
  const sb = getSupabase();
  const { data: session } = await sb.auth.getSession();
  const user = session?.session?.user;
  if (!user) throw new Error("Not authenticated");
  
  const ctx = await getDbPairContext(user.id);
  if (!ctx?.pairId) throw new Error("Not paired yet");

  const { data, error } = await sb.from('notes').insert({
    pair_id: ctx.pairId,
    author_id: user.id,
    content: content
  }).select().single();
  
  if (error) throw error;
  
  return {
    id: data.id,
    content: data.content,
    date: data.created_at,
    authorId: data.author_id,
    authorName: user.user_metadata?.name || user.email?.split('@')[0] || 'You'
  };
}

export async function getSharedNotes() {
  const sb = getSupabase();
  const { data: session } = await sb.auth.getSession();
  const user = session?.session?.user;
  if (!user) return [];
  const ctx = await getDbPairContext(user.id);
  if (!ctx?.pairId) return [];

  const { data, error } = await sb.from('notes')
    .select('*')
    .eq('pair_id', ctx.pairId)
    .not('content', 'like', '[ALBUM]:%')
    .not('content', 'like', '[DAYS_MATTER]:%')
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  
  return data
    .map(n => ({
      id: n.id,
      content: n.content,
      date: n.created_at,
      authorId: n.author_id,
      authorName: n.author_id === user.id ? (user.user_metadata?.name || 'You') : (ctx.partnerName || 'Partner')
    }));
}

export async function deleteSharedNote(noteId: string) {
  const sb = getSupabase();
  await sb.from('notes').delete().eq('id', noteId);
}

// ============ Album ============
export async function saveAlbumPhotos(photos: any[]) {
  const sb = getSupabase();
  const { data: session } = await sb.auth.getSession();
  const userId = session?.session?.user?.id;
  if (!userId) return;
  const ctx = await getDbPairContext(userId);
  if (!ctx?.pairId) return;

  const content = `[ALBUM]:${JSON.stringify(photos)}`;
  
  const { data: existing } = await sb.from('notes')
    .select('id')
    .eq('pair_id', ctx.pairId)
    .like('content', '[ALBUM]:%')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
    
  if (existing) {
    // DO NOT await this update, allow optimistic UI
    sb.from('notes').update({ content }).eq('id', existing.id).then();
  } else {
    sb.from('notes').insert({ pair_id: ctx.pairId, author_id: userId, content }).then();
  }
}

export async function getAlbumPhotos() {
  const sb = getSupabase();
  const { data: session } = await sb.auth.getSession();
  const userId = session?.session?.user?.id;
  if (!userId) return [];
  const ctx = await getDbPairContext(userId);
  if (!ctx?.pairId) return [];

  const { data } = await sb.from('notes')
    .select('content')
    .eq('pair_id', ctx.pairId)
    .like('content', '[ALBUM]:%')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (data) {
    try {
      return JSON.parse(data.content.substring('[ALBUM]:'.length));
    } catch { return []; }
  }
  return [];
}

// ============ Days Matter ============
export async function saveDayEvents(events: any[]) {
  const sb = getSupabase();
  const { data: session } = await sb.auth.getSession();
  const userId = session?.session?.user?.id;
  if (!userId) return;
  const ctx = await getDbPairContext(userId);
  if (!ctx?.pairId) return;

  const content = `[DAYS_MATTER]:${JSON.stringify(events)}`;
  
  const { data: existing } = await sb.from('notes')
    .select('id')
    .eq('pair_id', ctx.pairId)
    .like('content', '[DAYS_MATTER]:%')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
    
  if (existing) {
    sb.from('notes').update({ content }).eq('id', existing.id).then();
  } else {
    sb.from('notes').insert({ pair_id: ctx.pairId, author_id: userId, content }).then();
  }
}

export async function getDayEvents() {
  const sb = getSupabase();
  const { data: session } = await sb.auth.getSession();
  const userId = session?.session?.user?.id;
  if (!userId) return [];
  const ctx = await getDbPairContext(userId);
  if (!ctx?.pairId) return [];

  const { data } = await sb.from('notes')
    .select('content')
    .eq('pair_id', ctx.pairId)
    .like('content', '[DAYS_MATTER]:%')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (data) {
    try {
      return JSON.parse(data.content.substring('[DAYS_MATTER]:'.length));
    } catch { return []; }
  }
  return [];
}

export async function resetPairing() {
  const sb = getSupabase();
  const { data: session } = await sb.auth.getSession();
  const userId = session?.session?.user?.id;
  if (!userId) return;

  const ctx = await getDbPairContext(userId);
  
  await sb.from('profiles').upsert({ id: userId, pair_id: null, partner_id: null, partner_name: null });
  
  if (ctx?.partnerId) {
    await sb.from('profiles').upsert({ id: ctx.partnerId, pair_id: null, partner_id: null, partner_name: null });
  }
  
  await sb.from('pairings').delete().or(`creator_id.eq.${userId},partner_id.eq.${userId}`);
  
  const keysToClear = [
    getUserKey('profile'),
    getUserKey('notes'),
    getUserKey('albumPhotos'),
    getUserKey('days_matter'),
    getUserKey('status'),
  ];
  for (const key of keysToClear) localStorage.removeItem(key);
}
