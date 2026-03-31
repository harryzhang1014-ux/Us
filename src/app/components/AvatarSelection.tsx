import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Heart, Camera, ArrowRight, Upload } from 'lucide-react';
import { useAuth } from './AuthContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

const glassStyle = {
  backdropFilter: 'saturate(180%) blur(40px)',
  WebkitBackdropFilter: 'saturate(180%) blur(40px)',
} as React.CSSProperties;

export function AvatarSelection() {
  const { updateAvatar, setStep, userInfo } = useAuth();
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleContinue = () => {
    const avatar = customAvatar;
    if (avatar) { updateAvatar(avatar); setStep('main'); }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { setCustomAvatar(reader.result as string); };
    reader.readAsDataURL(file);
  };

  const chosenAvatar = customAvatar;

  return (
    <div className="flex flex-col min-h-screen bg-[#f2f2f7] dark:bg-[#000000] relative overflow-hidden">
      <div className="absolute top-[5%] right-[-10%] w-[50vw] h-[50vw] bg-rose-200/25 dark:bg-rose-900/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vw] bg-pink-200/20 dark:bg-pink-900/8 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col items-center px-8 pt-16 overflow-y-auto">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-pink-500 rounded-[16px] flex items-center justify-center shadow-[0_6px_24px_rgba(244,63,94,0.3)] mb-4">
            <Camera className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-[22px] text-[#1c1c1e] dark:text-white" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
            Choose Your Avatar
          </h1>
          <p className="text-[13px] text-[#8e8e93] mt-1.5 text-center max-w-[260px]">
            Pick a profile photo that represents you, {userInfo.name || 'friend'}
          </p>
        </motion.div>

        {/* Preview */}
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
          <div className="w-28 h-28 rounded-full border-[3px] border-white/70 dark:border-[#38383a] shadow-xl overflow-hidden bg-[#f2f2f7] dark:bg-[#2c2c2e] flex items-center justify-center">
            {chosenAvatar ? (
              <ImageWithFallback src={chosenAvatar} alt="Selected avatar" className="w-full h-full object-cover" />
            ) : (
              <Heart className="w-10 h-10 text-[#c7c7cc]" />
            )}
          </div>
        </motion.div>

        {/* Upload buttons */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}
          className="w-full max-w-sm flex gap-2 mb-3">
          <button onClick={() => cameraInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-rose-500 text-white rounded-[12px] text-[13px] shadow-[0_2px_12px_rgba(244,63,94,0.3)]"
            style={{ fontWeight: 600 }}>
            <Camera className="w-3.5 h-3.5" /> Take Photo
          </button>
          <button onClick={() => fileInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-white/45 dark:bg-[#1c1c1e]/60 text-[#1c1c1e] dark:text-white rounded-[12px] text-[13px] border border-white/50 dark:border-[#38383a]/60 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
            style={{ fontWeight: 600, ...glassStyle }}>
            <Upload className="w-3.5 h-3.5" /> Upload Photo
          </button>
          <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileUpload} className="hidden" />
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </motion.div>

        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          className="w-full max-w-sm bg-white/45 dark:bg-[#1c1c1e]/60 border border-white/50 dark:border-[#38383a]/60 shadow-[0_4px_30px_rgba(0,0,0,0.06)] rounded-[22px] p-5 text-center"
          style={glassStyle}>
          <p className="text-[14px] text-[#1c1c1e] dark:text-white" style={{ fontWeight: 600 }}>
            Use your own photo
          </p>
          <p className="text-[12px] text-[#8e8e93] mt-2 leading-relaxed">
            Import an avatar from your camera or album. Default preset avatars have been removed.
          </p>
        </motion.div>

        {/* Continue */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
          className="w-full max-w-sm mt-6 mb-12">
          <motion.button whileTap={{ scale: 0.97 }} onClick={handleContinue} disabled={!chosenAvatar}
            className={`w-full py-3.5 rounded-[14px] text-[15px] flex items-center justify-center gap-2 transition-all ${
              chosenAvatar
                ? 'bg-rose-500 text-white shadow-[0_2px_12px_rgba(244,63,94,0.35)]'
                : 'bg-[#f2f2f7] dark:bg-[#2c2c2e] text-[#8e8e93] cursor-not-allowed'
            }`} style={{ fontWeight: 600 }}>
            Get Started <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
