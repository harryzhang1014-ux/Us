import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Calendar, Plus, Camera, Trash2, Image as ImageIcon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import * as api from './api';

interface Photo {
  id: string;
  src: string;
  caption: string;
  date: string;
  isLocal?: boolean;
}

const DEFAULT_PHOTOS: Photo[] = [];

function loadPhotos(): Photo[] {
  try {
    const saved = localStorage.getItem('albumPhotos');
    if (saved) {
      const local: Photo[] = JSON.parse(saved);
      return local;
    }
  } catch {}
  return [];
}

function saveLocalPhotos(photos: Photo[]) {
  const local = photos.filter(p => p.isLocal);
  try {
    localStorage.setItem('albumPhotos', JSON.stringify(local));
  } catch (err) {
    console.error('Failed to save photos to localStorage (quota exceeded?):', err);
  }
}

export function Album() {
  const [photos, setPhotos] = useState<Photo[]>(loadPhotos);
  const [remoteReady, setRemoteReady] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showUploader, setShowUploader] = useState(false);
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { setUploadPreview(reader.result as string); };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (!uploadPreview) return;
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const newPhoto: Photo = { id: `local_${Date.now()}`, src: uploadPreview, caption: uploadCaption.trim() || 'New memory', date: dateStr, isLocal: true };
    const updated = [newPhoto, ...photos];
    setPhotos(updated);
    saveLocalPhotos(updated);
    setShowUploader(false);
    setUploadCaption('');
    setUploadPreview(null);
  };

  const handleDelete = async (id: string) => {
    const updated = photos.filter(p => p.id !== id);
    setPhotos(updated);
    setSelectedPhoto(null);
    
    // Explicitly delete from remote
    if (remoteReady) {
      try {
        const currentRemote = await api.getAlbumPhotos();
        const updatedRemote = currentRemote.filter((p: any) => p.id !== id);
        await api.saveAlbumPhotos(updatedRemote);
      } catch (e) {
        console.error("Failed to update remote after delete", e);
      }
    }
  };

  const fetchRemotePhotos = async () => {
    try {
      const remote = await api.getAlbumPhotos();
      if (Array.isArray(remote) && remote.length > 0) {
        const withLocalFlag = remote.map((p: Photo) => ({ ...p, isLocal: false }));
        setPhotos(prev => {
          const localOnly = prev.filter(p => p.isLocal);
          const combined = [...localOnly];
          for (const r of withLocalFlag) {
            if (!combined.some(c => c.id === r.id)) combined.push(r);
          }
          return combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        });
      }
    } catch {}
    setRemoteReady(true);
  };

  useEffect(() => {
    fetchRemotePhotos();
  }, []);

  useEffect(() => {
    // Setup Realtime Subscription
    let unsubscribe: () => void;
    api.getMyProfile().then(profile => {
      if (profile?.pairId) {
        unsubscribe = api.subscribeToPairUpdates(profile.pairId, {
          onNotesUpdate: () => {
            fetchRemotePhotos();
          }
        });
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    saveLocalPhotos(photos);
    if (!remoteReady) return;

    const saveRemote = async () => {
      try {
        const currentRemote = await api.getAlbumPhotos();
        const remoteArray = Array.isArray(currentRemote) ? currentRemote : [];
        const combined = [...photos, ...remoteArray];
        // Keep unique
        const uniqueCombined = Array.from(new Map(combined.map(item => [item.id, item])).values());
        await api.saveAlbumPhotos(uniqueCombined);
      } catch (e) {
        console.error("Failed to save album state", e);
      }
    };
    
    saveRemote();
  }, [photos, remoteReady]);

  return (
    <div className="flex flex-col min-h-full bg-[#f2f2f7] dark:bg-[#000000] relative overflow-hidden pb-4 transition-colors">
      <div className="absolute top-[-5%] right-[-10%] w-[45vw] h-[45vw] bg-rose-200/25 dark:bg-rose-900/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 pt-14 pb-4 px-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[34px] text-[#1c1c1e] dark:text-white tracking-tight" style={{ fontFamily: 'Pacifico, cursive', fontWeight: 400, letterSpacing: '-0.02em' }}>
            Our Album
          </h1>
          <p className="text-[13px] text-[#8e8e93] mt-0.5" style={{ letterSpacing: '-0.01em' }}>{photos.length} memories captured</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowUploader(true)}
          className="absolute top-14 right-6 w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center shadow-[0_2px_12px_rgba(244,63,94,0.4)]"
        >
          <Plus className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Photo Grid */}
      <div className="relative z-10 px-4 pb-4">
        <div className="grid grid-cols-2 gap-2">
          {photos.map((photo, index) => (
            <motion.button
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.4 }}
              onClick={() => setSelectedPhoto(photo)}
              className={`relative overflow-hidden rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${
                index === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'
              }`}
            >
              <ImageWithFallback src={photo.src} alt={photo.caption} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3">
                <p className="text-white text-[13px] text-left" style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>{photo.caption}</p>
                <p className="text-white/60 text-[11px] text-left mt-0.5">{photo.date}</p>
              </div>
              {photo.isLocal && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center shadow-sm">
                  <Heart className="w-3 h-3 text-white" fill="white" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Upload Sheet */}
      <AnimatePresence>
        {showUploader && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { setShowUploader(false); setUploadPreview(null); setUploadCaption(''); }}
          >
            <div className="absolute inset-0 bg-black/25" style={{ backdropFilter: 'saturate(180%) blur(20px)', WebkitBackdropFilter: 'saturate(180%) blur(20px)' }} />
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-t-[22px] p-6 pb-10 bg-white/75 dark:bg-[#1c1c1e]/85 border-t border-white/60 dark:border-[#38383a]/60"
              style={{ backdropFilter: 'saturate(180%) blur(40px)', WebkitBackdropFilter: 'saturate(180%) blur(40px)' }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-9 h-[5px] rounded-full bg-[#3c3c43]/20 dark:bg-[#545458]/40" />
              </div>
              <h3 className="text-center text-[#1c1c1e] dark:text-white mb-5" style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>Add a Memory</h3>

              {uploadPreview ? (
                <div className="relative rounded-[16px] overflow-hidden mb-4 aspect-[4/3]">
                  <ImageWithFallback src={uploadPreview} alt="Preview" className="w-full h-full object-cover" />
                  <button onClick={() => setUploadPreview(null)}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center text-white"
                    style={{ backdropFilter: 'blur(10px)' }}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 mb-4">
                  <label className="flex-1 cursor-pointer">
                    <div className="aspect-[4/3] bg-[#f2f2f7] dark:bg-[#2c2c2e] rounded-[16px] border border-[#3c3c43]/8 dark:border-[#545458]/24 flex flex-col items-center justify-center gap-2 hover:bg-[#e5e5ea] dark:hover:bg-[#3a3a3c] transition-colors">
                      <Camera className="w-8 h-8 text-[#8e8e93]" />
                      <span className="text-[12px] text-[#8e8e93]" style={{ fontWeight: 500 }}>Take Photo</span>
                    </div>
                    <input type="file" accept="image/*" capture="environment" onChange={handleFileSelect} className="hidden" />
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <div className="aspect-[4/3] bg-[#f2f2f7] dark:bg-[#2c2c2e] rounded-[16px] border border-[#3c3c43]/8 dark:border-[#545458]/24 flex flex-col items-center justify-center gap-2 hover:bg-[#e5e5ea] dark:hover:bg-[#3a3a3c] transition-colors">
                      <ImageIcon className="w-8 h-8 text-[#8e8e93]" />
                      <span className="text-[12px] text-[#8e8e93]" style={{ fontWeight: 500 }}>From Gallery</span>
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                  </label>
                </div>
              )}

              <input
                type="text" placeholder="Add a caption..."
                value={uploadCaption} onChange={(e) => setUploadCaption(e.target.value)}
                className="w-full mb-4 px-4 py-3 bg-[#f2f2f7]/80 dark:bg-[#2c2c2e]/80 rounded-[14px] text-[14px] text-[#1c1c1e] dark:text-white placeholder:text-[#8e8e93] outline-none border border-[#3c3c43]/8 dark:border-[#545458]/24 focus:border-rose-400/50 transition-colors"
              />

              <motion.button whileTap={{ scale: 0.97 }} onClick={handleUpload} disabled={!uploadPreview}
                className={`w-full py-3 rounded-[14px] text-[14px] flex items-center justify-center gap-2 transition-all ${
                  uploadPreview
                    ? 'bg-rose-500 text-white shadow-[0_2px_12px_rgba(244,63,94,0.3)]'
                    : 'bg-[#f2f2f7] dark:bg-[#2c2c2e] text-[#8e8e93] cursor-not-allowed'
                }`} style={{ fontWeight: 600 }}>
                <Plus className="w-4 h-4" /> Save Memory
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="absolute inset-0 bg-black/70" style={{ backdropFilter: 'saturate(180%) blur(20px)', WebkitBackdropFilter: 'saturate(180%) blur(20px)' }} />
            <motion.div
              className="relative w-full max-w-lg z-10"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -top-10 right-0 flex items-center gap-3">
                {selectedPhoto.isLocal && (
                  <button onClick={() => handleDelete(selectedPhoto.id)} className="text-white/60 hover:text-red-400 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
                <button onClick={() => setSelectedPhoto(null)} className="text-white/60 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="rounded-[20px] overflow-hidden shadow-2xl">
                <ImageWithFallback src={selectedPhoto.src} alt={selectedPhoto.caption} className="w-full aspect-[4/3] object-cover" />
              </div>
              <div className="mt-4 text-center">
                <p className="text-white text-[15px]" style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>{selectedPhoto.caption}</p>
                <div className="flex items-center justify-center gap-1.5 mt-1.5">
                  <Calendar className="w-3 h-3 text-white/40" />
                  <p className="text-white/40 text-[12px]">{selectedPhoto.date}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
