/** @type {import('next').NextConfig} */
// Next.js configuration for Electron app deployment
const nextConfig = {
  output: 'export',                    // Static export for Electron
  trailingSlash: true,                 // Add trailing slashes to URLs
  skipTrailingSlashRedirect: true,     // Skip redirect for trailing slashes
  distDir: 'out',                      // Output directory for build
  images: {
    unoptimized: true                  // Disable image optimization for Electron
  },
  assetPrefix: './', // Always use relative paths for Electron
  publicRuntimeConfig: {
    staticFolder: './public'
  },
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
