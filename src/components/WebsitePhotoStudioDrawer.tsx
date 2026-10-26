import React, { useState } from 'react';
import {
  Sliders,
  Upload,
  Lock,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  RefreshCw,
  User,
} from 'lucide-react';
import { GalleryItem } from '../data/galleryData.ts';
import { FacilityItem } from '../data/facilitiesData.ts';
import { generateCoachPortraitArt } from '../data/coachVisual.ts';

interface WebsitePhotoStudioDrawerProps {
  isLocked: boolean;
  websiteBackground: string;
  coachPhoto: string;
  gallery: GalleryItem[];
  facilities: FacilityItem[];
  onUpdateWebsiteBackground: (url: string) => void;
  onUpdateCoachPhoto: (url: string) => void;
  onUpdateGallery: (urls: string[]) => void;
  onUpdateFacilityPhoto: (facilityKey: string, url: string) => void;
  onLockWebsite: () => Promise<void>;
  onUnlockWebsite?: () => Promise<void> | void;
}

export const WebsitePhotoStudioDrawer: React.FC<WebsitePhotoStudioDrawerProps> = ({
  isLocked,
  websiteBackground,
  coachPhoto,
  gallery,
  facilities,
  onUpdateWebsiteBackground,
  onUpdateCoachPhoto,
  onUpdateGallery,
  onUpdateFacilityPhoto,
  onLockWebsite,
  onUnlockWebsite,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'wallpaper' | 'coach' | 'facilities' | 'gallery'>('coach');
  const [isUploading, setIsUploading] = useState(false);
  const [isLocking, setIsLocking] = useState(false);
  const [showConfirmLock, setShowConfirmLock] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (isLocked) {
    return (
      <div className="fixed bottom-4 right-4 z-50 font-sans">
        <button
          onClick={async () => {
            if (onUnlockWebsite) {
              await onUnlockWebsite();
            }
            setIsOpen(true);
          }}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#091726]/95 border-2 border-[#E11D48] text-white shadow-2xl backdrop-blur-xl hover:bg-[#050B14] transition-all transform hover:scale-105 active:scale-95 text-xs font-semibold luxury-glow-red"
          title="Enable Edit Option / Open Photo Studio"
        >
          <Sliders className="w-4 h-4 text-[#E11D48]" />
          <span>Edit Website Photos</span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#E11D48] text-white ml-1">
            Reopen
          </span>
        </button>
      </div>
    );
  }

  const uploadFileToServer = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const dataUrl = reader.result as string;
          const res = await fetch('/api/upload-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: file.name,
              dataUrl,
            }),
          });
          if (!res.ok) throw new Error('Upload server returned error');
          const data = await res.json();
          resolve(data.url);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleWallpaperUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      setStatusMessage('Uploading full-page atmosphere wallpaper...');
      const url = await uploadFileToServer(file);
      onUpdateWebsiteBackground(url);
      setStatusMessage('Wallpaper updated & saved to disk!');
    } catch (err) {
      console.error(err);
      setStatusMessage('Upload failed. Check server connection.');
    } finally {
      setIsUploading(false);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleCoachPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      setStatusMessage('Uploading Coach Kushal Sharma photo...');
      const url = await uploadFileToServer(file);
      onUpdateCoachPhoto(url);
      setStatusMessage('Coach photo updated & saved to disk!');
    } catch (err) {
      console.error(err);
      setStatusMessage('Coach photo upload failed.');
    } finally {
      setIsUploading(false);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleSingleFacilityUpload = async (facilityKey: string, file: File) => {
    try {
      setIsUploading(true);
      setStatusMessage(`Uploading photo for facility: ${facilityKey}...`);
      const url = await uploadFileToServer(file);
      onUpdateFacilityPhoto(facilityKey, url);
      setStatusMessage('Facility photo saved to disk!');
    } catch (err) {
      console.error(err);
      setStatusMessage('Facility upload failed.');
    } finally {
      setIsUploading(false);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleBatchGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      setIsUploading(true);
      setStatusMessage(`Uploading ${files.length} gallery photos to /public/uploads/...`);
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadFileToServer(files[i]);
        uploadedUrls.push(url);
      }
      onUpdateGallery(uploadedUrls);
      setStatusMessage(`Saved ${uploadedUrls.length} photos to permanent storage!`);
    } catch (err) {
      console.error(err);
      setStatusMessage('Batch upload failed.');
    } finally {
      setIsUploading(false);
      setTimeout(() => setStatusMessage(null), 3500);
    }
  };

  const handleConfirmLock = async () => {
    try {
      setIsLocking(true);
      setStatusMessage('Locking website into permanent manifest...');
      await onLockWebsite();
      setShowConfirmLock(false);
    } catch (err) {
      console.error(err);
      setStatusMessage('Lock failed. Try again.');
      setIsLocking(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {/* Floating Minimized Pill */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#091726]/95 border-2 border-[#E11D48] text-white shadow-2xl backdrop-blur-xl hover:bg-[#050B14] transition-all transform hover:scale-105 active:scale-95 luxury-glow-red"
        >
          <Sliders className="w-4 h-4 text-[#E11D48]" />
          <span className="text-xs font-semibold">Studio Making Phase: Unlocked</span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#E11D48] text-white">
            Upload Mode
          </span>
          <ChevronUp className="w-4 h-4 text-slate-300 ml-1" />
        </button>
      )}

      {/* Expanded Studio Manager Drawer */}
      {isOpen && (
        <div className="w-[360px] sm:w-[460px] rounded-2xl bg-[#091726]/98 border border-white/20 shadow-2xl p-5 backdrop-blur-2xl flex flex-col max-h-[85vh] text-white">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#E11D48]" />
              <div>
                <h3 className="text-sm font-bold font-serif">Website Photo Studio</h3>
                <p className="text-[11px] text-slate-300">Phase 1: Custom Asset Injection</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Status Alert */}
          {statusMessage && (
            <div className="my-2.5 px-3 py-2 rounded-lg bg-[#E11D48]/20 border border-[#E11D48]/40 text-xs text-slate-100 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#E11D48]" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-black/50 rounded-xl my-3 text-[11px]">
            <button
              onClick={() => setActiveTab('coach')}
              className={`py-1.5 px-1.5 rounded-lg font-medium transition-colors text-center truncate ${
                activeTab === 'coach' ? 'bg-[#E11D48] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Coach Photo
            </button>
            <button
              onClick={() => setActiveTab('wallpaper')}
              className={`py-1.5 px-1.5 rounded-lg font-medium transition-colors text-center truncate ${
                activeTab === 'wallpaper' ? 'bg-[#E11D48] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Wallpaper
            </button>
            <button
              onClick={() => setActiveTab('facilities')}
              className={`py-1.5 px-1.5 rounded-lg font-medium transition-colors text-center truncate ${
                activeTab === 'facilities' ? 'bg-[#E11D48] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Facilities
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`py-1.5 px-1.5 rounded-lg font-medium transition-colors text-center truncate ${
                activeTab === 'gallery' ? 'bg-[#E11D48] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Gallery (8)
            </button>
          </div>

          {/* Tab Content Panels */}
          <div className="overflow-y-auto pr-1 flex-1 space-y-4 text-xs py-1">
            {/* Tab: Coach Kushal Sharma Photo */}
            {activeTab === 'coach' && (() => {
              const displayCoachPhoto = coachPhoto && coachPhoto.trim() !== '' ? coachPhoto : generateCoachPortraitArt();
              return (
                <div className="space-y-3">
                  <div className="text-slate-300">
                    <p className="font-semibold text-white">Coach Kushal Sharma Portrait</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      This photo appears framed directly inside the Coach Box on the website.
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/15 bg-black/40 gap-3">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/30 shadow-2xl ring-4 ring-[#E11D48]/30 relative bg-black">
                      {displayCoachPhoto ? (
                        <img
                          src={displayCoachPhoto}
                          alt="Coach Kushal Sharma"
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                    <label className="cursor-pointer px-4 py-2 rounded-lg bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg transition-transform active:scale-95">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Coach Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoachPhotoUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[10px] text-slate-400 text-center">
                      Accepts PNG, JPG, or WebP portrait. Saved directly to permanent disk storage.
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Tab: Full-Page Wallpaper */}
            {activeTab === 'wallpaper' && (
              <div className="space-y-3">
                <div className="text-slate-300">
                  <p className="font-semibold text-white">Full-Page Atmosphere Wallpaper</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Lives permanently in <code className="text-[#E11D48]">AmbientBackdrop.tsx</code> (90% visible, static across whole website).
                  </p>
                </div>
                <div className="w-full h-36 rounded-xl overflow-hidden border border-white/20 relative bg-black">
                  {websiteBackground ? (
                    <img
                      src={websiteBackground}
                      alt="Current Wallpaper"
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <label className="cursor-pointer px-3.5 py-2 rounded-lg bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg transition-transform active:scale-95">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload New Wallpaper</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleWallpaperUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Facilities (11 Items) */}
            {activeTab === 'facilities' && (
              <div className="space-y-3">
                <p className="text-slate-300">
                  Replace photos individually for all 11 gym facilities:
                </p>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {facilities.map((fac) => (
                    <div
                      key={fac.id}
                      className="p-2.5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        {fac.photoUrl ? (
                          <img
                            src={fac.photoUrl}
                            alt={fac.name}
                            className="w-10 h-10 rounded-md object-cover shrink-0 border border-white/15"
                          />
                        ) : null}
                        <span className="font-medium text-slate-200 truncate">{fac.name}</span>
                      </div>
                      <label className="cursor-pointer px-2.5 py-1 rounded bg-white/10 hover:bg-[#E11D48] text-white text-[11px] font-semibold shrink-0 transition-colors">
                        Replace
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleSingleFacilityUpload(fac.key, file);
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Gallery (8 Slots) */}
            {activeTab === 'gallery' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-slate-300">8 Atmosphere &amp; Equipment Photos:</p>
                  <label className="cursor-pointer px-2.5 py-1 rounded bg-[#E11D48] hover:bg-[#BE123C] text-white text-[11px] font-semibold flex items-center gap-1 shadow">
                    <Upload className="w-3 h-3" />
                    <span>Multi-File Upload</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleBatchGalleryUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {gallery.map((item, idx) => (
                    <div
                      key={item.id}
                      className="relative h-16 rounded-lg overflow-hidden border border-white/20 bg-black group"
                    >
                      {item.photoUrl ? (
                        <img
                          src={item.photoUrl}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                      <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 px-1 rounded text-white">
                        #{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer & Final Permanent Lock Action */}
          <div className="pt-3 mt-3 border-t border-white/10 flex flex-col gap-2">
            {!showConfirmLock ? (
              <button
                onClick={() => setShowConfirmLock(true)}
                disabled={isUploading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E11D48] to-[#9F1239] hover:from-[#BE123C] hover:to-[#881337] text-white text-xs font-bold tracking-wide flex items-center justify-center gap-2 shadow-xl luxury-glow-red transition-all"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Save &amp; Lock Permanently into Website</span>
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-black/80 border border-[#E11D48] space-y-2.5 animate-in fade-in duration-200">
                <div className="flex items-start gap-2 text-[#FCD34D] text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>
                    Are you sure? Once locked, all assets are permanently baked into <code className="text-white">permanentWebsiteAssets.json</code> and this Studio tool will disappear forever.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleConfirmLock}
                    disabled={isLocking}
                    className="flex-1 py-1.5 rounded-lg bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold transition-all"
                  >
                    {isLocking ? 'Locking...' : 'Yes, Permanently Lock'}
                  </button>
                  <button
                    onClick={() => setShowConfirmLock(false)}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <p className="text-[10px] text-center text-slate-400">
              Files are written directly to <code className="text-slate-300">/public/uploads/</code> on disk.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
