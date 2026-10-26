import { generateAthleticArt } from './athleticVisuals.ts';
import permanentAssets from './permanentWebsiteAssets.json';

export interface ServiceItem {
  id: string;
  key: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  fullDesc: string;
  focusAreas: string[];
  sessionHighlights: string[];
  idealFor: string;
  defaultPhoto: string;
}

export const rawServicesData: Omit<ServiceItem, 'defaultPhoto'>[] = [
  {
    id: 'svc-1',
    key: 'hypertrophy',
    title: 'Advanced Hypertrophy & Muscle Building',
    subtitle: 'Periodized Mass & Mechanical Tension Protocols',
    shortDesc: 'Scientific volume-load progression targeting myofibrillar and sarcoplasmic muscle hypertrophy with strict mind-muscle focus.',
    fullDesc: 'Engineered for dedicated lifters pursuing lean, dense muscular development. We integrate progressive overload, mechanical tension, and metabolic stress under specialized periodized blocks, monitored weekly by Head Specialist Kushal Sharma.',
    focusAreas: ['Progressive Overload Tracking', 'Peak Contraction & Time Under Tension', 'Targeted Muscle Isolation & Angles'],
    sessionHighlights: ['Compound movement loading', 'Micro-periodized mesocycles', 'Form biomechanics check'],
    idealFor: 'Intermediate to advanced lifters aiming for maximum muscle volume and aesthetic symmetry.',
  },
  {
    id: 'svc-2',
    key: 'coaching_1on1',
    title: 'Personal 1-on-1 Strength Coaching',
    subtitle: 'Dedicated Mentorship by Head Specialist Kushal Sharma',
    shortDesc: 'Uncompromising private strength sessions with individualized biometric adaptation and real-time form correction.',
    fullDesc: 'Direct, hands-on mentorship with Kushal Sharma. Every repetition is evaluated for barbell trajectory, joint stacking, and neuromuscular activation. Ideal for accelerating PRs and eliminating lifting plateaus.',
    focusAreas: ['Barbell Trajectory Analysis', 'Bracing & Intra-Abdominal Pressure', 'Individualized Cueing & Feedback'],
    sessionHighlights: ['Zero distraction private coaching', 'Immediate video playback analysis', 'Custom warm-up & priming drills'],
    idealFor: 'Lifters demanding elite attention, plateau breakers, and athletes preparing for heavy PR attempts.',
  },
  {
    id: 'svc-3',
    key: 'functional_strength',
    title: 'Functional Strength & Conditioning',
    subtitle: 'Kinetic Chain Power, Sled Work & Multi-Planar Capacity',
    shortDesc: 'Real-world power generation combining heavy carries, rotational power, and high-output conditioning intervals.',
    fullDesc: 'Build a body that performs as fiercely as it looks. We integrate prowler sled drives, farmer carries, plyometric bounding, and sandbag loads to condition the cardiovascular system alongside muscular durability.',
    focusAreas: ['Posterior Chain Drive', 'Unilateral Power Transfer', 'Aerobic & Anaerobic Threshold Training'],
    sessionHighlights: ['Turf sled sprints & heavy pulls', 'Rotational medicine ball slams', 'Cardiovascular grit testing'],
    idealFor: 'Field athletes, hybrid fitness enthusiasts, and anyone wanting robust real-world strength.',
  },
  {
    id: 'svc-4',
    key: 'fat_loss',
    title: 'Fat Loss & Shredding Bootcamps',
    subtitle: 'Metabolic Afterburn & Muscle-Sparing Lean Conditioning',
    shortDesc: 'High-density resistance sessions maximizing caloric expenditure while preserving hard-earned lean muscle mass.',
    fullDesc: 'A rigorous blueprint designed to torch subcutaneous body fat while safeguarding your muscle tissue. High-density resistance blocks coupled with targeted energy system conditioning ignite long-lasting EPOC (excess post-exercise oxygen consumption).',
    focusAreas: ['EPOC Metabolic Afterburn', 'Lean Muscle Preservation', 'Body Composition Optimization'],
    sessionHighlights: ['Density cluster sets', 'Heart-rate targeted intervals', 'Weekly skinfold & tape assessments'],
    idealFor: 'Individuals aiming for a sculpted, athletic silhouette and substantial fat loss without starvation.',
  },
  {
    id: 'svc-5',
    key: 'agility_mobility',
    title: 'Core Agility & Athletic Mobility Drills',
    subtitle: 'Thoracic Expansion, Hip Openers & Deceleration Control',
    shortDesc: 'Dynamic mobility protocols restoring fluid joint articulation, deep hip flexion, and injury-resistant core stability.',
    fullDesc: 'Move with cat-like agility and unconstrained range of motion. Our mobility protocols liberate tight hip flexors, alleviate lumbar compression, and build resilient connective tissues capable of absorbing extreme torque.',
    focusAreas: ['Joint Capsule Decompression', 'Rotational Hip Internal/External Rotation', 'Deep Core Anti-Extension'],
    sessionHighlights: ['Active PNF stretching', 'Thoracic spine de-rotation', 'Multi-directional deceleration drills'],
    idealFor: 'Desk professionals, stiff powerlifters, and athletes recovering from restricted mobility.',
  },
  {
    id: 'svc-6',
    key: 'powerlifting',
    title: 'Powerlifting & Heavy Compound Lifts Masterclass',
    subtitle: 'Squat, Bench Press, and Deadlift Mastery',
    shortDesc: 'Deep technical masterclass in IPF/WPC style compound movements, bar speed metrics, and PR peaking.',
    fullDesc: 'The cornerstone discipline of RK FITNESS. Learn true competitive setup: arch biomechanics, foot rooting, wedge techniques on deadlifts, and tight shelf creation on back squats. We peak your 1-rep maximum with safety and technical purity.',
    focusAreas: ['Rooting & Kinetic Floor Wedge', 'Lats Engagement & Barbell Path', 'RPE Peaking & Periodization'],
    sessionHighlights: ['Calibrated steel plate loading', 'Low-bar & high-bar setup customization', 'Sumo and conventional deadlift refinement'],
    idealFor: 'Lifters looking to join the 1000lb club or compete on the sanctioned powerlifting platform.',
  },
  {
    id: 'svc-7',
    key: 'athletic_endurance',
    title: 'Advanced Athletic Endurance & Stamina Conditioning',
    subtitle: 'Lactate Threshold & Sustained High-Work Capacity',
    shortDesc: 'Systematic cardio-respiratory development engineered for athletes demanding prolonged explosive endurance.',
    fullDesc: 'Transform your stamina threshold through structured interval protocols, air bike sprints, ski-erg pacing, and lactic buffering workouts that elevate your VO2 peak and muscular endurance under fatigue.',
    focusAreas: ['Lactate Clearance Rate', 'VO2 Peak Aerobic Expansion', 'Work Capacity Buffering'],
    sessionHighlights: ['Concept2 rower & echo bike intervals', 'Dynamic tempo pacing', 'Cardiac output zone-2 base building'],
    idealFor: 'Runners, combat sports athletes, and cross-training athletes wanting limitless stamina.',
  },
  {
    id: 'svc-8',
    key: 'recovery_flexibility',
    title: 'Post-Workout Recovery & Flexibility Protocols',
    subtitle: 'Myofascial Release, Banded Flossing & Parasympathetic Reset',
    shortDesc: 'Structured post-lift de-loading sessions designed to flush lactic buildup, soothe the central nervous system, and speed recovery.',
    fullDesc: 'Muscle grows and repairs during recovery. We combine targeted foam rolling, percussion therapy, banded joint distraction, and breathwork to transition your body from sympathetic fight-or-flight to restful cellular repair.',
    focusAreas: ['Parasympathetic CNS Downgrade', 'Lymphatic Drainage Promotion', 'Myofascial Trigger Point Relief'],
    sessionHighlights: ['Assisted banded traction', 'Diaphragmatic box breathing', 'Targeted myofascial compression'],
    idealFor: 'Hard-training athletes experiencing heavy DOMS, stiffness, or overtraining fatigue.',
  },
  {
    id: 'svc-9',
    key: 'nutrition_programming',
    title: 'Custom Diet, Nutrition & Macro Programming',
    subtitle: 'Precision Caloric Engineering & Bio-Individual Nutrition',
    shortDesc: 'Tailored nutritional blueprints mapped to your metabolic rate, lifestyle, and muscle-building or fat-loss goals.',
    fullDesc: 'Forget cookie-cutter meal plans. Kushal Sharma delivers practical, culturally compatible nutrition strategies balancing protein synthesis, optimal carbohydrate timing around workout windows, and essential micronutrient density.',
    focusAreas: ['Targeted Macronutrient Ratio Design', 'Peri-Workout Nutrient Timing', 'Sustainable Metabolic Adaptation'],
    sessionHighlights: ['Bi-weekly macro adjustments', 'Grocery shopping list & Indian meal options', 'Hydration & electrolyte management'],
    idealFor: 'Anyone wanting crystal-clear clarity on what to eat, when to eat, and how to fuel their training.',
  },
  {
    id: 'svc-10',
    key: 'mass_gain',
    title: 'Weight Gain & Mass Gaining Protocols',
    subtitle: 'Ectomorph Caloric Surplus & Heavy Hypertrophy Structure',
    shortDesc: 'Structured caloric surplus framework tailored for hard-gainers seeking quality, dense muscular weight.',
    fullDesc: 'A dedicated roadmap for hardgainers struggling to pack on size. We pair clean caloric density strategies with high-stimulus, low-wasted-energy compound workouts to maximize muscular weight without excessive fat spillover.',
    focusAreas: ['Caloric Density Optimization', 'Digestive Efficiency Planning', 'High-Stimulus Low-Fatigue Training'],
    sessionHighlights: ['Lean mass progression logs', 'Heavy compound loading emphasis', 'Appetite management strategies'],
    idealFor: 'Skinny or underweight individuals seeking structured, healthy mass gain and muscular thickness.',
  },
  {
    id: 'svc-11',
    key: 'youth_athletic',
    title: 'Youth Athletic Development & Fitness',
    subtitle: 'Fundamental Motor Skills, Posture & Safe Foundation Building',
    shortDesc: 'Age-appropriate strength, balance, and athletic agility programs instilling lifelong discipline and athletic posture.',
    fullDesc: 'We introduce young athletes (ages 13–19) to barbell foundations with strict adherence to light load mastery, spinal alignment, proprioceptive balance, and core strength, setting the foundation for long-term athletic prowess.',
    focusAreas: ['Movement Competency & Body Weight Mastery', 'Spinal Posture & Growth Plate Safety', 'Mental Toughness & Sport Confidence'],
    sessionHighlights: ['Plyometrics & ladder drills', 'Bodyweight chin-ups and push-up mechanics', 'Guided light-barbell introductions'],
    idealFor: 'Teens, young sportspersons, and parents wanting safe, science-backed athletic foundation for their children.',
  },
  {
    id: 'svc-12',
    key: 'senior_mobility',
    title: 'Senior Functional Mobility & Strength',
    subtitle: 'Longevity, Bone Density & Fall Prevention Conditioning',
    shortDesc: 'Low-impact, joint-friendly resistance coaching enhancing bone density, balance, and effortless daily independence.',
    fullDesc: 'Aging gracefully with vigor and resilience. Our senior strength protocols strengthen posterior chain stabilizers, boost bone mineral density, and revitalize functional movement so everyday tasks remain effortless and pain-free.',
    focusAreas: ['Bone Mineral Density Preservation', 'Dynamic Fall Prevention Balance', 'Gentle Knee and Shoulder Care'],
    sessionHighlights: ['Supported goblet squats & seated presses', 'Balance pad stability drills', 'Gentle rotational core stability'],
    idealFor: 'Mature adults (50+) aiming to maintain strong joints, vibrant energy, and active independent mobility.',
  },
  {
    id: 'svc-13',
    key: 'hiit_metabolic',
    title: 'HIIT Circuit & Metabolic Conditioning',
    subtitle: 'High-Velocity Intervals & Full-Body Stamina Blitz',
    shortDesc: 'Fast-paced, high-intensity functional circuit workouts that challenge your lungs and incinerate calories.',
    fullDesc: 'High-voltage metabolic circuits incorporating kettlebells, battle ropes, medicine balls, and plyo boxes. Perfect for those who crave a heart-thumping, sweat-drenched session that leaves no muscle unworked.',
    focusAreas: ['Full-Body Lactate Threshold', 'Agile Spatial Transitions', 'Cardio-Endurance Peak Work'],
    sessionHighlights: ['Battle rope waves & slams', 'Plyometric box transitions', 'Timed AMRAP & EMOM protocols'],
    idealFor: 'Busy professionals seeking maximum workout density and intense endorphin releases in 45 minutes.',
  },
  {
    id: 'svc-14',
    key: 'kettlebell_core',
    title: 'Kettlebell & Functional Core Mastery',
    subtitle: 'Ballistic Hip Snaps, Turkish Get-Ups & 360° Core Stability',
    shortDesc: 'Hardstyle kettlebell swings, cleans, and complex flow movements that forge unyielding grip and trunk armor.',
    fullDesc: 'The kettlebell is the ultimate weapon for athletic durability. Master the hardstyle hip snap, the intricate Turkish get-up, clean-and-press complexes, and windmill stretches to forge a resilient, armor-plated midsection.',
    focusAreas: ['Ballistic Hip Extension', 'Rotator Cuff & Shoulder Packed Stability', 'Rotational Anti-Flexion Core Strength'],
    sessionHighlights: ['Turkish get-up step-by-step', 'Double kettlebell clean and front squat', 'Heavy kettlebell farmer carries'],
    idealFor: 'Fitness enthusiasts seeking functional grip strength, bulletproof shoulders, and a sculpted core.',
  },
  {
    id: 'svc-15',
    key: 'contest_prep',
    title: 'Contest Prep & Physique Transformation Coaching',
    subtitle: 'Stage-Ready Conditioning, Peak Week & Bodybuilding Posing',
    shortDesc: 'Elite-level physique sculpting with meticulous peak-week protocols, body fat stripping, and mandatory posing routines.',
    fullDesc: 'For athletes aspiring to step on stage or achieve a photo-shoot ready aesthetic. Kushal Sharma guides you through reverse dieting, water & sodium manipulation, depletion workouts, carb loading, and stage presence.',
    focusAreas: ['Peak Week Water & Glycogen Peaking', 'Vascularity & Muscle Fullness Tuning', 'Stage Posing & Lat Flare Choreography'],
    sessionHighlights: ['Weekly check-in photos & caliper stats', 'Stage lighting posing rehearsals', 'Precision refeed calculations'],
    idealFor: 'Competitive bodybuilders, Men\'s Physique athletes, and lifters aiming for absolute peak conditioning.',
  },
];

// Helper to get hydrated services incorporating permanent manifest overrides
export function getHydratedServices(): ServiceItem[] {
  const customServices = (permanentAssets as { services?: Record<string, string> }).services || {};

  return rawServicesData.map((svc) => {
    const customPhoto = customServices[svc.key];
    const defaultPhoto = customPhoto || generateAthleticArt(svc.title, svc.subtitle);
    return {
      ...svc,
      defaultPhoto,
    };
  });
}
