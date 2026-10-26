# Permanent Static Code Bundling for RK FITNESS Custom Assets

Permanently integrate all 21 user-uploaded custom images directly into the application source code tree using standard Vite static asset imports, ensuring all images are bundled directly into the compiled output and never disappear on published deployments, Cloud Run, or GitHub.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural strategy was confirmed with you in Phase 1:
> - **Asset Storage**: All 21 custom uploaded photos will be stored directly inside `src/assets/images/` with semantic filenames.
> - **Direct TypeScript Imports**: Components and data files will `import` the image files directly via ESM imports so Vite automatically processes, hashes, and bundles them into the final deployment artifacts.
> - **Elimination of Server API Dependency**: Remove the runtime `fetch('/api/locked-assets')` network requirement. The client will render the statically imported images instantly on first paint without waiting for network or filesystem APIs.

- **Confirmed Decision 1**: Store and track all 21 custom images inside `src/assets/images/`.
- **Confirmed Decision 2**: Direct static imports in TypeScript, bypassing runtime server fetch.

---

## 1. Overview & Core Concept

- **What It Does**: Transitions RK FITNESS from a dynamic runtime-served `/uploads/` pattern (which fails when the site is published as a static build or deployed to isolated containers) to a permanent compile-time bundled asset architecture.
- **Target Audience / Persona**: Gym athletes, members, and visitors exploring RK FITNESS facilities, atmosphere gallery, and coach consultation.
- **Key Value**: 100% reliable image loading that survives server restarts, container rebuilds, production publishing, and GitHub pushes.

---

## 2. User Experience & Visual Design

- **Visual Consistency**: All 21 authentic gym photographs retain their original high-resolution visual quality:
  - Atmospheric dark glassmorphism wallpaper (`IMG_3320`) with +10% enhanced brightness and crisp definition.
  - Coach Kushal Sharma framed circular portrait (`C2C56DFA`).
  - 8 Atmosphere tape gallery visuals (`IMG_3321`, `IMG_3302`, `IMG_3301`, `IMG_3299`, `IMG_3294`, `IMG_3293`, `IMG_3291`, `IMG_3292`).
  - 11 Signature facility showcase cards (`IMG_3295`, `IMG_3296`, `IMG_3300`, `IMG_3323`, `IMG_3298`, `IMG_3288`, `IMG_3290`, `IMG_3322`, `IMG_3289`, `IMG_3299`, `IMG_3324`).
- **Zero-Latency First Paint**: Because images are bundled by Vite, the browser does not wait for a client-side `/api/locked-assets` roundtrip before rendering image URLs. Images render immediately on DOM mount.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Direct Vite ESM Asset Imports vs Dynamic URL Strings**
  - *Chosen Approach*: Copy all 21 image files into `src/assets/images/` and use direct `import imgUrl from '../assets/images/...'`.
  - *Why*: Vite resolves imported assets at build time, computes optimal hashed filenames in `dist/assets/`, and guarantees the files exist in production bundles. When pushing to GitHub, `src/assets/images/` is committed to git.
  - *Alternatives Considered*: Storing only in `/public/uploads/` was vulnerable to ephemeral container lifecycles where runtime-uploaded files are lost on republish.

- **Decision 2: Remove `/api/locked-assets` Fetch on Client Mount**
  - *Chosen Approach*: Populate `src/data/galleryData.ts` and `src/data/facilitiesData.ts` with direct image references so default states require no network fetch.
  - *Why*: In published/static environments, `/api/` endpoints might not exist or may delay the initial render. Static imports are bulletproof.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                   src/assets/images/                   │
│   ├── wallpaper_gym.jpg                                │
│   ├── coach_kushal.png                                 │
│   ├── gallery_1.jpg ... gallery_8.jpg                  │
│   └── facility_male_changing.jpg ... facility_11.jpg   │
└──────────────────────────┬─────────────────────────────┘
                           │ Direct ESM Imports
         ┌─────────────────┴─────────────────┐
         ▼                                   ▼
┌──────────────────┐               ┌──────────────────┐
│ src/data/        │               │ src/components/  │
│ facilitiesData.ts│               │ SpecialistsShow- │
│ & galleryData.ts │               │ case & Backdrop  │
└────────┬─────────┘               └────────┬─────────┘
         │                                  │
         └─────────────────┬────────────────┘
                           ▼
              ┌─────────────────────────┐
              │       src/App.tsx       │
              │  Zero-network hydration │
              │  Instant initial paint  │
              └─────────────────────────┘
```

### Execution Steps:
1. **Asset Migration**: Copy the 21 verified image files from `public/uploads/` into `src/assets/images/` with clean semantic names.
2. **Update `src/data/galleryData.ts`**: Import all 8 gallery image files directly and export them in `rawGalleryData`.
3. **Update `src/data/facilitiesData.ts`**: Import all 11 facility image files directly and export them in `rawFacilitiesData`.
4. **Update `src/components/SpecialistsShowcase.tsx`**: Import the coach portrait file directly as the default coach image.
5. **Update `src/App.tsx` & `src/components/AmbientBackdrop.tsx`**: Import the wallpaper file directly, removing runtime `fetch('/api/locked-assets')` logic so everything runs off static assets.
6. **Keep `public/uploads/` as Backup**: Ensure existing paths continue to resolve in both dev and production.
7. **Verification**: Run `compile_applet` and test production build to verify zero broken imports and verify all assets are present in the build bundle.
