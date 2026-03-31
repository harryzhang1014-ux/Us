import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Mail, Lock, Eye, EyeOff, LogIn, Loader2 } from 'lucide-react';
import { useAuth } from './AuthContext';

export function LoginPage() {
  const { login, setStep } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setError('');
    setLoading(true);
    try { await login(email, password); } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally { setLoading(false); }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f2f2f7] dark:bg-[#000000] relative overflow-hidden">
      <div className="absolute top-[10%] right-[-15%] w-[55vw] h-[55vw] bg-rose-200/30 dark:bg-rose-900/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[-10%] w-[45vw] h-[45vw] bg-pink-200/25 dark:bg-pink-900/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-8 flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-[22px] flex items-center justify-center shadow-[0_8px_32px_rgba(244,63,94,0.35)] mb-4">
            <Heart className="w-10 h-10 text-white" fill="white" />
          </div>
          <h1 className="text-[28px] text-[#1c1c1e] dark:text-white" style={{ fontFamily: 'Pacifico, cursive', fontWeight: 400, letterSpacing: '-0.02em' }}>Unite Spark</h1>
          <p className="text-[13px] text-[#8e8e93] mt-1">Welcome back to your love nest</p>
        </motion.div>

        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}
          className="w-full max-w-sm rounded-[22px] p-6 bg-white/45 dark:bg-[#1c1c1e]/60 border border-white/50 dark:border-[#38383a]/60 shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
          style={{ backdropFilter: 'saturate(180%) blur(40px)', WebkitBackdropFilter: 'saturate(180%) blur(40px)' }}>
          <h2 className="text-center text-[17px] text-[#1c1c1e] dark:text-white mb-5" style={{ fontWeight: 600 }}>Sign In</h2>

          {error && (
            <div className="mb-4 px-3 py-2 bg-rose-500/10 rounded-[12px] text-[13px] text-rose-500" style={{ fontWeight: 500 }}>{error}</div>
          )}

          <div className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8e93]" />
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#f2f2f7]/80 dark:bg-[#2c2c2e]/80 rounded-[14px] text-[15px] text-[#1c1c1e] dark:text-white placeholder:text-[#8e8e93] outline-none border border-[#3c3c43]/8 dark:border-[#545458]/24 focus:border-rose-400/50 transition-colors" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8e93]" />
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-[#f2f2f7]/80 dark:bg-[#2c2c2e]/80 rounded-[14px] text-[15px] text-[#1c1c1e] dark:text-white placeholder:text-[#8e8e93] outline-none border border-[#3c3c43]/8 dark:border-[#545458]/24 focus:border-rose-400/50 transition-colors" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8e8e93]">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <motion.button whileTap={{ scale: 0.97 }} onClick={handleLogin} disabled={loading}
              className={`w-full py-3 rounded-[14px] text-[15px] transition-all ${loading ? 'bg-rose-400/60 cursor-wait' : 'bg-rose-500 shadow-[0_2px_12px_rgba(244,63,94,0.35)]'} text-white`}
              style={{ fontWeight: 600 }}>
              <span className="flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                {loading ? 'Signing In...' : 'Sign In'}
              </span>
            </motion.button>
          </div>

          <div className="mt-5 text-center">
            <span className="text-[13px] text-[#8e8e93]">Don't have an account? </span>
            <button onClick={() => setStep('register')} className="text-[13px] text-rose-500" style={{ fontWeight: 600 }}>
              Sign Up
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}