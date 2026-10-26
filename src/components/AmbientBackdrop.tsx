import React from 'react';
import gymWallpaper from '../assets/images/wallpaper_gym.jpg';

interface AmbientBackdropProps {
  wallpaperUrl?: string;
}

export const AmbientBackdrop: React.FC<AmbientBackdropProps> = ({ wallpaperUrl }) => {
  const currentWallpaper = wallpaperUrl || gymWallpaper;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Base Deep Obsidian Canvas */}
      <div className="absolute inset-0 bg-[#050B14]" />

      {/* Static Background Wallpaper — 100% Completely Visible without dark effect, +10% enhanced brightness */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-out gpu-layer"
        style={{
          backgroundImage: `url("${currentWallpaper}")`,
          opacity: 1, // 100% full visibility — dark effect completely removed
          filter: 'brightness(1.10) contrast(1.04)', // +10% enhanced brightness with crisp definition
        }}
      />

      {/* Subtle brand crimson atmospheric touch without obscuring the wallpaper */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(225,29,72,0.08),transparent_70%)] pointer-events-none" />
    </div>
  );
};
