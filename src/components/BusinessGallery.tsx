import React, { useState } from 'react';
import { X, Maximize2, Upload } from 'lucide-react';
import { GalleryItem } from '../data/galleryData.ts';

interface BusinessGalleryProps {
  galleryItems: GalleryItem[];
  isLocked: boolean;
  onBatchUpload?: (files: FileList) => void;
}

export const BusinessGallery: React.FC<BusinessGalleryProps> = ({
  galleryItems,
  isLocked,
  onBatchUpload,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Duplicate items to ensure smooth continuous marquee (16 cards per track)
  const trackItems = [...galleryItems, ...galleryItems];

  return (
    <section id="atmosphere" className="relative py-16 sm:py-20 overflow-hidden select-none">
      {/* Editorial Section Header: ATMOS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-center flex flex-col justify-center items-center gap-2">
        <div className="font-montserrat text-[10px] sm:text-xs font-medium tracking-[0.32em] text-[#E11D48] uppercase text-halo">
          VISUAL ARCHIVE ◾ DISCIPLINE IN MOTION
        </div>
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-cormorant font-normal tracking-[0.22em] sm:tracking-[0.32em] pl-[0.22em] sm:pl-[0.32em] text-white uppercase luxury-text-shadow leading-none text-center">
          ATMOS
        </h2>
        {!isLocked && onBatchUpload && (
          <label className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E11D48] hover:bg-[#BE123C] text-white text-[11px] font-semibold cursor-pointer shadow-lg transition-transform active:scale-95">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Atmosphere Photos</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  onBatchUpload(e.target.files);
                }
              }}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Twin-Track Continuous Visual Tape */}
      <div className="marquee-container w-full overflow-hidden relative cursor-pointer select-none marquee-mask">
        <div className="animate-marquee-continuous flex gap-6">
          {/* Track 1 */}
          <div className="flex gap-6 shrink-0">
            {trackItems.map((item, idx) => (
              <div
                key={`t1-${item.id}-${idx}`}
                onClick={() => setSelectedImage(item.photoUrl)}
                className="group relative w-[320px] sm:w-[400px] h-[240px] sm:h-[280px] shrink-0 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform hover:scale-[1.03] gpu-layer"
              >
                <img
                  src={item.photoUrl}
                  alt={item.altText}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-[#E11D48] text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Track 2 */}
          <div className="flex gap-6 shrink-0" aria-hidden="true">
            {trackItems.map((item, idx) => (
              <div
                key={`t2-${item.id}-${idx}`}
                onClick={() => setSelectedImage(item.photoUrl)}
                className="group relative w-[320px] sm:w-[400px] h-[240px] sm:h-[280px] shrink-0 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform hover:scale-[1.03] gpu-layer"
              >
                <img
                  src={item.photoUrl}
                  alt={item.altText}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-[#E11D48] text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/92 backdrop-blur-lg transition-opacity duration-300"
            aria-hidden="true"
          />
          <div className="relative max-w-5xl w-full max-h-[90vh] z-10 flex flex-col items-center animate-in zoom-in-95 duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 sm:right-2 w-10 h-10 rounded-full bg-white/10 hover:bg-[#E11D48] text-white flex items-center justify-center transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="rounded-xl overflow-hidden shadow-2xl max-h-[85vh]">
              <img
                src={selectedImage}
                alt="RK FITNESS High-Res Preview"
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
