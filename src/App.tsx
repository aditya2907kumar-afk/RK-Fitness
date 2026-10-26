/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { AmbientBackdrop } from './components/AmbientBackdrop.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { BusinessGallery } from './components/BusinessGallery.tsx';
import { FacilitiesShowcase } from './components/FacilitiesShowcase.tsx';
import { GoogleReviewsMarquee } from './components/GoogleReviewsMarquee.tsx';
import { SpecialistsShowcase } from './components/SpecialistsShowcase.tsx';
import { LocationAndFooter } from './components/LocationAndFooter.tsx';
import { GeneralBookingModal } from './components/GeneralBookingModal.tsx';
import { WebsitePhotoStudioDrawer } from './components/WebsitePhotoStudioDrawer.tsx';

import initialManifest from './data/permanentWebsiteAssets.json';
import { getHydratedGallery, GalleryItem } from './data/galleryData.ts';
import { getHydratedFacilities, FacilityItem, rawFacilitiesData } from './data/facilitiesData.ts';
import { generateCoachPortraitArt } from './data/coachVisual.ts';

export const PERMANENT_WALLPAPER = '/uploads/IMG_3320_1793002801367.jpg';
export const PERMANENT_COACH = '/uploads/C2C56DFA-CDFD-4964-9A3C-66269D9E1FC1_1793002793641.png';

