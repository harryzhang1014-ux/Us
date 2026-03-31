import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash2, BookHeart, X, ChevronLeft, Lock, Users, Loader2 } from "lucide-react";
import { useAuth } from "./AuthContext";
import * as api from "./api";

type NoteType = "private" | "shared";

interface Note {
  id: string;
  content: string;
  date: string;
  type: NoteType;
  author?: string;
  authorId?: string;
}

function cn(...inputs: any[]) { return inputs.filter(Boolean).join(' '); }

const glassCard = "backdrop-blur-2xl bg-white/40 dark:bg-[#1c1c1e]/60 border border-white/50 dark:border-[#38383a]/60 shadow-[0_2px_20px_rgba(0,0,0,0.04)]";

export function Notes() {
  const { userInfo } = useAuth();
  const [activeTab, setActiveTab] = useState<NoteType>("private");

  const [privateNotes, setPrivateNotes] = useState<Note[]>(() => {
    try {
      const saved = localStorage.getItem("loveNotes_private");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [sharedNotes, setSharedNotes] = useState<Note[]>([]);
  const [loadingShared, setLoadingShared] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    localStorage.setItem("loveNotes_private", JSON.stringify(privateNotes));
  }, [privateNotes]);

  const loadSharedNotes = useCallback(async () => {
    setLoadingShared(true);
    try {
      const notes = await api.getSharedNotes();
      const list = Array.isArray(notes) ? notes : [];
      setSharedNotes(list.map((n: any) => ({
        id: n.id,
        content: n.content,
        date: n.date || n.createdAt,
        type: "shared" as NoteType,
        author: n.authorName,
        authorId: n.authorId,
      })));
    } catch (err) {
      console.log("Load shared notes error:", err);
    } finally {
      setLoadingShared(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "shared") loadSharedNotes();
  }, [activeTab, loadSharedNotes]);

  useEffect(() => {
    if (activeTab !== "shared") return;
    const interval = setInterval(loadSharedNotes, 5000);
    return () => clearInterval(interval);
  }, [activeTab, loadSharedNotes]);

  const displayNotes = activeTab === "private" ? privateNotes : sharedNotes;

  const addNote = async () => {
    if (!newContent.trim()) return;
    if (activeTab === "private") {
      const note: Note = { id: Date.now().toString(), content: newContent.trim(), date: new Date().toISOString(), type: "private", author: "You" };
      setPrivateNotes(prev => [note, ...prev]);
    } else {
      setSaving(true);
      try {
        await api.addSharedNote(newContent.trim());
        await loadSharedNotes();
      } catch (err) {
        console.log("Add shared note error:", err);
      } finally {
        setSaving(false);
      }
    }
    setNewContent("");
    setIsWriting(false);
  };

  const deleteNote = async (id: string, type: NoteType) => {
    if (type === "private") {
      setPrivateNotes(prev => prev.filter(n => n.id !== id));
    } else {
      try {
        await api.deleteSharedNote(id);
        setSharedNotes(prev => prev.filter(n => n.id !== id));
      } catch (err) {
        console.log("Delete shared note error:", err);
      }
    }
    setSelectedNote(null);
  };

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const formatTime = (iso: string) => new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex flex-col min-h-full bg-[#f2f2f7] dark:bg-[#000000] relative overflow-hidden pb-4 transition-colors">
      <div className="absolute top-[-5%] right-[-10%] w-[45vw] h-[45vw] bg-rose-200/25 dark:bg-rose-900/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-15%] w-[35vw] h-[35vw] bg-pink-300/20 dark:bg-pink-900/8 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 pt-14 pb-3 px-6">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[34px] text-[#1c1c1e] dark:text-white tracking-tight" style={{ fontFamily: 'Pacifico, cursive', fontWeight: 400, letterSpacing: '-0.02em' }}>Notes</h1>
            <p className="text-[13px] text-[#8e8e93] mt-0.5" style={{ letterSpacing: '-0.01em' }}>
              {privateNotes.length} private, {sharedNotes.length} shared
            </p>
          </div>
          <div
            className="absolute top-14 right-6 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backdropFilter: 'saturate(180%) blur(20px)', background: 'rgba(255,255,255,0.45)', border: '0.5px solid rgba(255,255,255,0.6)' }}
          >
            <BookHeart className="w-5 h-5 text-rose-400" />
          </div>
        </div>
      </div>

      {/* Tabs — iOS segmented control style */}
      <div className="relative z-10 px-5 pb-3">
        <div
          className="rounded-[10px] p-[2px] flex bg-[#e9e9ea]/80 dark:bg-[#38383a]/60"
          style={{ backdropFilter: 'saturate(180%) blur(20px)' }}
        >
          {([
            { key: "private" as NoteType, label: "Private", icon: Lock },
            { key: "shared" as NoteType, label: "Shared", icon: Users },
          ]).map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => { setActiveTab(key); setIsWriting(false); setNewContent(""); }}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-[7px] rounded-[8px] text-[13px] transition-all relative",
                activeTab === key
                  ? "bg-white dark:bg-[#636366] text-[#1c1c1e] dark:text-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]"
                  : "text-[#8e8e93]"
              )} style={{ fontWeight: activeTab === key ? 600 : 500 }}>
              <Icon className="w-3.5 h-3.5" />{label}
            </button>
          ))}
        </div>
      </div>

      {/* Write */}
      <div className="relative z-10 px-5 pb-3">
        <motion.div
          className={cn("rounded-[18px] overflow-hidden", glassCard)}
          style={{ backdropFilter: 'saturate(180%) blur(40px)', WebkitBackdropFilter: 'saturate(180%) blur(40px)' }}
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {!isWriting ? (
              <motion.button key="trigger" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsWriting(true)} className="w-full p-5 flex items-center gap-3 text-left group">
                <div className={cn("w-9 h-9 rounded-full flex items-center justify-center shrink-0",
                  activeTab === "private" ? "bg-rose-500/10" : "bg-fuchsia-500/10")}>
                  <Plus className={cn("w-4 h-4", activeTab === "private" ? "text-rose-500" : "text-fuchsia-500")} />
                </div>
                <span className="text-[14px] text-[#8e8e93]" style={{ fontWeight: 400 }}>
                  {activeTab === "private" ? "Write a private note..." : "Write a shared note..."}
                </span>
              </motion.button>
            ) : (
              <motion.div key="editor" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[14px] text-[#1c1c1e] dark:text-white" style={{ fontWeight: 600 }}>
                    {activeTab === "private" ? "Private Entry" : "Shared Entry"}
                  </span>
                  <button onClick={() => { setIsWriting(false); setNewContent(""); }}
                    className="w-7 h-7 rounded-full bg-[#f2f2f7] dark:bg-[#38383a] flex items-center justify-center">
                    <X className="w-3.5 h-3.5 text-[#8e8e93]" />
                  </button>
                </div>
                <textarea autoFocus value={newContent} onChange={(e) => setNewContent(e.target.value)}
                  placeholder={activeTab === "private" ? "What's on your mind..." : "Share something with your partner..."}
                  rows={4}
                  className="w-full bg-[#f2f2f7]/80 dark:bg-[#2c2c2e]/80 rounded-[14px] px-4 py-3 text-[14px] text-[#1c1c1e] dark:text-white placeholder:text-[#8e8e93] outline-none border border-[#3c3c43]/8 dark:border-[#545458]/24 focus:border-rose-400/50 resize-none transition-colors" />
                <motion.button whileTap={{ scale: 0.97 }} onClick={addNote} disabled={!newContent.trim() || saving}
                  className={cn("w-full mt-3 py-2.5 rounded-[14px] text-[14px] flex items-center justify-center gap-2 transition-all",
                    newContent.trim() && !saving
                      ? "bg-rose-500 text-white shadow-[0_2px_12px_rgba(244,63,94,0.3)]"
                      : "bg-[#f2f2f7] dark:bg-[#2c2c2e] text-[#8e8e93] cursor-not-allowed"
                  )} style={{ fontWeight: 600 }}>
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {saving ? 'Saving...' : 'Save'}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* List */}
      <div className="relative z-10 px-5 space-y-2 flex-1 overflow-y-auto">
        {loadingShared && activeTab === "shared" && displayNotes.length === 0 && (
          <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 text-[#8e8e93] animate-spin" /></div>
        )}
        <AnimatePresence mode="popLayout">
          {displayNotes.map((note, index) => (
            <motion.div key={note.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}
              transition={{ delay: index * 0.04, duration: 0.4 }}
              onClick={() => setSelectedNote(note)}
              className={cn("rounded-[16px] p-4 cursor-pointer active:scale-[0.98] transition-all", glassCard)}
              style={{ backdropFilter: 'saturate(180%) blur(40px)', WebkitBackdropFilter: 'saturate(180%) blur(40px)' }}
            >
              <p className="text-[14px] text-[#1c1c1e] dark:text-white leading-relaxed line-clamp-3" style={{ letterSpacing: '-0.01em' }}>{note.content}</p>
              <div className="flex items-center justify-between mt-2.5">
                <div className="flex items-center gap-1.5">
                  <div className={cn("w-1.5 h-1.5 rounded-full", note.type === "private" ? "bg-rose-400" : "bg-fuchsia-400")} />
                  <span className="text-[11px] text-[#8e8e93]">{formatDate(note.date)}</span>
                  <span className="text-[11px] text-[#aeaeb2] ml-1">{formatTime(note.date)}</span>
                </div>
                {note.type === "shared" && note.author && (
                  <span className={cn("text-[11px] px-2 py-0.5 rounded-full",
                    note.authorId === userInfo.id ? "text-rose-500 bg-rose-500/8" : "text-fuchsia-500 bg-fuchsia-500/8"
                  )} style={{ fontWeight: 500 }}>
                    {note.authorId === userInfo.id ? 'You' : note.author}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {displayNotes.length === 0 && !loadingShared && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-col items-center justify-center py-16">
            <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-4",
              activeTab === "private" ? "bg-rose-500/8" : "bg-fuchsia-500/8")}>
              {activeTab === "private" ? <Lock className="w-7 h-7 text-rose-300" /> : <Users className="w-7 h-7 text-fuchsia-300" />}
            </div>
            <p className="text-[14px] text-[#8e8e93]" style={{ fontWeight: 500 }}>
              {activeTab === "private" ? "No private notes yet" : "No shared notes yet"}
            </p>
            <p className="text-[12px] text-[#aeaeb2] mt-1">
              {activeTab === "private" ? "Only you can see these" : "Both of you can read and write"}
            </p>
          </motion.div>
        )}
      </div>

      {/* Detail Sheet */}
      <AnimatePresence>
        {selectedNote && (
          <motion.div className="fixed inset-0 z-[100] flex items-end justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedNote(null)}>
            <div className="absolute inset-0 bg-black/25" style={{ backdropFilter: 'saturate(180%) blur(20px)' }} />
            <motion.div initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-t-[22px] p-6 pb-10 max-h-[80vh] overflow-y-auto bg-white/75 dark:bg-[#1c1c1e]/85 border-t border-white/60 dark:border-[#38383a]/60"
              style={{ backdropFilter: 'saturate(180%) blur(40px)' }}>
              <div className="flex justify-center mb-4"><div className="w-9 h-[5px] rounded-full bg-[#3c3c43]/20 dark:bg-[#545458]/40" /></div>
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => setSelectedNote(null)}
                  className="flex items-center gap-1 text-[13px] text-rose-500" style={{ fontWeight: 500 }}>
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <div className={cn("flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]",
                  selectedNote.type === "private" ? "bg-rose-500/8 text-rose-500" : "bg-fuchsia-500/8 text-fuchsia-500"
                )} style={{ fontWeight: 500 }}>
                  {selectedNote.type === "private" ? (<><Lock className="w-2.5 h-2.5" /> Private</>) : (<><Users className="w-2.5 h-2.5" /> Shared</>)}
                </div>
              </div>
              {selectedNote.type === "shared" && selectedNote.author && (
                <div className="mb-3 text-[12px] text-[#8e8e93]">
                  By <span className="text-fuchsia-500" style={{ fontWeight: 600 }}>{selectedNote.authorId === userInfo.id ? 'You' : selectedNote.author}</span> on {formatDate(selectedNote.date)}
                </div>
              )}
              <p className="text-[14px] text-[#1c1c1e] dark:text-white leading-relaxed whitespace-pre-wrap mb-6">{selectedNote.content}</p>
              {(selectedNote.type === "private" || selectedNote.authorId === userInfo.id) && (
                <button onClick={() => deleteNote(selectedNote.id, selectedNote.type)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[14px] text-[14px] text-rose-500 hover:bg-rose-500/8 border border-[#3c3c43]/8 dark:border-[#545458]/24 transition-colors" style={{ fontWeight: 500 }}>
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
