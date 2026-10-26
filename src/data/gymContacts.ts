export interface GymContact {
  role: string;
  name: string;
  phoneFormatted: string;
  tel: string;
  whatsappUrl: string;
}

export const GYM_CONTACTS = {
  owner: {
    role: 'Gym Owner',
    name: 'Gym Owner',
    phoneFormatted: '+91 91 4266 915 7',
    tel: '+919142669157',
    whatsappUrl: 'https://wa.me/919142669157',
  },
  manager: {
    role: 'Gym Manager',
    name: 'Gym Manager',
    phoneFormatted: '+91 96085 81967',
    tel: '+919608581967',
    whatsappUrl: 'https://wa.me/919608581967',
  },
} as const;

export const COACH_CONTACT = {
  name: 'Kushal Sharma',
  role: 'Head Specialist',
  phoneFormatted: '06261-815647',
  tel: '06261815647',
  whatsappUrl: 'https://wa.me/916261815647',
  instagramUrl: 'https://www.instagram.com/kus291027?mdxt=bGwzOHhoYm9oYmx5',
  instagramHandle: '@kus291027',
  experience: '6 Years',
  clientsTrained: '200+',
} as const;
