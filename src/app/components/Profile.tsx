import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LogOut, Settings, Shield, Moon, Sun,
  ChevronRight, Heart, Camera, X, Loader2, Database, Key
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import * as api from './api';

function cn(...inputs: any[]) { return inputs.filter(Boolean).join(' '); }

const glassCard = "bg-white/40 dark:bg-[#1c1c1e]/60 border border-white/50 dark:border-[#38383a]/60 shadow-[0_2px_20px_rgba(0,0,0,0.04)]";

export function Profile() {
  const { userInfo, logout, updateAvatar } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [showAvatarEditor, setShowAvatarEditor] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showGeneral, setShowGeneral] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const [partnerName, setPartnerName] = useState(userInfo.partnerName || '');

  useEffect(() => {
    setPartnerName(userInfo.partnerName || '');
  }, [userInfo.partnerName]);

  useEffect(() => {
    (async () => {
      try {
        const partner = await api.getPartnerProfile();
        if (partner?.name) setPartnerName(partner.name);
      } catch {}
    })();
  }, [userInfo.partnerId, userInfo.pairId]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      updateAvatar(dataUrl);
      setShowAvatarEditor(false);
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try { await logout(); } catch (err) { console.log('Logout error:', err); } finally { setLoggingOut(false); }
  };

  const settingRow = "w-full flex items-center gap-3 px-4 py-3.5 transition-colors";
  const settingDivider = "border-b border-[#3c3c43]/6 dark:border-[#545458]/16";

  return (
    <div className="flex flex-col min-h-full bg-[#f2f2f7] dark:bg-[#000000] relative overflow-hidden pb-6 transition-colors">
      <div className="absolute top-[-5%] right-[-10%] w-[40vw] h-[40vw] bg-rose-200/20 dark:bg-rose-900/8 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 pt-14 pb-6 px-5">
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-[34px] text-[#1c1c1e] dark:text-white tracking-tight" style={{ fontFamily: 'Pacifico, cursive', fontWeight: 400, letterSpacing: '-0.02em' }}>Profile</h1>
        </div>

        {/* Profile Card */}
        <motion.div
          className={cn("rounded-[18px] p-5", glassCard)}
          style={{ backdropFilter: 'saturate(180%) blur(40px)', WebkitBackdropFilter: 'saturate(180%) blur(40px)' }}
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex items-center gap-4">
            <button onClick={() => setShowAvatarEditor(true)}
              className="relative w-16 h-16 rounded-full overflow-hidden border-[2px] border-white/60 dark:border-[#38383a] shadow-lg group">
              <ImageWithFallback src={userInfo.avatar} alt="Me" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
            <div className="flex-1">
              <div className="text-[17px] text-[#1c1c1e] dark:text-white" style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>{userInfo.name || 'User'}</div>
              <div className="text-[13px] text-[#8e8e93] mt-0.5">{userInfo.email}</div>
              <div className="flex items-center gap-1 mt-1">
                <Heart className="w-3 h-3 text-rose-400" fill="#fb7185" />
                <span className="text-[11px] text-[#8e8e93]">
                  {partnerName ? `Linked with ${partnerName}` : userInfo.partnerName ? `Linked with ${userInfo.partnerName}` : 'No partner linked'}
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#c7c7cc] dark:text-[#48484a]" />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 px-5 space-y-3">
        {/* Settings Group */}
        <motion.div
          className={cn("rounded-[18px] overflow-hidden", glassCard)}
          style={{ backdropFilter: 'saturate(180%) blur(40px)', WebkitBackdropFilter: 'saturate(180%) blur(40px)' }}
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
        >
          {/* Privacy */}
          <div>
            <button onClick={() => setShowPrivacy(!showPrivacy)}
              className={cn(settingRow, settingDivider, "hover:bg-[#3c3c43]/4 dark:hover:bg-[#545458]/8")}>
              <div className="w-[30px] h-[30px] bg-blue-500 rounded-[7px] flex items-center justify-center">
                <Shield className="w-[17px] h-[17px] text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-[15px] text-[#1c1c1e] dark:text-white" style={{ fontWeight: 400 }}>Account & Security</div>
              </div>
              <ChevronRight className={cn("w-4 h-4 text-[#c7c7cc] dark:text-[#48484a] transition-transform", showPrivacy && 'rotate-90')} />
            </button>
            <AnimatePresence>
              {showPrivacy && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="px-4 py-4 bg-[#f2f2f7]/50 dark:bg-[#2c2c2e]/50 space-y-4">
                    <div className="flex items-center justify-between border-b border-[#3c3c43]/6 dark:border-[#545458]/16 pb-3">
                      <div className="flex items-center gap-2">
                        <Key className="w-4 h-4 text-[#8e8e93]" />
                        <span className="text-[14px] text-[#1c1c1e] dark:text-white">User ID</span>
                      </div>
                      <span className="text-[13px] text-[#8e8e93] font-mono">{userInfo.id ? userInfo.id.slice(0, 8) + '...' : 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-[#8e8e93]" />
                        <span className="text-[14px] text-[#1c1c1e] dark:text-white">Authentication</span>
                      </div>
                      <span className="text-[13px] text-[#34c759] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34c759]"></span>
                        Supabase Secured
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark Mode */}
          <button onClick={toggleTheme}
            className={cn(settingRow, settingDivider, "hover:bg-[#3c3c43]/4 dark:hover:bg-[#545458]/8")}>
            <div className={cn("w-[30px] h-[30px] rounded-[7px] flex items-center justify-center",
              isDark ? "bg-amber-500" : "bg-indigo-500")}>
              {isDark ? <Sun className="w-[17px] h-[17px] text-white" /> : <Moon className="w-[17px] h-[17px] text-white" />}
            </div>
            <div className="flex-1 text-left">
              <div className="text-[15px] text-[#1c1c1e] dark:text-white" style={{ fontWeight: 400 }}>{isDark ? 'Light Mode' : 'Dark Mode'}</div>
            </div>
            <div className={cn("w-[51px] h-[31px] rounded-full transition-colors relative",
              isDark ? 'bg-[#34c759]' : 'bg-[#e9e9ea] dark:bg-[#38383a]')}>
              <motion.div className="w-[27px] h-[27px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.15)] absolute top-[2px]"
                animate={{ left: isDark ? 22 : 2 }} transition={{ type: 'spring', damping: 20 }} />
            </div>
          </button>

          {/* General */}
          <div>
            <button onClick={() => setShowGeneral(!showGeneral)}
              className={cn(settingRow, "hover:bg-[#3c3c43]/4 dark:hover:bg-[#545458]/8")}>
              <div className="w-[30px] h-[30px] bg-[#8e8e93] rounded-[7px] flex items-center justify-center">
                <Settings className="w-[17px] h-[17px] text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-[15px] text-[#1c1c1e] dark:text-white" style={{ fontWeight: 400 }}>System Settings</div>
              </div>
              <ChevronRight className={cn("w-4 h-4 text-[#c7c7cc] dark:text-[#48484a] transition-transform", showGeneral && 'rotate-90')} />
            </button>
            <AnimatePresence>
              {showGeneral && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="px-4 py-4 bg-[#f2f2f7]/50 dark:bg-[#2c2c2e]/50 space-y-4">
                    <div className="flex items-center justify-between border-b border-[#3c3c43]/6 dark:border-[#545458]/16 pb-3">
                      <span className="text-[14px] text-[#1c1c1e] dark:text-white">Language</span>
                      <span className="text-[14px] text-[#8e8e93]">English (US)</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#3c3c43]/6 dark:border-[#545458]/16 pb-3">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-[#8e8e93]" />
                        <span className="text-[14px] text-[#1c1c1e] dark:text-white">Cloud Sync</span>
                      </div>
                      <span className="text-[13px] text-[#34c759] flex items-center gap-1" style={{ fontWeight: 500 }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34c759]"></span>
                        Connected
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] text-[#1c1c1e] dark:text-white">Version</span>
                      <span className="text-[14px] text-[#8e8e93] font-mono">v1.0.2</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Sign Out */}
        <motion.button onClick={handleLogout} disabled={loggingOut}
          className={cn("w-full rounded-[18px] py-3.5 text-[15px] text-rose-500 flex items-center justify-center gap-2 transition-colors", glassCard, "hover:bg-rose-500/5")}
          style={{ fontWeight: 400, backdropFilter: 'saturate(180%) blur(40px)', WebkitBackdropFilter: 'saturate(180%) blur(40px)' }}
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.98 }}>
          {loggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
          {loggingOut ? 'Signing Out...' : 'Sign Out'}
        </motion.button>
      </div>

      {/* Avatar Editor Sheet */}
      <AnimatePresence>
        {showAvatarEditor && (
          <motion.div className="fixed inset-0 z-[100] flex items-end justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowAvatarEditor(false)}>
            <div className="absolute inset-0 bg-black/25" style={{ backdropFilter: 'saturate(180%) blur(20px)' }} />
            <motion.div initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-t-[22px] p-6 pb-10 bg-white/75 dark:bg-[#1c1c1e]/85 border-t border-white/60 dark:border-[#38383a]/60"
              style={{ backdropFilter: 'saturate(180%) blur(40px)' }}>
              <div className="flex justify-center mb-4"><div className="w-9 h-[5px] rounded-full bg-[#3c3c43]/20 dark:bg-[#545458]/40" /></div>
              <h3 className="text-center text-[#1c1c1e] dark:text-white mb-6" style={{ fontWeight: 600 }}>Change Avatar</h3>
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-[2.5px] border-white/70 dark:border-[#38383a] shadow-xl">
                  <ImageWithFallback src={userInfo.avatar} alt="Current" className="w-full h-full object-cover" />
                </div>
                <label className="w-full cursor-pointer">
                  <div className="w-full py-3 bg-rose-500 text-white rounded-[14px] text-[14px] shadow-[0_2px_12px_rgba(244,63,94,0.3)] flex items-center justify-center gap-2" style={{ fontWeight: 600 }}>
                    <Camera className="w-4 h-4" /> Take Photo or Choose
                  </div>
                  <input type="file" accept="image/*" capture="environment" onChange={handleAvatarUpload} className="hidden" />
                </label>
                <label className="w-full cursor-pointer">
                  <div className="w-full py-3 bg-[#f2f2f7] dark:bg-[#2c2c2e] text-[#1c1c1e] dark:text-white rounded-[14px] text-[14px] flex items-center justify-center gap-2" style={{ fontWeight: 500 }}>
                    Choose from Files
                  </div>
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                </label>
                <button onClick={() => setShowAvatarEditor(false)} className="text-[13px] text-rose-500 mt-2" style={{ fontWeight: 500 }}>Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
