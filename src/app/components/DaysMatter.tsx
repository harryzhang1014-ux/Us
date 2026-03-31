import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Calendar as CalendarIcon, ArrowUp, ArrowDown, Trash2, ChevronRight, Image as ImageIcon, Heart, Camera, Pin } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { cn } from './ui/utils';
import * as api from './api';

const glassCard = "backdrop-blur-2xl bg-white/40 dark:bg-[#1c1c1e]/60 border border-white/50 dark:border-[#38383a]/60 shadow-[0_2px_20px_rgba(0,0,0,0.04)]";

export interface DayEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  type: 'countdown' | 'anniversary';
  cover: string;
  pinned?: boolean;
}

const PRESET_EVENTS: DayEvent[] = [];

function calcDays(dateStr: string, type: 'countdown' | 'anniversary'): number {
  const target = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (type === 'anniversary') {
    // For anniversary: calculate days passed since the target date.
    const diff = Math.floor((today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  } else {
    // For countdown: calculate days remaining until the target date.
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  }
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const STORAGE_KEY = 'unitespark_days_matter';

function loadEvents(): DayEvent[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {}
  return PRESET_EVENTS;
}

function saveEvents(events: DayEvent[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (err) {
    console.error('Failed to save events to localStorage (quota exceeded?):', err);
  }
}

export function DaysMatter() {
  const [events, setEvents] = useState<DayEvent[]>(loadEvents);
  const [remoteReady, setRemoteReady] = useState(false);
  const [, setClockTick] = useState(Date.now());
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState<Date | undefined>(new Date());
  const [newType, setNewType] = useState<'countdown' | 'anniversary'>('countdown');
  const [newCover, setNewCover] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadData = async () => {
      let cancelled = false;
      try {
        const remoteEvents = await api.getDayEvents();
        if (!cancelled && Array.isArray(remoteEvents) && remoteEvents.length > 0) {
          setEvents(remoteEvents);
        }
      } catch {}
      if (!cancelled) setRemoteReady(true);
      return () => { cancelled = true; };
    };
    
    const cleanupLoad = loadData();

    // Setup Realtime Subscription
    let unsubscribe: () => void;
    api.getMyProfile().then(profile => {
      if (profile?.pairId) {
        unsubscribe = api.subscribeToPairUpdates(profile.pairId, {
          onNotesUpdate: () => {
            loadData();
          }
        });
      }
    });

    return () => {
      cleanupLoad.then(c => c());
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setClockTick(Date.now()), 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    saveEvents(events);
    if (!remoteReady) return;
    api.saveDayEvents(events).catch(() => {});
  }, [events, remoteReady]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { setNewCover(reader.result as string); };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!newTitle.trim() || !newDate || !newCover) return;
    const dateStr = format(newDate, 'yyyy-MM-dd');
    const event: DayEvent = {
      id: `event-${Date.now()}`,
      title: newTitle.trim(),
      date: dateStr,
      type: newType,
      cover: newCover,
    };
    
    // Optimistic update
    const updatedEvents = [...events, event];
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    
    if (remoteReady) {
      api.saveDayEvents(updatedEvents).catch(() => {});
    }
    
    setNewTitle(''); setNewDate(new Date()); setNewType('countdown'); setNewCover(null);
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    const updatedEvents = events.filter(e => e.id !== id);
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    setExpandedId(null);
    
    if (remoteReady) {
      api.saveDayEvents(updatedEvents).catch(() => {});
    }
  };

  const handleTogglePin = (id: string) => {
    const updatedEvents = events.map(e => e.id === id ? { ...e, pinned: !e.pinned } : e);
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    
    if (remoteReady) {
      api.saveDayEvents(updatedEvents).catch(() => {});
    }
  };

  // Sort: pinned first, then by date
  const sorted = [...events].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const pinnedEvent = sorted.find(e => e.pinned);
  const otherEvents = sorted.filter(e => e !== pinnedEvent);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1 mb-1">
        <h2 className="text-[17px] text-[#1c1c1e] dark:text-white" style={{ fontFamily: 'Pacifico, cursive', fontWeight: 400 }}>Days Matter</h2>
        <div className="w-6 h-6 rounded-full bg-rose-500/10 flex items-center justify-center">
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
        </div>
      </div>

      {/* Pinned / Featured Event */}
      {pinnedEvent && (
        <motion.div
          className="rounded-[22px] relative overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] cursor-pointer"
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
          onClick={() => setExpandedId(expandedId === pinnedEvent.id ? null : pinnedEvent.id)}
        >
          {/* Cover Image Background */}
          <div className="absolute inset-0">
            <img src={pinnedEvent.cover} alt="Cover" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            <div className="absolute inset-0 bg-white/10 dark:bg-black/20 backdrop-blur-[2px]" />
          </div>

          <div className="relative p-5 text-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[14px] font-semibold text-white/90 shadow-sm">
                  {pinnedEvent.title}
                </div>
                <div className="text-[12px] text-white/70 mt-0.5 font-medium">
                  {formatDate(pinnedEvent.date)}
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-sm">
                <span className="text-[11px] font-semibold text-white/90">
                  {pinnedEvent.type === 'anniversary' ? 'anniversary' : 'countdown'}
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <motion.div
                className="text-[64px] text-white font-[800] tracking-tight leading-none drop-shadow-md"
                key={calcDays(pinnedEvent.date, pinnedEvent.type)}
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              >
                {calcDays(pinnedEvent.date, pinnedEvent.type).toLocaleString()}
                <span className="text-[16px] text-white/80 ml-2 font-medium tracking-normal">
                  {pinnedEvent.type === 'anniversary' ? 'days' : 'days left'}
                </span>
              </motion.div>
            </div>

            <AnimatePresence>
              {expandedId === pinnedEvent.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="flex items-center justify-center gap-3 mt-5 pt-4 border-t border-white/20">
                    <button onClick={(e) => { e.stopPropagation(); handleTogglePin(pinnedEvent.id); }}
                      className="text-[12px] text-white px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md transition-colors font-medium border border-white/10">
                      Unpin
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(pinnedEvent.id); }}
                      className="text-[12px] text-red-200 px-4 py-2 rounded-full bg-red-500/30 hover:bg-red-500/40 backdrop-blur-md transition-colors flex items-center gap-1.5 font-medium border border-red-500/20">
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Other Events List */}
      {otherEvents.length > 0 && (
        <motion.div
          className={cn("rounded-[22px] overflow-hidden", glassCard)}
          style={{ backdropFilter: 'saturate(180%) blur(40px)', WebkitBackdropFilter: 'saturate(180%) blur(40px)' }}
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}
        >
          {otherEvents.map((event, idx) => {
            const days = calcDays(event.date, event.type);
            const isExpanded = expandedId === event.id;
            const isCountdown = event.type === 'countdown';
            const accentColor = isCountdown ? 'text-amber-500 dark:text-amber-400' : 'text-rose-500 dark:text-rose-400';

            return (
              <motion.div
                key={event.id}
                className={cn(
                  "px-4 py-3.5 cursor-pointer transition-colors hover:bg-white/20 dark:hover:bg-white/5",
                  idx < otherEvents.length - 1 && "border-b border-[#3c3c43]/6 dark:border-[#545458]/12"
                )}
                onClick={() => setExpandedId(isExpanded ? null : event.id)}
                layout
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm border border-black/5 dark:border-white/10 bg-[#f2f2f7] dark:bg-[#1c1c1e]">
                    {event.cover ? (
                      <img src={event.cover} alt="Event Cover" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-[#8e8e93]/40" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] text-[#1c1c1e] dark:text-white truncate" style={{ fontWeight: 600 }}>{event.title}</div>
                    <div className="text-[11px] text-[#8e8e93] mt-0.5" style={{ fontWeight: 500 }}>
                      {formatDate(event.date)} · {isCountdown ? 'countdown' : 'anniversary'}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={cn("text-[22px]", accentColor)} style={{ fontWeight: 800, letterSpacing: '-0.03em' }}>
                      {days.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-[#8e8e93]" style={{ fontWeight: 600 }}>
                      {isCountdown ? 'days left' : 'days'}
                    </div>
                  </div>
                  <ChevronRight className={cn("w-4 h-4 text-[#c7c7cc] dark:text-[#48484a] transition-transform", isExpanded && "rotate-90")} />
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#3c3c43]/8 dark:border-[#545458]/16">
                        <button onClick={(e) => { e.stopPropagation(); handleTogglePin(event.id); }}
                          className="text-[12px] text-rose-600 dark:text-rose-400 px-4 py-2 rounded-full bg-rose-500/10 hover:bg-rose-500/20 transition-colors font-medium">
                          <span className="inline-flex items-center gap-1.5">
                            <Pin className="w-3.5 h-3.5" /> Pin to top
                          </span>
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleDelete(event.id); }}
                          className="text-[12px] text-red-600 dark:text-red-400 px-4 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 transition-colors flex items-center gap-1.5 font-medium">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Add Button / Form */}
      <AnimatePresence mode="wait">
        {showAddForm ? (
          <motion.div
            key="form"
            className={cn("rounded-[22px] p-5", glassCard)}
            style={{ backdropFilter: 'saturate(180%) blur(40px)', WebkitBackdropFilter: 'saturate(180%) blur(40px)' }}
            initial={{ y: 10, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -10, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-[15px] text-[#1c1c1e] dark:text-white" style={{ fontWeight: 600 }}>New Event</span>
              <button onClick={() => setShowAddForm(false)} className="w-8 h-8 rounded-full bg-[#3c3c43]/8 dark:bg-[#545458]/20 flex items-center justify-center hover:bg-[#3c3c43]/15 transition-colors">
                <X className="w-4 h-4 text-[#8e8e93]" />
              </button>
            </div>

            {/* Manual Cover Picker */}
            <div className="mb-5">
              <label className="text-[12px] text-[#8e8e93] font-medium mb-2 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" /> Event Photo
              </label>
              
              {newCover ? (
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-[#f2f2f7] dark:bg-[#1c1c1e] border border-[#3c3c43]/8 dark:border-white/10 group">
                  <img src={newCover} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setNewCover(null)}
                    className="absolute top-2 right-2 w-7 h-7 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2.5">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 aspect-[16/9] rounded-2xl bg-[#3c3c43]/5 dark:bg-[#545458]/12 border-2 border-dashed border-[#3c3c43]/10 dark:border-[#545458]/20 flex flex-col items-center justify-center gap-2 hover:bg-[#3c3c43]/8 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Camera className="w-5 h-5 text-rose-500" />
                    </div>
                    <span className="text-[12px] text-[#8e8e93]" style={{ fontWeight: 500 }}>Upload from Album</span>
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                </div>
              )}
            </div>

            {/* Title */}
            <div className="mb-4">
              <input
                type="text" placeholder="What's the occasion?" value={newTitle} onChange={e => setNewTitle(e.target.value)}
                className="w-full bg-[#3c3c43]/5 dark:bg-[#545458]/16 rounded-xl px-4 py-3 text-[15px] text-[#1c1c1e] dark:text-white placeholder-[#8e8e93]/60 outline-none focus:ring-2 focus:ring-rose-400/40 transition-all shadow-sm border border-transparent focus:border-rose-400/20"
                style={{ fontWeight: 500 }}
              />
            </div>

            {/* Date Picker */}
            <div className="mb-4">
              <Popover>
                <PopoverTrigger asChild>
                  <button className={cn(
                    "w-full bg-[#3c3c43]/5 dark:bg-[#545458]/16 rounded-xl px-4 py-3 text-[15px] outline-none focus:ring-2 focus:ring-rose-400/40 transition-all shadow-sm border border-transparent flex items-center justify-between",
                    !newDate ? "text-[#8e8e93]/60" : "text-[#1c1c1e] dark:text-white font-medium"
                  )}>
                    <span>{newDate ? format(newDate, 'PPP') : 'Pick a date'}</span>
                    <CalendarIcon className="w-4 h-4 text-[#8e8e93]" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-1 rounded-2xl backdrop-blur-3xl bg-white/70 dark:bg-[#2c2c2e]/80 border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]" align="center">
                  <Calendar
                    mode="single"
                    selected={newDate}
                    onSelect={setNewDate}
                    initialFocus
                    className="p-3"
                    classNames={{
                      day_selected: "bg-rose-500 text-white hover:bg-rose-600 hover:text-white focus:bg-rose-500 focus:text-white rounded-xl",
                      day_today: "bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl",
                      day: "h-9 w-9 p-0 font-medium aria-selected:opacity-100 rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/10",
                      head_cell: "text-[#8e8e93] font-medium text-[11px] uppercase tracking-wider",
                      nav_button: "h-8 w-8 bg-transparent p-0 opacity-60 hover:opacity-100 transition-opacity rounded-lg hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center",
                      caption: "flex justify-center pt-1 pb-3 relative items-center w-full",
                      caption_label: "text-[14px] font-semibold",
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Type Toggle */}
            <div className="flex gap-2.5 mb-5">
              <button onClick={() => setNewType('countdown')}
                className={cn("flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-[13px] transition-all",
                  newType === 'countdown' ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 ring-2 ring-amber-500/30" : "bg-[#3c3c43]/5 dark:bg-[#545458]/12 text-[#8e8e93] hover:bg-[#3c3c43]/10"
                )} style={{ fontWeight: 600 }}>
                Countdown
              </button>
              <button onClick={() => setNewType('anniversary')}
                className={cn("flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-[13px] transition-all",
                  newType === 'anniversary' ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 ring-2 ring-rose-500/30" : "bg-[#3c3c43]/5 dark:bg-[#545458]/12 text-[#8e8e93] hover:bg-[#3c3c43]/10"
                )} style={{ fontWeight: 600 }}>
                Anniversary
              </button>
            </div>

            {/* Submit */}
            <motion.button
              onClick={handleAdd}
              disabled={!newTitle.trim() || !newDate || !newCover}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "w-full py-3.5 rounded-2xl text-[15px] text-white transition-all shadow-sm",
                newTitle.trim() && newDate && newCover
                  ? "bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-90 shadow-[0_8px_20px_rgba(244,63,94,0.3)]"
                  : "bg-[#8e8e93]/40 dark:bg-[#545458]/40 cursor-not-allowed"
              )}
              style={{ fontWeight: 600 }}
            >
              Save Event
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            key="add-btn"
            onClick={() => setShowAddForm(true)}
            className={cn("w-full rounded-[22px] py-4 flex items-center justify-center gap-2.5 transition-colors", glassCard, "hover:bg-white/50 dark:hover:bg-[#1c1c1e]/70")}
            style={{ backdropFilter: 'saturate(180%) blur(40px)', WebkitBackdropFilter: 'saturate(180%) blur(40px)' }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="w-7 h-7 rounded-full bg-rose-500/10 flex items-center justify-center">
              <Plus className="w-4 h-4 text-rose-500" />
            </div>
            <span className="text-[14px] text-rose-500" style={{ fontWeight: 600 }}>Create New Day Event</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
