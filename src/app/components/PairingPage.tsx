import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Link2, Copy, Check, ArrowRight, Users, Loader2, ChevronLeft } from 'lucide-react';
import { useAuth } from './AuthContext';
import * as api from './api';

const containerVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { y: -20, opacity: 0, transition: { duration: 0.2 } }
};

const glassStyle = {
  backdropFilter: 'saturate(180%) blur(40px)',
  WebkitBackdropFilter: 'saturate(180%) blur(40px)',
} as React.CSSProperties;

export function PairingPage() {
  const { userInfo, completePairing, setStep, setPairingCode, logout } = useAuth();
  const [mode, setMode] = useState<'choose' | 'invite' | 'join'>(userInfo.pairingCode ? 'invite' : 'choose');
  const [partnerCode, setPartnerCode] = useState('');
  const [partnerName, setPartnerName] = useState(userInfo.partnerName || '');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [myCode, setMyCode] = useState(userInfo.pairingCode);
  const [polling, setPolling] = useState(!!userInfo.pairingCode);
  const pollRef = useRef<ReturnType<typeof setInterval>>();
  const partnerNameRef = useRef(partnerName);

  useEffect(() => { partnerNameRef.current = partnerName; }, [partnerName]);

  // 如果已经配对过，直接跳过此页面
  useEffect(() => {
    if (userInfo.pairId) {
      if (userInfo.avatar) {
        setStep('main');
      } else {
        setStep('avatar');
      }
    }
  }, [userInfo.pairId, userInfo.avatar, setStep]);

  useEffect(() => {
    if (myCode && !pollRef.current) startPolling(myCode);
    return () => { if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = undefined; } };
  }, [myCode]);

  const startPolling = (code: string) => {
    if (!code) return;
    if (pollRef.current) clearInterval(pollRef.current);
    setPolling(true);
    pollRef.current = setInterval(async () => {
      try {
        const status = await api.checkPairingStatus(code);
        if (status.paired) {
          if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = undefined; }
          setPolling(false);
          const finalName = status.partnerName || partnerNameRef.current || 'Partner';
          completePairing(finalName, status.partnerId, status.pairId);
          setStep('avatar');
        }
      } catch (err) { console.log('Poll error:', err); }
    }, 2000);
  };

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(myCode); } catch {
      const el = document.createElement('textarea'); el.value = myCode; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInvite = async () => {
    setLoading(true); setError('');
    try {
      const result = await api.createPairingCode();
      setMyCode(result.code); setPairingCode(result.code); setMode('invite');
    } catch (err: any) { setError(err.message || 'Failed to create pairing code'); } finally { setLoading(false); }
  };

  const handleJoin = async () => {
    if (!partnerCode.trim()) { setError('Please enter the pairing code'); return; }
    if (!partnerName.trim()) { setError("Please enter your partner's name"); return; }
    setError(''); setLoading(true);
    try {
      const result = await api.joinPairingCode(partnerCode.trim(), partnerName.trim());
      completePairing(result.partnerName || partnerName.trim(), result.partnerId, result.pairId);
      setStep('avatar');
    } catch (err: any) { setError(err.message || 'Pairing failed.'); } finally { setLoading(false); }
  };

  const glassCard = "bg-white/45 dark:bg-[#1c1c1e]/60 border border-white/50 dark:border-[#38383a]/60 shadow-[0_4px_30px_rgba(0,0,0,0.06)]";

  return (
    <div className="flex flex-col min-h-screen bg-[#f2f2f7] dark:bg-[#000000] relative overflow-hidden">
      <div className="absolute top-[10%] right-[-15%] w-[55vw] h-[55vw] bg-rose-200/30 dark:bg-rose-900/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[-10%] w-[45vw] h-[45vw] bg-pink-200/25 dark:bg-pink-900/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Back Button */}
      <div className="absolute top-12 left-6 z-20">
        <button 
          onClick={() => {
            if (mode === 'choose') {
              logout(); // 退出登录返回上一层
            } else {
              setMode('choose');
              setError('');
              setPolling(false);
              if (pollRef.current) clearInterval(pollRef.current);
            }
          }}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-sm text-[#1c1c1e] dark:text-white hover:bg-white/60 dark:hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center px-8 pt-24">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-6 flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-[22px] flex items-center justify-center shadow-[0_8px_32px_rgba(244,63,94,0.35)] mb-4">
            <Link2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-[28px] text-[#1c1c1e] dark:text-white" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>Link Together</h1>
          <p className="text-[13px] text-[#8e8e93] mt-1 text-center max-w-[260px]">Connect with your partner to share your love nest</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {mode === 'choose' && (
            <motion.div key="choose" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="w-full max-w-sm space-y-2.5">
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleInvite} disabled={loading}
                className={`w-full rounded-[18px] p-5 text-left ${glassCard}`} style={glassStyle}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-rose-500/10 rounded-[14px] flex items-center justify-center">
                    {loading ? <Loader2 className="w-6 h-6 text-rose-500 animate-spin" /> : <Heart className="w-6 h-6 text-rose-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-[15px] text-[#1c1c1e] dark:text-white" style={{ fontWeight: 600 }}>Invite Partner</div>
                    <div className="text-[12px] text-[#8e8e93] mt-0.5">Generate a code for your partner</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#c7c7cc]" />
                </div>
              </motion.button>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => setMode('join')}
                className={`w-full rounded-[18px] p-5 text-left ${glassCard}`} style={glassStyle}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-fuchsia-500/10 rounded-[14px] flex items-center justify-center">
                    <Users className="w-6 h-6 text-fuchsia-500" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[15px] text-[#1c1c1e] dark:text-white" style={{ fontWeight: 600 }}>Join Partner</div>
                    <div className="text-[12px] text-[#8e8e93] mt-0.5">Enter your partner's pairing code</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#c7c7cc]" />
                </div>
              </motion.button>
              {error && <div className="px-3 py-2 bg-rose-500/10 rounded-[12px] text-[13px] text-rose-500" style={{ fontWeight: 500 }}>{error}</div>}
            </motion.div>
          )}

          {mode === 'invite' && (
            <motion.div key="invite" variants={containerVariants} initial="hidden" animate="visible" exit="exit"
              className={`w-full max-w-sm rounded-[22px] p-6 ${glassCard}`} style={glassStyle}>
              <h2 className="text-center text-[17px] text-[#1c1c1e] dark:text-white mb-2" style={{ fontWeight: 600 }}>Your Pairing Code</h2>
              <p className="text-center text-[13px] text-[#8e8e93] mb-5">Share this code with your partner</p>

              <div className="bg-[#f2f2f7]/60 dark:bg-[#2c2c2e]/60 rounded-[16px] p-4 mb-4">
                <div className="flex items-center justify-center gap-2">
                  {(myCode || '').split('').map((char, i) => (
                    <div key={i} className="w-10 h-12 bg-white/80 dark:bg-[#3a3a3c] rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-center justify-center border border-[#3c3c43]/6 dark:border-[#545458]/24">
                      <span className="text-[18px] text-[#1c1c1e] dark:text-white" style={{ fontWeight: 700 }}>{char}</span>
                    </div>
                  ))}
                </div>
                <button onClick={handleCopy}
                  className="w-full mt-3 flex items-center justify-center gap-1.5 text-[13px] text-rose-500" style={{ fontWeight: 500 }}>
                  {copied ? <><Check className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy code</>}
                </button>
              </div>

              {error && <div className="mb-3 px-3 py-2 bg-rose-500/10 rounded-[12px] text-[13px] text-rose-500" style={{ fontWeight: 500 }}>{error}</div>}

              <div className="relative mb-4">
                <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8e93]" />
                <input type="text" placeholder="Partner's name" value={partnerName} onChange={(e) => setPartnerName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#f2f2f7]/80 dark:bg-[#2c2c2e]/80 rounded-[14px] text-[15px] text-[#1c1c1e] dark:text-white placeholder:text-[#8e8e93] outline-none border border-[#3c3c43]/8 dark:border-[#545458]/24 focus:border-rose-400/50 transition-colors" />
              </div>

              <div className={`w-full py-3 rounded-[14px] text-[15px] flex items-center justify-center gap-2 transition-all ${
                polling ? 'bg-[#f2f2f7] dark:bg-[#2c2c2e] text-rose-500' : 'bg-rose-500 text-white shadow-[0_2px_12px_rgba(244,63,94,0.35)]'
              }`} style={{ fontWeight: 600 }}>
                {polling ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Waiting for partner...</>
                ) : (
                  <motion.button whileTap={{ scale: 0.97 }} onClick={() => startPolling(myCode || '')} className="w-full h-full flex items-center justify-center">
                    Check Connection
                  </motion.button>
                )}
              </div>

              {polling && (
                <p className="text-center text-[11px] text-[#8e8e93] mt-2">
                  Checking every 2 seconds... Your partner should enter this code on their device.
                </p>
              )}
            </motion.div>
          )}

          {mode === 'join' && (
            <motion.div key="join" variants={containerVariants} initial="hidden" animate="visible" exit="exit"
              className={`w-full max-w-sm rounded-[22px] p-6 ${glassCard}`} style={glassStyle}>
              <h2 className="text-center text-[17px] text-[#1c1c1e] dark:text-white mb-2" style={{ fontWeight: 600 }}>Enter Pairing Code</h2>
              <p className="text-center text-[13px] text-[#8e8e93] mb-5">Enter the code your partner shared</p>

              {error && <div className="mb-3 px-3 py-2 bg-rose-500/10 rounded-[12px] text-[13px] text-rose-500" style={{ fontWeight: 500 }}>{error}</div>}

              <div className="space-y-3">
                <div className="relative">
                  <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8e93]" />
                  <input type="text" placeholder="Pairing code" value={partnerCode} onChange={(e) => setPartnerCode(e.target.value.toUpperCase())} maxLength={6}
                    className="w-full pl-10 pr-4 py-3 bg-[#f2f2f7]/80 dark:bg-[#2c2c2e]/80 rounded-[14px] text-[15px] text-[#1c1c1e] dark:text-white placeholder:text-[#8e8e93] outline-none border border-[#3c3c43]/8 dark:border-[#545458]/24 focus:border-rose-400/50 tracking-widest text-center" style={{ fontWeight: 600 }} />
                </div>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8e93]" />
                  <input type="text" placeholder="Partner's name" value={partnerName} onChange={(e) => setPartnerName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#f2f2f7]/80 dark:bg-[#2c2c2e]/80 rounded-[14px] text-[15px] text-[#1c1c1e] dark:text-white placeholder:text-[#8e8e93] outline-none border border-[#3c3c43]/8 dark:border-[#545458]/24 focus:border-rose-400/50 transition-colors" />
                </div>
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleJoin} disabled={loading}
                  className={`w-full py-3 rounded-[14px] text-[15px] flex items-center justify-center gap-2 transition-all ${
                    loading ? 'bg-rose-400/60 text-white cursor-wait' : 'bg-rose-500 text-white shadow-[0_2px_12px_rgba(244,63,94,0.35)]'
                  }`} style={{ fontWeight: 600 }}>
                  {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Pairing...</>) : (<><Link2 className="w-4 h-4" /> Link Together</>)}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
