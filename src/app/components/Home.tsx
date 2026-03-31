import * as api from './api';
import { DaysMatter } from './DaysMatter';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, RefreshCw, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAuth } from './AuthContext';

function cn(...inputs: any[]) { return inputs.filter(Boolean).join(' '); }

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function timeAgo(ts: number): string {
  if (!ts) return '';
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 10) return 'Just now';
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

const glassCard = "backdrop-blur-2xl bg-white/40 dark:bg-[#1c1c1e]/60 border border-white/50 dark:border-[#38383a]/60 shadow-[0_2px_20px_rgba(0,0,0,0.04)]";

/* ---- Halo Ring around avatar ---- */
function HaloRing({ fill, completed, holding, synced }: { fill: number; completed: boolean; holding: boolean; synced: boolean }) {
  const ringSize = 76;
  const circumference = Math.PI * (ringSize - 4);
  const haloOpacity = completed ? 1 : Math.max(0.08, fill * 0.9);
  const haloWidth = completed ? 2.5 : 1 + fill * 1.5;
  const glowIntensity = completed ? 0.45 : fill * 0.3;
  const glowSize = completed ? 12 : 4 + fill * 8;

  return (
    <div className="absolute inset-[-10px] pointer-events-none">
      {/* Glow layer */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={synced
          ? { scale: [1, 1.06, 1], opacity: [glowIntensity * 0.6, glowIntensity, glowIntensity * 0.6] }
          : completed
            ? { scale: [1, 1.04, 1], opacity: [glowIntensity * 0.7, glowIntensity, glowIntensity * 0.7] }
            : { scale: 1, opacity: glowIntensity }
        }
        transition={synced
          ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          : completed
            ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.3 }
        }
        style={{
          boxShadow: `0 0 ${glowSize}px rgba(251,113,133,${glowIntensity}), inset 0 0 ${glowSize * 0.5}px rgba(251,113,133,${glowIntensity * 0.3})`,
        }}
      />
      {/* Ring SVG */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox={`0 0 ${ringSize} ${ringSize}`}>
        <defs>
          <linearGradient id="haloGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(251,113,133,0.9)" />
            <stop offset="50%" stopColor="rgba(244,63,94,0.8)" />
            <stop offset="100%" stopColor="rgba(236,72,153,0.7)" />
          </linearGradient>
        </defs>
        <circle cx={ringSize / 2} cy={ringSize / 2} r={(ringSize - 4) / 2} fill="none" stroke="rgba(251,113,133,0.06)" strokeWidth={1} />
        <motion.circle
          cx={ringSize / 2} cy={ringSize / 2} r={(ringSize - 4) / 2}
          fill="none" stroke="url(#haloGrad)" strokeWidth={haloWidth} strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: completed ? 0 : circumference * (1 - fill), opacity: haloOpacity }}
          transition={{ duration: 0.15, ease: 'linear' }}
          style={{ filter: `drop-shadow(0 0 ${3 + fill * 6}px rgba(251,113,133,${0.2 + fill * 0.4}))` }}
        />
      </svg>
      {holding && !completed && (
        <motion.div className="absolute inset-0 rounded-full" style={{ border: '1px solid rgba(251,113,133,0.3)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} />
      )}
    </div>
  );
}

/* ---- Light Bridge between two halos ---- */
function LightBridge({ active }: { active: boolean }) {
  const particles = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({ id: i, delay: i * 0.5, duration: 2.5 + Math.random(), size: 2 + Math.random() * 2 })), []);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: '40%', height: 2 }}
        initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}>
        <div className="w-full h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, rgba(251,113,133,0) 0%, rgba(251,113,133,0.3) 30%, rgba(244,63,94,0.45) 50%, rgba(251,113,133,0.3) 70%, rgba(251,113,133,0) 100%)', boxShadow: '0 0 10px rgba(251,113,133,0.2)' }} />
      </motion.div>
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute top-1/2 rounded-full"
          style={{ width: p.size, height: p.size, background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(251,113,133,0.6) 60%, transparent 100%)', boxShadow: '0 0 4px rgba(251,113,133,0.4)', marginTop: -p.size / 2 }}
          animate={{ left: ['28%', '72%'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }} />
      ))}
    </div>
  );
}

