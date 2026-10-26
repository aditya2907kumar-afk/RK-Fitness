/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AmbientBackdrop } from './components/AmbientBackdrop.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { BusinessGallery } from './components/BusinessGallery.tsx';
import { FacilitiesShowcase } from './components/FacilitiesShowcase.tsx';
import { GoogleReviewsMarquee } from './components/GoogleReviewsMarquee.tsx';
import { SpecialistsShowcase } from './components/SpecialistsShowcase.tsx';
import { LocationAndFooter } from './components/LocationAndFooter.tsx';
import { GeneralBookingModal } from './components/GeneralBookingModal.tsx';

import initialManifest from './data/permanentWebsiteAssets.json';
import { getHydratedGallery, GalleryItem } from './data/galleryData.ts';
import { getHydratedFacilities, FacilityItem } from './data/facilitiesData.ts';

export const PERMANENT_WALLPAPER = '/uploads/IMG_3320_1793002801367.jpg';
export const PERMANENT_COACH = '/uploads/C2C56DFA-CDFD-4964-9A3C-66269D9E1FC1_1793002793641.png';

export default function App() {
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
        <BusinessGallery galleryItems={gallery} />

        {/* 5. 11 Facilities Section (With photos for each facility, strictly no inquiry elements) */}
        <FacilitiesShowcase facilities={facilities} />

        {/* 6. Verified Google Maps Reviews Marquee (Floating typography directly over wallpaper) */}
        <GoogleReviewsMarquee />

        {/* 7. Resident Specialist Showcase (THE ONLY SECTION WITH A DEDICATED LUXURY CARD BOX FRAME) */}
        <SpecialistsShowcase
          coachPhoto={coachPhoto}
          onOpenConsultation={() => setIsGeneralModalOpen(true)}
        />

        {/* 8. Location, Timings & Footer (Open unboxed architectural layout) */}
        <LocationAndFooter />
      </main>

      {/* 9. Direct Consultation / Booking Modal */}
      <GeneralBookingModal
        isOpen={isGeneralModalOpen}
        onClose={() => setIsGeneralModalOpen(false)}
      />
    </div>
  );
}
