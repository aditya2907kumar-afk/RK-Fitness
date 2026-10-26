import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Ensure uploads and data directories exist
const uploadsDir = path.resolve(__dirname, 'public', 'uploads');
const dataDir = path.resolve(__dirname, 'src', 'data');
const manifestPath = path.resolve(dataDir, 'permanentWebsiteAssets.json');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

interface Manifest {
  isLocked: boolean;
  websiteBackground: string;
  specialistsBackground: string;
  coachPhoto?: string;
  services: Record<string, string>;
  gallery: string[];
  facilities?: Record<string, string>;
  lockedAt: string | null;
}

// Ensure default manifest exists
if (!fs.existsSync(manifestPath)) {
  const defaultManifest: Manifest = {
    isLocked: true,
    websiteBackground: '/uploads/IMG_3320_1793002801367.jpg',
    specialistsBackground: '/uploads/IMG_3320_1793002801367.jpg',
    coachPhoto: '/uploads/C2C56DFA-CDFD-4964-9A3C-66269D9E1FC1_1793002793641.png',
    services: {},
    gallery: [
      '/uploads/IMG_3321_1793002828943.jpg',
      '/uploads/IMG_3302_1793002830782.jpg',
      '/uploads/IMG_3301_1793002832176.jpg',
      '/uploads/IMG_3299_1793002833362.jpg',
      '/uploads/IMG_3294_1793002834039.jpg',
      '/uploads/IMG_3293_1793002835226.jpg',
      '/uploads/IMG_3291_1793002836393.jpg',
      '/uploads/IMG_3292_1793002837902.jpg'
    ],
    facilities: {
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
      free_parking: '/uploads/IMG_3324_1793002936078.jpg'
    },
    lockedAt: '2026-10-26T08:22:20.000Z',
  };
  fs.writeFileSync(manifestPath, JSON.stringify(defaultManifest, null, 2), 'utf-8');
}

// Request parsers with large limits for high-res photo uploads
app.use(express.json({ limit: '60mb' }));
app.use(express.urlencoded({ limit: '60mb', extended: true }));

// Serve static uploads
app.use('/uploads', express.static(uploadsDir));
app.use('/public', express.static(path.resolve(__dirname, 'public')));

// API Endpoint 1: GET /api/locked-assets
app.get('/api/locked-assets', (_req, res) => {
  try {
    if (fs.existsSync(manifestPath)) {
      const data = fs.readFileSync(manifestPath, 'utf-8');
      return res.json(JSON.parse(data));
    }
    return res.json({
      isLocked: false,
      websiteBackground: '/public/assets/aistudio/IMG_3286_a9bcbdaf.webp',
      specialistsBackground: '/public/assets/aistudio/IMG_3286_a9bcbdaf.webp',
      services: {},
      gallery: [],
      lockedAt: null,
    });
  } catch (error) {
    console.error('Error reading manifest:', error);
    return res.status(500).json({ error: 'Failed to read locked assets' });
  }
});

// API Endpoint 2: POST /api/upload-photo
app.post('/api/upload-photo', (req, res) => {
  try {
    const { filename, dataUrl } = req.body;
    if (!dataUrl) {
      return res.status(400).json({ error: 'Missing dataUrl' });
    }

    // Extract base64 and mime
    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let buffer: Buffer;
    let ext = 'jpg';

    if (matches && matches.length === 3) {
      const mime = matches[1];
      if (mime.includes('png')) ext = 'png';
      else if (mime.includes('webp')) ext = 'webp';
      else if (mime.includes('svg')) ext = 'svg';
      else if (mime.includes('gif')) ext = 'gif';
      else ext = 'jpg';
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(dataUrl, 'base64');
    }

    const cleanName = (filename || `photo_${Date.now()}`)
      .replace(/[^a-zA-Z0-9_\-\.]/g, '_')
      .replace(/\.[^/.]+$/, '');
    const finalFilename = `${cleanName}_${Date.now()}.${ext}`;
    const destinationPath = path.resolve(uploadsDir, finalFilename);

    fs.writeFileSync(destinationPath, buffer);
    const relativeUrl = `/uploads/${finalFilename}`;

    return res.json({
      success: true,
      url: relativeUrl,
      filename: finalFilename,
      bytes: buffer.length,
    });
  } catch (error) {
    console.error('Error handling upload-photo:', error);
    return res.status(500).json({ error: 'Failed to save photo' });
  }
});

// API Endpoint 3: POST /api/save-locked-assets
app.post('/api/save-locked-assets', (req, res) => {
  try {
    const { manifest } = req.body;
    if (!manifest || typeof manifest !== 'object') {
      return res.status(400).json({ error: 'Invalid manifest payload' });
    }

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
    return res.json({ success: true, manifest });
  } catch (error) {
    console.error('Error saving locked assets:', error);
    return res.status(500).json({ error: 'Failed to write manifest' });
  }
});

// API Endpoint 4: POST /api/lock-website
app.post('/api/lock-website', (req, res) => {
  try {
    let currentManifest: Manifest = {
      isLocked: false,
      websiteBackground: '/public/assets/aistudio/IMG_3286_a9bcbdaf.webp',
      specialistsBackground: '/public/assets/aistudio/IMG_3286_a9bcbdaf.webp',
      services: {},
      gallery: [],
      lockedAt: null,
    };

    if (fs.existsSync(manifestPath)) {
      try {
        currentManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
      } catch (err) {
        console.error('Manifest parse error, resetting:', err);
      }
    }

    // Optional updates provided with the lock action
    if (req.body && req.body.manifest) {
      currentManifest = { ...currentManifest, ...req.body.manifest };
    }

    currentManifest.isLocked = true;
    currentManifest.lockedAt = new Date().toISOString();

    fs.writeFileSync(manifestPath, JSON.stringify(currentManifest, null, 2), 'utf-8');
    return res.json({ success: true, isLocked: true, manifest: currentManifest });
  } catch (error) {
    console.error('Error locking website:', error);
    return res.status(500).json({ error: 'Failed to lock website' });
  }
});

// API Endpoint 5: POST /api/unlock-website
app.post('/api/unlock-website', (_req, res) => {
  try {
    let currentManifest: Manifest = {
      isLocked: false,
      websiteBackground: '/public/assets/aistudio/IMG_3286_a9bcbdaf.webp',
      specialistsBackground: '/public/assets/aistudio/IMG_3286_a9bcbdaf.webp',
      services: {},
      gallery: [],
      lockedAt: null,
    };

    if (fs.existsSync(manifestPath)) {
      try {
        currentManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
      } catch (err) {
        console.error('Manifest parse error:', err);
      }
    }

    currentManifest.isLocked = false;
    currentManifest.lockedAt = null;

    fs.writeFileSync(manifestPath, JSON.stringify(currentManifest, null, 2), 'utf-8');
    return res.json({ success: true, isLocked: false, manifest: currentManifest });
  } catch (error) {
    console.error('Error unlocking website:', error);
    return res.status(500).json({ error: 'Failed to unlock website' });
  }
});

// Vite middleware or production static serving
async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RK FITNESS Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
