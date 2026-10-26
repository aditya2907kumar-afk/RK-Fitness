/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AmbientBackdrop } from './components/AmbientBackdrop.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { BusinessGallery } from './components/BusinessGallery.tsx';
import { FacilitiesShowcase } from './components/FacilitiesShowcase.tsx';
import { GoogleReviewsMarquee } from './components/GoogleReviewsMarquee.tsx';
import { SpecialistsShowcase } from './components/SpecialistsShowcase.tsx';
import { LocationAndFooter } from './components/LocationAndFooter.tsx';
import { GeneralBookingModal } from './components/GeneralBookingModal.tsx';

import gymWallpaper from './assets/images/wallpaper_gym.jpg';
import coachPortrait from './assets/images/coach_kushal.png';
import { getHydratedGallery } from './data/galleryData.ts';
import { getHydratedFacilities } from './data/facilitiesData.ts';

export const PERMANENT_WALLPAPER = gymWallpaper;
export const PERMANENT_COACH = coachPortrait;

export default function App() {
  const gallery = getHydratedGallery();
  const facilities = getHydratedFacilities();

  // Consultation modal state
  const [isGeneralModalOpen, setIsGeneralModalOpen] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen text-slate-100 font-sans selection:bg-[#E11D48] selection:text-white text-center">
      {/* 1. Persistent Full-Page Atmospheric Dark Glassmorphism Wallpaper (static backdrop) */}
      <AmbientBackdrop wallpaperUrl={gymWallpaper} />

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
          coachPhoto={coachPortrait}
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
