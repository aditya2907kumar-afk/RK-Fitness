import { generateAthleticArt } from './athleticVisuals.ts';
import permanentAssets from './permanentWebsiteAssets.json';

export interface GalleryItem {
  id: string;
  photoUrl: string;
  altText: string;
}

export const defaultGalleryImages: GalleryItem[] = [
  {
    id: 'gal-1',
    photoUrl: '/uploads/IMG_3321_1793002828943.jpg',
    altText: 'RK FITNESS Heavy Strength and Conditioning Center',
  },
  {
    id: 'gal-2',
    photoUrl: '/uploads/IMG_3302_1793002830782.jpg',
    altText: 'Olympic Barbell and Power Rack Training Platform at RK FITNESS',
  },
  {
    id: 'gal-3',
    photoUrl: '/uploads/IMG_3301_1793002832176.jpg',
    altText: 'Heavy Dumbbells and Free Weight Station at RK FITNESS',
  },
  {
    id: 'gal-4',
    photoUrl: '/uploads/IMG_3299_1793002833362.jpg',
    altText: 'Functional Turf and Heavy Sled Conditioning Track at RK FITNESS',
  },
  {
    id: 'gal-5',
    photoUrl: '/uploads/IMG_3294_1793002834039.jpg',
    altText: 'Cable Cross and Precision Hypertrophy Machines at RK FITNESS',
  },
  {
    id: 'gal-6',
    photoUrl: '/uploads/IMG_3293_1793002835226.jpg',
    altText: 'Competition Powerlifting and Deadlift Zone at RK FITNESS',
  },
  {
    id: 'gal-7',
    photoUrl: '/uploads/IMG_3291_1793002836393.jpg',
    altText: 'High-Performance Cardio and Rowing Stations at RK FITNESS',
  },
  {
    id: 'gal-8',
    photoUrl: '/uploads/IMG_3292_1793002837902.jpg',
    altText: 'Private Coaching and Posture Assessment Bay at RK FITNESS',
  },
];

export function getHydratedGallery(): GalleryItem[] {
  const customGallery = (permanentAssets as { gallery?: string[] }).gallery || [];
  if (customGallery.length > 0) {
    return customGallery.map((url, index) => ({
      id: `custom-gal-${index + 1}`,
      photoUrl: url,
      altText: `RK FITNESS Gym Facility and Athlete Transformation photo ${index + 1}`,
    }));
  }
  return defaultGalleryImages;
}
