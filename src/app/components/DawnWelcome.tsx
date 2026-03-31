import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from './AuthContext';

const STORAGE_KEY = 'us-dawn-welcome-seen';

export function useDawnWelcome() {
  const [show, setShow] = useState(() => {
    // 调试模式：取消下行注释可每次刷新都播放动画
    // localStorage.removeItem(STORAGE_KEY);
    return !localStorage.getItem(STORAGE_KEY);
  });

  const dismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setShow(false);
  }, []);

  return { show, dismiss };
}

/*
 * 「晨曦微光」入口动画 — The Morning Glow
 *
 * Phase 1 (0–1s):     玫瑰粉雾状 Mesh Gradient 从中心晕染扩散
 * Phase 2 (1–2.8s):   "Hello, Crystal" 以字重渐变浮现（Light → Semibold）
 * Phase 3 (2.8–4.6s): 第一段消失，"Welcome to Us" 浮现，Us 用玫瑰金高亮
 * Phase 4 (4.6–5.8s): 光团向四周扩散消散，无缝过渡到首页
 */
export function DawnWelcome({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),    // trigger glow
      setTimeout(() => setPhase(2), 1000),    // show "Hello, Crystal"
      setTimeout(() => setPhase(3), 2800),    // switch to "Welcome to Us"
      setTimeout(() => setPhase(4), 4600),    // farewell expansion
      setTimeout(() => onComplete(), 5800),   // done
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 4 ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white dark:bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* ── Mesh Gradient Glow ── */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: '60vmax',
              height: '60vmax',
              background:
                'radial-gradient(circle, rgba(251,113,133,0.45) 0%, rgba(253,164,175,0.3) 30%, rgba(252,231,243,0.15) 60%, transparent 80%)',
              filter: 'blur(60px)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              phase >= 4
                ? { scale: 3.5, opacity: 0 }
                : phase >= 1
                  ? { scale: 1.2, opacity: 1 }
                  : { scale: 0, opacity: 0 }
            }
            transition={
              phase >= 4
                ? { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }
                : { duration: 2, ease: [0.25, 0.1, 0.25, 1] }
            }
          />

          {/* Secondary glow for depth */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: '35vmax',
              height: '35vmax',
              background:
                'radial-gradient(circle, rgba(244,63,94,0.2) 0%, rgba(251,113,133,0.1) 50%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              phase >= 1 ? { scale: 1, opacity: 0.8 } : {}
            }
            transition={{ duration: 2.5, ease: 'easeOut', delay: 0.3 }}
          />

          {/* ── Text Layer ── */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Phase 2: "Hello, Crystal" */}
            <AnimatePresence mode="wait">
              {phase === 2 && (
                <motion.div
                  key="hello"
                  className="flex flex-col items-center gap-1"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <h1
                    className="text-[36px] tracking-tight text-[#1c1c1e] dark:text-white select-none"
                    style={{ fontWeight: 600 }}
                  >
                    Hello, Crystal
                  </h1>
                </motion.div>
              )}

              {/* Phase 3: "Welcome to Us" */}
              {phase === 3 && (
                <motion.div
                  key="welcome"
                  className="flex flex-col items-center gap-1"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <h1
                    className="text-[36px] tracking-tight text-[#1c1c1e] dark:text-white select-none"
                    style={{ fontWeight: 500 }}
                  >
                    Welcome to{' '}
                    <span
                      className="bg-gradient-to-r from-rose-400 via-pink-500 to-rose-500 bg-clip-text text-transparent"
                      style={{ fontFamily: 'Pacifico, cursive', fontWeight: 400 }}
                    >
                    Unite Spark
                    </span>
                    {' '}
                    <motion.span
                      className="inline-block text-rose-400/80"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.5, type: 'spring', damping: 10 }}
                    >
                      ✦
                    </motion.span>
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