export function Home() {
  const { userInfo } = useAuth();
  const myAvatar = userInfo.avatar || '';

  const [partnerAvatar, setPartnerAvatar] = useState('');
  const [partnerDisplayName, setPartnerDisplayName] = useState(userInfo.partnerName || 'Partner');

  const todayKey = getTodayKey();
  const [mySparkCompleted, setMySparkCompleted] = useState(false);
  const [partnerSparkCompleted, setPartnerSparkCompleted] = useState(false);
  const [holding, setHolding] = useState(false);
  const [myFill, setMyFill] = useState(0);
  const [sparkDays, setSparkDays] = useState(0);
  const [partnerResponseAt, setPartnerResponseAt] = useState(0);
  const pollRef = useRef<ReturnType<typeof setInterval>>();

  const bothCompleted = mySparkCompleted && partnerSparkCompleted;

  useEffect(() => {
    setPartnerDisplayName(userInfo.partnerName || 'Partner');
  }, [userInfo.partnerName]);

  useEffect(() => {
    setPartnerAvatar('');
    setPartnerSparkCompleted(false);
    setPartnerResponseAt(0);
  }, [userInfo.partnerId, userInfo.pairId]);

  useEffect(() => {
    (async () => {
      try {
        const partner = await api.getPartnerProfile();
        setPartnerDisplayName(partner?.name || userInfo.partnerName || 'Partner');
        setPartnerAvatar(partner?.avatar || '');
      } catch {}
    })();
  }, [userInfo.partnerId, userInfo.pairId]);

  const fetchRemoteState = useCallback(async () => {
    try {
      const [sparkStatus] = await Promise.allSettled([api.getSparkStatus(todayKey)]);
      if (sparkStatus.status === 'fulfilled' && sparkStatus.value) {
        const s = sparkStatus.value;
        setPartnerSparkCompleted(!!s.partnerCompleted);
        setMySparkCompleted(!!s.myCompleted);
        setMyFill(s.myCompleted ? 1 : 0);
        setSparkDays(s.streak || 0);
        setPartnerResponseAt(s.partnerUpdatedAt || 0);
      }
    } catch {}
  }, [todayKey]);

  useEffect(() => {
    fetchRemoteState();
  }, [fetchRemoteState]);

  // Setup Realtime Subscription
  useEffect(() => {
    if (!userInfo.pairId) return;
    
    const unsubscribe = api.subscribeToPairUpdates(userInfo.pairId, {
      onSparksUpdate: () => {
        fetchRemoteState();
      },
      onProfilesUpdate: async () => {
        try {
          const pProfile = await api.getPartnerProfile();
          if (pProfile.avatar) setPartnerAvatar(pProfile.avatar);
          if (pProfile.name) setPartnerDisplayName(pProfile.name);
        } catch {}
      }
    });

    return () => {
      unsubscribe();
    };
  }, [userInfo.pairId, fetchRemoteState]);

  useEffect(() => {
    if (mySparkCompleted) return;
    
    let frameId: number;
    let lastTime = performance.now();
    
    const animateFill = (time: number) => {
      if (holding && myFill < 1) {
        const delta = time - lastTime;
        lastTime = time;
        // Adjust the speed here: delta * 0.001 is roughly 1 second to fill.
        // We'll make it fill in about 1.5 seconds.
        setMyFill(prev => Math.min(prev + delta * 0.0006, 1));
        frameId = requestAnimationFrame(animateFill);
      }
    };
    
    if (holding) {
      frameId = requestAnimationFrame(animateFill);
    } else {
      // Gradually decrease fill when released, but quickly
      const decayFill = () => {
        setMyFill(prev => {
          if (prev <= 0) return 0;
          frameId = requestAnimationFrame(decayFill);
          return Math.max(prev - 0.05, 0);
        });
      };
      if (myFill > 0) {
        frameId = requestAnimationFrame(decayFill);
      }
    }
    
    return () => cancelAnimationFrame(frameId);
  }, [holding, myFill, mySparkCompleted]);

  useEffect(() => {
    if (myFill >= 1 && !mySparkCompleted) {
      setMySparkCompleted(true);
      api.setSpark(todayKey, true).catch(() => {});
    }
  }, [myFill, mySparkCompleted, todayKey]);

  const handleResetSpark = async () => {
    setMyFill(0); setMySparkCompleted(false); setHolding(false);
    try { await api.setSpark(todayKey, false); } catch {}
  };

  return (
    <div className="flex flex-col min-h-full bg-[#f2f2f7] dark:bg-[#000000] relative overflow-hidden pb-4 transition-colors">
      {/* Ambient background orbs */}
      <div className="absolute top-[-10%] right-[-15%] w-[50vw] h-[50vw] bg-rose-200/30 dark:bg-rose-900/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-20%] w-[40vw] h-[40vw] bg-pink-300/20 dark:bg-pink-900/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] bg-fuchsia-200/15 dark:bg-fuchsia-900/8 rounded-full blur-[60px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 pt-14 pb-4 px-6">
        <div className="flex items-center justify-center">
          <h1 className="text-[34px] text-[#1c1c1e] dark:text-white tracking-tight" style={{ fontFamily: 'Pacifico, cursive', fontWeight: 400, letterSpacing: '-0.02em' }}>Unite Spark</h1>
        </div>
      </div>

      {/* Halo Breath Section */}
      <div className="relative z-10 px-5 pb-3">
        <motion.div
          className={cn("rounded-[22px] p-5", glassCard)}
          style={{ backdropFilter: 'saturate(180%) blur(40px)', WebkitBackdropFilter: 'saturate(180%) blur(40px)' }}
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Streak counter */}
          <div className="text-center mb-5">
            <div className="text-[11px] text-[#8e8e93] dark:text-[#636366] tracking-[0.08em] uppercase" style={{ fontWeight: 500 }}>
              {bothCompleted ? 'Souls Synchronized' : mySparkCompleted ? 'Awaiting resonance...' : 'Halo Streak'}
            </div>
            <div className="text-[36px] text-rose-500 dark:text-rose-400 mt-0.5" style={{ fontWeight: 800, letterSpacing: '-0.04em' }}>
              {sparkDays}
              <span className="text-[13px] text-[#8e8e93] ml-1" style={{ fontWeight: 500, letterSpacing: '0' }}>days</span>
            </div>
          </div>

          {/* Avatar area with halos and bridge */}
          <div className="relative flex items-center justify-center py-2">
            <LightBridge active={bothCompleted} />

            <div className="flex items-center gap-10 relative z-10">
              {/* Partner avatar + halo */}
              <div className="flex flex-col items-center gap-2.5">
                <div className="relative">
                  <HaloRing fill={partnerSparkCompleted ? 1 : 0} completed={partnerSparkCompleted} holding={false} synced={bothCompleted} />
                  <div className={cn(
                    "w-[56px] h-[56px] rounded-full overflow-hidden border-[1.5px] shadow-lg relative",
                    partnerSparkCompleted ? "border-rose-400/50" : "border-white/60 dark:border-[#38383a]"
                  )}>
                    {partnerAvatar ? (
                      <ImageWithFallback src={partnerAvatar} alt="Partner" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-white/55 dark:bg-[#2c2c2e] flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full border border-[#d1d1d6] dark:border-[#545458]" />
                      </div>
                    )}
                  </div>
                  {partnerSparkCompleted && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="absolute -bottom-0.5 -right-0.5 w-[18px] h-[18px] bg-rose-500 rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(244,63,94,0.4)] z-20">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </motion.div>
                  )}
                </div>
                <div className="flex flex-col items-center gap-1 mt-1">
                  <span className="text-[11px] text-[#3c3c43]/60 dark:text-[#ebebf5]/40" style={{ fontWeight: 500 }}>{partnerDisplayName}</span>
                </div>
              </div>

              {/* Center heart */}
              <motion.div
                animate={bothCompleted
                  ? { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }
                  : { scale: 1, opacity: bothCompleted ? 1 : 0.2 }
                }
                transition={bothCompleted ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } : {}}
              >
                <Heart className={cn("w-4 h-4", bothCompleted ? "text-rose-500" : "text-rose-200/60 dark:text-[#38383a]")} fill={bothCompleted ? '#f43f5e' : 'none'} />
              </motion.div>

              {/* Me avatar + halo (interactive) */}
              <div className="flex flex-col items-center gap-2.5">
                <div className="relative">
                  <HaloRing fill={mySparkCompleted ? 1 : myFill} completed={mySparkCompleted} holding={holding} synced={bothCompleted} />
                  <motion.button
                    className={cn(
                      "w-[56px] h-[56px] rounded-full overflow-hidden border-[1.5px] shadow-lg relative cursor-pointer select-none touch-none",
                      mySparkCompleted ? "border-rose-400/50" : holding ? "border-rose-300/40" : "border-white/60 dark:border-[#38383a]"
                    )}
                    style={{ WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}
                    whileTap={{ scale: 0.92 }}
                    onPointerDown={(e) => { e.preventDefault(); !mySparkCompleted && setHolding(true); }}
                    onPointerUp={(e) => { e.preventDefault(); setHolding(false); }}
                    onPointerLeave={() => setHolding(false)}
                    onPointerCancel={() => setHolding(false)}
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    {myAvatar ? (
                      <ImageWithFallback src={myAvatar} alt="Me" className="w-full h-full object-cover pointer-events-none select-none" draggable={false} />
                    ) : (
                      <div className="w-full h-full bg-[#f2f2f7] dark:bg-[#2c2c2e] flex items-center justify-center">
                        <Heart className="w-5 h-5 text-[#c7c7cc]" />
                      </div>
                    )}
                  </motion.button>
                  {mySparkCompleted && (
                    null
                  )}
                </div>
                <div className="flex flex-col items-center gap-1 mt-1">
                  <span className="text-[11px] text-[#3c3c43]/60 dark:text-[#ebebf5]/40" style={{ fontWeight: 500 }}>Me</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status text */}
          <div className="mt-4 text-center">
            {bothCompleted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2">
                <motion.div className="flex items-center gap-1.5 text-[11px] text-rose-500"
                  animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ fontWeight: 600 }}>
                  <Check className="w-3 h-3" /> Both halos ignited today
                </motion.div>
              </motion.div>
            ) : mySparkCompleted ? (
              <motion.div className="text-[11px] text-[#8e8e93] flex flex-col items-center gap-1" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }} style={{ fontWeight: 500 }}>
                <p>{`Waiting for ${partnerDisplayName}'s halo...`}</p>
                {partnerResponseAt ? <p>{partnerDisplayName} last responded {timeAgo(partnerResponseAt)}</p> : null}
              </motion.div>
            ) : (
              <motion.p className="text-[11px] text-[#8e8e93]/70" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }} style={{ fontWeight: 500 }}>
                {holding ? 'Channeling energy...' : 'Hold your avatar to ignite'}
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Days Matter */}
      <div className="relative z-10 px-5 py-2">
        <DaysMatter />
      </div>
    </div>
  );
}
