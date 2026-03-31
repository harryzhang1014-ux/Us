import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getSupabase } from './api';
import { useAuth } from './AuthContext';
import { Heart } from 'lucide-react';

interface Ripple {
  id: string;
  x: number;
  y: number;
  fromPartner: boolean;
  timestamp: number;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  angle: number;
  distance: number;
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export function SoulPulse() {
  const { userInfo } = useAuth();
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [channel, setChannel] = useState<any>(null);
  const [isPartnerOnline, setIsPartnerOnline] = useState(false);
  const [lastPulseTime, setLastPulseTime] = useState(0);
  const [heartbeatActive, setHeartbeatActive] = useState(false);

  const pairId = userInfo.pairId;
  const userId = userInfo.id;

  const spawnParticles = useCallback((x: number, y: number, fromPartner: boolean) => {
    const count = fromPartner ? 8 : 5;
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
      x,
      y,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 0.3,
      duration: 1 + Math.random() * 1,
      angle: (360 / count) * i + Math.random() * 30,
      distance: 40 + Math.random() * 80,
    }));
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 2500);
  }, []);

  const addRipple = useCallback((x: number, y: number, fromPartner: boolean) => {
    const id = Math.random().toString(36).substring(7);
    const newRipple: Ripple = { id, x, y, fromPartner, timestamp: Date.now() };
    setRipples(prev => [...prev, newRipple]);
    spawnParticles(x, y, fromPartner);
    setLastPulseTime(Date.now());

    if (fromPartner) {
      setHeartbeatActive(true);
      setTimeout(() => setHeartbeatActive(false), 2000);
    }

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 2500);
  }, [spawnParticles]);

  useEffect(() => {
    if (!pairId) return;

    const sb = getSupabase();
    const pulseChannel = sb.channel(`pulse:${pairId}`, {
      config: {
        broadcast: { self: false },
        presence: { key: userId },
      },
    });

    pulseChannel
      .on('broadcast', { event: 'heartbeat' }, ({ payload }) => {
        if (payload.userId !== userId) {
          addRipple(payload.x, payload.y, true);
        }
      })
      .on('presence', { event: 'sync' }, () => {
        const state = pulseChannel.presenceState();
        const partnerPresent = Object.keys(state).some(key => key !== userId);
        setIsPartnerOnline(partnerPresent);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await pulseChannel.track({ online_at: new Date().toISOString() });
        }
      });

    setChannel(pulseChannel);

    return () => {
      pulseChannel.unsubscribe();
    };
  }, [pairId, userId, addRipple]);

  const handleGlobalTouch = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!pairId || !channel) return;
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('textarea') || target.closest('[role="button"]')) return;

    let x: number, y: number;
    if ('clientX' in e) {
      x = e.clientX;
      y = e.clientY;
    } else {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }

    addRipple(x, y, false);

    channel.send({
      type: 'broadcast',
      event: 'heartbeat',
      payload: { userId, x, y },
    });
  }, [pairId, channel, userId, addRipple]);

  useEffect(() => {
    window.addEventListener('mousedown', handleGlobalTouch as any);
    window.addEventListener('touchstart', handleGlobalTouch as any);
    return () => {
      window.removeEventListener('mousedown', handleGlobalTouch as any);
      window.removeEventListener('touchstart', handleGlobalTouch as any);
    };
  }, [handleGlobalTouch]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {ripples.map(ripple => (
          <RippleEffect key={ripple.id} ripple={ripple} />
        ))}
      </AnimatePresence>
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ 
            x: p.x, 
            y: p.y, 
            scale: 0, 
            opacity: 1 
          }}
          animate={{ 
            x: p.x + Math.cos(p.angle * Math.PI / 180) * p.distance,
            y: p.y + Math.sin(p.angle * Math.PI / 180) * p.distance,
            scale: 1, 
            opacity: 0 
          }}
          transition={{ 
            duration: p.duration, 
            delay: p.delay, 
            ease: 'easeOut' 
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'rgba(251,113,133,0.8)',
            boxShadow: '0 0 8px rgba(251,113,133,0.6)'
          }}
        />
      ))}
    </div>
  );
}

/* Premium multi-layer ripple */
function RippleEffect({ ripple }: { ripple: Ripple }) {
  const isPartner = ripple.fromPartner;
  const baseColor = isPartner ? 'rgba(244,63,94' : 'rgba(251,113,133';

  return (
    <>
      {/* Outer glow ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0.15 }}
        animate={{ scale: 6, opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'absolute',
          left: ripple.x - 40,
          top: ripple.y - 40,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${baseColor},0.08) 0%, transparent 70%)`,
        }}
      />
      {/* Main ripple ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0.7 }}
        animate={{ scale: 4, opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'absolute',
          left: ripple.x - 50,
          top: ripple.y - 50,
          width: 100,
          height: 100,
          borderRadius: '50%',
          border: `1.5px solid ${baseColor},0.35)`,
          boxShadow: `0 0 20px ${baseColor},0.15), inset 0 0 20px ${baseColor},0.05)`,
        }}
      />
      {/* Inner filled ripple */}
      <motion.div
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 2.5, opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: ripple.x - 30,
          top: ripple.y - 30,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${baseColor},0.25) 0%, ${baseColor},0.05) 60%, transparent 100%)`,
          filter: 'blur(2px)',
        }}
      />
      {/* Center flash */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 1.5, opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: ripple.x - 8,
          top: ripple.y - 8,
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: `radial-gradient(circle, white 0%, ${baseColor},0.6) 50%, transparent 100%)`,
          filter: 'blur(1px)',
        }}
      />
      {/* Partner heart icon */}
      {isPartner && (
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.1 }}
          style={{
            position: 'absolute',
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
          className="flex items-center justify-center"
        >
          <Heart className="w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" fill="white" />
        </motion.div>
      )}
    </>
  );
}