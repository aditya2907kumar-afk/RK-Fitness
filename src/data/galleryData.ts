import gallery1 from '../assets/images/gallery_1.jpg';
import gallery2 from '../assets/images/gallery_2.jpg';
import gallery3 from '../assets/images/gallery_3.jpg';
import gallery4 from '../assets/images/gallery_4.jpg';
import gallery5 from '../assets/images/gallery_5.jpg';
import gallery6 from '../assets/images/gallery_6.jpg';
import gallery7 from '../assets/images/gallery_7.jpg';
import gallery8 from '../assets/images/gallery_8.jpg';

export interface GalleryItem {
  id: string;
  photoUrl: string;
  altText: string;
}

export const defaultGalleryImages: GalleryItem[] = [
  {
    id: 'gal-1',
    photoUrl: gallery1,
    altText: 'RK FITNESS Heavy Strength and Conditioning Center',
  },
  {
    id: 'gal-2',
    photoUrl: gallery2,
    altText: 'Olympic Barbell and Power Rack Training Platform at RK FITNESS',
  },
  {
    id: 'gal-3',
    photoUrl: gallery3,
    altText: 'Heavy Dumbbells and Free Weight Station at RK FITNESS',
  },
  {
    id: 'gal-4',
    photoUrl: gallery4,
    altText: 'Functional Turf and Heavy Sled Conditioning Track at RK FITNESS',
  },
  {
    id: 'gal-5',
    photoUrl: gallery5,
    altText: 'Cable Cross and Precision Hypertrophy Machines at RK FITNESS',
  },
  {
    id: 'gal-6',
    photoUrl: gallery6,
    altText: 'Competition Powerlifting and Deadlift Zone at RK FITNESS',
  },
  {
    id: 'gal-7',
    photoUrl: gallery7,
    altText: 'High-Performance Cardio and Rowing Stations at RK FITNESS',
  },
  {
    id: 'gal-8',
    photoUrl: gallery8,
    altText: 'Private Coaching and Posture Assessment Bay at RK FITNESS',
  },
];

export function getHydratedGallery(): GalleryItem[] {
  return defaultGalleryImages;
}
