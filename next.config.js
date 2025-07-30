/** @type {import('next').NextConfig} */
// Next.js configuration for Electron app deployment
const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  // Only use export for production builds
  ...(isDev ? {} : {
    output: 'export',                    // Static export for Electron (production only)
    trailingSlash: true,                 // Add trailing slashes to URLs (production only)
    skipTrailingSlashRedirect: true,     // Skip redirect for trailing slashes (production only)
    distDir: 'out',                      // Output directory for build (production only)
  }),
  images: {
    unoptimized: true                  // Disable image optimization for Electron
  },
  assetPrefix: isDev ? '' : './', // Use relative paths only in production
  publicRuntimeConfig: {
    staticFolder: './public'
  },
  // Enable React Strict Mode for better development experience
  reactStrictMode: isDev,
  webpack: (config) => {
    // Disable Node.js modules for browser compatibility
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,                       // Disable filesystem module
    };
    return config;
  },
}

module.exports = nextConfig
