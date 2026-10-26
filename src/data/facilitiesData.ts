import { generateFacilityArt } from './facilityVisuals.ts';
import permanentAssets from './permanentWebsiteAssets.json';

export interface FacilityItem {
  id: string;
  key: string;
  name: string;
  tagline: string;
  description: string;
  photoUrl: string;
}

export const rawFacilitiesData: Omit<FacilityItem, 'photoUrl'>[] = [
  {
    id: 'fac-1',
    key: 'male_changing_room',
    name: 'Male Changing Room',
    tagline: 'Private Lockers & Showers',
    description: 'Spacious, sanitized changing sanctuary featuring secure private lockers, clean washrooms, high-pressure showers, and grooming amenities.',
  },
  {
    id: 'fac-2',
    key: 'female_changing_room',
    name: 'Female Changing Room',
    tagline: 'Secure, Private & Pristine',
    description: 'Dedicated private women’s locker lounge with lighted vanity mirrors, hygienic changing stalls, hot showers, and keyed storage.',
  },
  {
    id: 'fac-3',
    key: 'air_conditioned',
    name: 'Fully Air Conditioned',
    tagline: 'Continuous Climate & Fresh Air Circulation',
    description: 'Heavy-duty multi-ton industrial climate control maintaining constant 19°C–21°C ambient temperature even during peak summer hours.',
  },
  {
    id: 'fac-4',
    key: 'fingerprint_entry',
    name: 'Fingerprint Entry System',
    tagline: 'Biometric Access Control',
    description: 'High-speed biometric scanner gate ensuring authorized member access, automated check-in logging, and maximum facility security.',
  },
  {
    id: 'fac-5',
    key: 'boxing_gears',
    name: 'Boxing Gears & Combat Zone',
    tagline: 'Heavy Bags, Leather Gloves & Handwraps',
    description: 'Full striking station equipped with heavy tear-drop punching bags, speed bags, authentic leather sparring gloves, and kickboxing pads.',
  },
  {
    id: 'fac-6',
    key: 'hiit_zone',
    name: 'HIIT Workout Zone',
    tagline: 'High-Velocity Conditioning Turf',
    description: 'Dedicated shock-absorbing turf deck for battle ropes, plyo boxes, slam balls, sled pushes, and metabolic circuit conditioning.',
  },
  {
    id: 'fac-7',
    key: 'world_class_equipment',
    name: 'World Class Equipments',
    tagline: 'Olympic Barbells & IPF Calibrated Iron',
    description: 'Precision Eleiko style bars, heavy dumbbell racks up to 50kg+, competition power cages, and heavy-gauge steel lifting platforms.',
  },
  {
    id: 'fac-8',
    key: 'hygienic_machines',
    name: 'Hygienic Machines',
    tagline: 'Sanitized Selectorized Stations',
    description: 'Regularly serviced, smooth pulley cables, antimicrobial leather upholstery, and dedicated disinfectant wipe points at every station.',
  },
  {
    id: 'fac-9',
    key: 'cardio_zone',
    name: 'Cardio Zone',
    tagline: 'Rowers, Treadmills & Assault Bikes',
    description: 'High-end commercial cardio stations with digital metrics tracking heart rate, caloric burn, and peak aerobic output.',
  },
  {
    id: 'fac-10',
    key: 'sunlight_environment',
    name: 'Open Sunlight Environment',
    tagline: 'Natural Daylight & High Ceilings',
    description: 'Expansive architectural glass windows delivering natural morning sunlight and fresh airflow for an uplifting, non-claustrophobic workout.',
  },
  {
    id: 'fac-11',
    key: 'free_parking',
    name: 'Free Parking Space',
    tagline: 'Dedicated Two-Wheeler & Car Parking',
    description: 'Convenient, secure on-site parking at Bajrangi Chowk right in front of the club with full surveillance.',
  },
];

const iconTypeMap: Record<string, string> = {
  male_changing_room: 'lockers_male',
  female_changing_room: 'lockers_female',
  air_conditioned: 'ac',
  fingerprint_entry: 'biometric',
  boxing_gears: 'boxing',
  hiit_zone: 'gym',
  world_class_equipment: 'gym',
  hygienic_machines: 'gym',
  cardio_zone: 'gym',
  sunlight_environment: 'sunlight',
  free_parking: 'parking',
};

export const permanentFacilityPhotos: Record<string, string> = {
  male_changing_room: '/uploads/IMG_3295_1793002858642.jpg',
  female_changing_room: '/uploads/IMG_3296_1793002866347.jpg',
  air_conditioned: '/uploads/IMG_3300_1793002873512.jpg',
  fingerprint_entry: '/uploads/IMG_3323_1793002879663.webp',
  boxing_gears: '/uploads/IMG_3298_1793002888775.jpg',
  hiit_zone: '/uploads/IMG_3288_1793002896827.jpg',
  world_class_equipment: '/uploads/IMG_3290_1793002904835.jpg',
  hygienic_machines: '/uploads/IMG_3322_1793002913074.jpg',
  cardio_zone: '/uploads/IMG_3289_1793002920859.jpg',
  sunlight_environment: '/uploads/IMG_3299_1793002930201.jpg',
  free_parking: '/uploads/IMG_3324_1793002936078.jpg',
};

export function getHydratedFacilities(): FacilityItem[] {
  const customFacilities = (permanentAssets as { facilities?: Record<string, string> }).facilities || {};

  return rawFacilitiesData.map((fac) => {
    const photo = customFacilities[fac.key] || permanentFacilityPhotos[fac.key] || generateFacilityArt(fac.name, fac.tagline, iconTypeMap[fac.key] || 'gym');
    return {
      ...fac,
      photoUrl: photo,
    };
  });
}
