import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import { resolve } from 'path';

// For development: simple way to serve the optimized-data in dev mode
const optimizedDataPlugin = () => {
  return {
    name: 'optimized-data-plugin',
    configureServer(server) {
      server.middlewares.use('/api/climate', (req, res, next) => {
        // Extract city name from path like /api/climate/city-data/florianopolis
        const match = req.url.match(/\/city-data\/([^\/]+)/);
        if (!match) {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'Invalid endpoint' }));
          return;
        }

        const cityName = match[1];
        const filePath = resolve('public/data', `${cityName}.json`);

        try {
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(content);
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ 
              error: 'City data not found',
              city: cityName 
            }));
          }
        } catch (err) {
          console.error('Error serving city data:', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    }
  };
};

export default defineConfig({
  plugins: [
    react(),
    optimizedDataPlugin()
  ],
  server: {
    port: 3000,
    host: '0.0.0.0', // This is necessary for Replit
    hmr: {
      // Replit WebView uses port 443 (HTTPS) to access your app
      clientPort: 443,
      // Use the public subdomain Replit provides
      host: new URL(process.env.REPL_SLUG + '.' + process.env.REPL_OWNER + '.repl.co').host,
    }
  }
});