export default function App() {
  const [isLocked, setIsLocked] = useState<boolean>(
    initialManifest.isLocked !== undefined ? initialManifest.isLocked : true
  );
  const [websiteBg, setWebsiteBg] = useState<string>(
    initialManifest.websiteBackground || PERMANENT_WALLPAPER
  );
  const [coachPhoto, setCoachPhoto] = useState<string>(
    initialManifest.coachPhoto && initialManifest.coachPhoto.trim() !== ''
      ? initialManifest.coachPhoto
      : PERMANENT_COACH
  );
  const [gallery, setGallery] = useState<GalleryItem[]>(getHydratedGallery());
  const [facilities, setFacilities] = useState<FacilityItem[]>(getHydratedFacilities());

  // Consultation modal state
  const [isGeneralModalOpen, setIsGeneralModalOpen] = useState<boolean>(false);

  // Sync with server on initial mount
  useEffect(() => {
    async function syncLockedAssets() {
      try {
        const res = await fetch('/api/locked-assets');
        if (res.ok) {
          const manifest = await res.json();
          if (manifest.isLocked !== undefined) setIsLocked(manifest.isLocked);
          if (manifest.websiteBackground) setWebsiteBg(manifest.websiteBackground);
          if (manifest.coachPhoto && manifest.coachPhoto.trim() !== '') {
            setCoachPhoto(manifest.coachPhoto);
          }

          if (manifest.gallery && manifest.gallery.length > 0) {
            setGallery(manifest.gallery.map((url: string, index: number) => ({
              id: `custom-gal-${index + 1}`,
              photoUrl: url,
              altText: `RK FITNESS Gym Facility and Athlete Transformation photo ${index + 1}`,
            })));
          }

          if (manifest.facilities) {
            setFacilities((prev) =>
              prev.map((f) => ({
                ...f,
                photoUrl: manifest.facilities[f.key] || f.photoUrl,
              }))
            );
          }
        }
      } catch (err) {
        console.warn('Initial server sync note:', err);
      }
    }
    syncLockedAssets();
  }, []);

  // Persist current state to server manifest
  const persistManifestToServer = useCallback(
    async (overrides: Record<string, unknown> = {}) => {
      try {
        const facilityMap: Record<string, string> = {};
        facilities.forEach((f) => {
          facilityMap[f.key] = f.photoUrl;
        });

        const currentManifest = {
          isLocked,
          websiteBackground: websiteBg,
          specialistsBackground: initialManifest.specialistsBackground || '',
          coachPhoto,
          services: initialManifest.services || {},
          gallery: gallery.map((g) => g.photoUrl),
          facilities: facilityMap,
          lockedAt: null,
          ...overrides,
        };

        await fetch('/api/save-locked-assets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ manifest: currentManifest }),
        });
      } catch (err) {
        console.error('Error auto-persisting manifest:', err);
      }
    },
    [isLocked, websiteBg, coachPhoto, gallery, facilities]
  );

  const handleUpdateWebsiteBackground = (url: string) => {
    setWebsiteBg(url);
    persistManifestToServer({ websiteBackground: url });
  };

  const handleUpdateCoachPhoto = (url: string) => {
    setCoachPhoto(url);
    persistManifestToServer({ coachPhoto: url });
  };

  const handleUpdateGallery = (urls: string[]) => {
    const newItems: GalleryItem[] = urls.map((url, i) => ({
      id: `custom-upload-${i + 1}`,
      photoUrl: url,
      altText: `RK FITNESS Facility photo ${i + 1}`,
    }));
    setGallery(newItems);
    persistManifestToServer({ gallery: urls });
  };

  const handleUpdateFacilityPhoto = (facilityKey: string, url: string) => {
    setFacilities((prev) =>
      prev.map((f) => (f.key === facilityKey ? { ...f, photoUrl: url } : f))
    );
    const facilityMap: Record<string, string> = {};
    facilities.forEach((f) => {
      facilityMap[f.key] = f.key === facilityKey ? url : f.photoUrl;
    });
    persistManifestToServer({ facilities: facilityMap });
  };

  const handleBatchGalleryUploadFromHeader = async (files: FileList) => {
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const res = await fetch('/api/upload-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: file.name, dataUrl }),
        });

        if (res.ok) {
          const data = await res.json();
          uploadedUrls.push(data.url);
        }
      }

      if (uploadedUrls.length > 0) {
        handleUpdateGallery(uploadedUrls);
      }
    } catch (err) {
      console.error('Batch gallery upload failed:', err);
    }
  };

  const handleLockWebsite = async () => {
    try {
      const facilityMap: Record<string, string> = {};
      facilities.forEach((f) => {
        facilityMap[f.key] = f.photoUrl;
      });

      const manifestPayload = {
        isLocked: true,
        websiteBackground: websiteBg,
        specialistsBackground: initialManifest.specialistsBackground || '',
        coachPhoto,
        services: initialManifest.services || {},
        gallery: gallery.map((g) => g.photoUrl),
        facilities: facilityMap,
        lockedAt: new Date().toISOString(),
      };

      const res = await fetch('/api/lock-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ manifest: manifestPayload }),
      });

      if (res.ok) {
        setIsLocked(true);
      }
    } catch (err) {
      console.error('Locking failed:', err);
      throw err;
    }
  };

  const handleUnlockWebsite = async () => {
    try {
      await fetch('/api/unlock-website', { method: 'POST' });
    } catch (err) {
      console.warn('Unlock API note:', err);
    } finally {
      setIsLocked(false);
    }
  };

  const scrollToSpecialist = () => {
    const el = document.getElementById('specialist');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen text-slate-100 font-sans selection:bg-[#E11D48] selection:text-white text-center">
      {/* 1. Persistent Full-Page Atmospheric Dark Glassmorphism Wallpaper (static backdrop) */}
      <AmbientBackdrop wallpaperUrl={websiteBg} />

      {/* Main Flow */}
      <main className="relative z-10">
        {/* 2. Hero Section (Inspiration Typography & Capsule CTAs) */}
        <HeroSection
          onOpenConsultation={() => setIsGeneralModalOpen(true)}
          onExploreFacilities={() => {
            const el = document.getElementById('facilities');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 4. Craft & Studio Atmosphere Gallery (Continuous floating visual tape without box frames) */}
        <BusinessGallery
          galleryItems={gallery}
          isLocked={isLocked}
          onBatchUpload={handleBatchGalleryUploadFromHeader}
        />

        {/* 5. 11 Facilities Section (With photos for each facility, strictly no inquiry elements) */}
        <FacilitiesShowcase
          facilities={facilities}
          isLocked={isLocked}
          onUpdateFacilityPhoto={handleUpdateFacilityPhoto}
        />

        {/* 6. Verified Google Maps Reviews Marquee (Floating typography directly over wallpaper) */}
        <GoogleReviewsMarquee />

        {/* 7. Resident Specialist Showcase (THE ONLY SECTION WITH A DEDICATED LUXURY CARD BOX FRAME) */}
        <SpecialistsShowcase
          coachPhoto={coachPhoto}
          onUpdateCoachPhoto={handleUpdateCoachPhoto}
          isLocked={isLocked}
          onOpenConsultation={() => setIsGeneralModalOpen(true)}
        />

        {/* 8. Location, Timings & Footer (Open unboxed architectural layout) */}
        <LocationAndFooter />
      </main>

      {/* 9. Dedicated Website Photo Studio Making-Phase Manager */}
      <WebsitePhotoStudioDrawer
        isLocked={isLocked}
        websiteBackground={websiteBg}
        coachPhoto={coachPhoto}
        gallery={gallery}
        facilities={facilities}
        onUpdateWebsiteBackground={handleUpdateWebsiteBackground}
        onUpdateCoachPhoto={handleUpdateCoachPhoto}
        onUpdateGallery={handleUpdateGallery}
        onUpdateFacilityPhoto={handleUpdateFacilityPhoto}
        onLockWebsite={handleLockWebsite}
        onUnlockWebsite={handleUnlockWebsite}
      />

      {/* 10. Direct Consultation / Booking Modal */}
      <GeneralBookingModal
        isOpen={isGeneralModalOpen}
        onClose={() => setIsGeneralModalOpen(false)}
      />
    </div>
  );
}
