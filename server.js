import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import compression from 'compression';
import cors from 'cors';
import fs from 'fs';
import climateRouter from './climate-api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(compression());
app.use(cors());

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Health check endpoint
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Debug endpoints
app.get('/api/debug', (req, res) => {
  // Check if optimized-data directory exists
  const dataDir = join(__dirname, 'optimized-data');
  const dirExists = fs.existsSync(dataDir);

  // List files in the directory if it exists
  let files = [];
  if (dirExists) {
    try {
      files = fs.readdirSync(dataDir);
    } catch (error) {
      files = [`Error reading directory: ${error.message}`];
    }
  }

  // Check if climate-api.js exists
  const apiPath = join(__dirname, 'climate-api.js');
  const apiExists = fs.existsSync(apiPath);

  res.json({
    server: {
      dirname: __dirname,
      nodeEnv: process.env.NODE_ENV,
      pid: process.pid
    },
    directories: {
      optimizedData: {
        path: dataDir,
        exists: dirExists,
        files: files
      }
    },
    api: {
      climateApiPath: apiPath,
      exists: apiExists
    }
  });
});

app.get('/api/debug/city/:city', (req, res) => {
  const city = req.params.city;
  const cityPath = join(__dirname, 'optimized-data', `${city}.json`);

  if (!fs.existsSync(cityPath)) {
    return res.status(404).json({ 
      error: 'City file not found',
      path: cityPath,
      cityRequested: city
    });
  }

  try {
    const fileContent = fs.readFileSync(cityPath, 'utf8');
    const cityData = JSON.parse(fileContent);

    res.json({
      fileExists: true,
      fileSize: fileContent.length,
      cityName: cityData.name,
      indicesCount: Object.keys(cityData.indices || {}).length,
      indices: Object.keys(cityData.indices || {})
    });
  } catch (error) {
    res.status(500).json({
      error: `Failed to parse city file: ${error.message}`,
      path: cityPath
    });
  }
});

// New path debugging endpoint
app.get('/api/debug/paths', (req, res) => {
  // Check multiple possible locations for dist directory
  const distPaths = [
    join(__dirname, 'dist'),
    join(__dirname, '../dist'),
    join(process.cwd(), 'dist')
  ];

  const pathInfo = distPaths.map(path => ({
    path,
    exists: fs.existsSync(path),
    isDirectory: fs.existsSync(path) ? fs.statSync(path).isDirectory() : false,
    contents: fs.existsSync(path) && fs.statSync(path).isDirectory() 
      ? fs.readdirSync(path).slice(0, 10) // Show first 10 files
      : []
  }));

  res.json({
    currentDirectory: __dirname,
    processDirectory: process.cwd(),
    distPaths: pathInfo
  });
});

// IMPORTANT: Mount the climate API router BEFORE static files and catch-all route
app.use('/api/climate', climateRouter);

// Create the optimized-data directory if it doesn't exist
const dataDir = join(__dirname, 'optimized-data');
if (!fs.existsSync(dataDir)) {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log(`Created data directory: ${dataDir}`);
  } catch (error) {
    console.error(`Failed to create data directory: ${error.message}`);
  }
}

// Find the dist directory in multiple possible locations
let distPath = null;
const possibleDistPaths = [
  join(__dirname, 'dist'),
  join(__dirname, '../dist'),
  join(process.cwd(), 'dist')
];

for (const path of possibleDistPaths) {
  if (fs.existsSync(path)) {
    console.log(`Found dist directory at: ${path}`);
    distPath = path;
    break;
  }
}

if (!distPath) {
  console.warn('WARNING: Could not find dist directory. Static file serving may not work.');
  console.warn('Possible dist paths checked:');
  possibleDistPaths.forEach(path => console.warn(`- ${path}`));
} else {
  // Serve static files from the found dist directory
  app.use(express.static(distPath));
  console.log(`Serving static files from: ${distPath}`);
}

// The catch-all route should be the LAST route - to avoid catching API requests
app.get('/*', (req, res) => {
  // Prevent handling API routes with the catch-all
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found', path: req.path });
  }

  if (!distPath) {
    return res.status(500).json({ 
      error: 'Server configuration error',
      message: 'Could not find dist directory. Please build the frontend with "npm run build"'
    });
  }

  const indexPath = join(distPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    return res.status(500).json({ 
      error: 'Server configuration error',
      message: `index.html not found at ${indexPath}. Please build the frontend with "npm run build"`,
      distPath,
      indexPath
    });
  }

  res.sendFile(indexPath);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({
    error: 'Server error',
    message: err.message || 'An unknown error occurred',
    path: req.path,
    timestamp: new Date().toISOString()
  });
});

const port = 3000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
  console.log(`Climate API available at http://0.0.0.0:${port}/api/climate`);
});