/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow requests from GitHub Codespaces domain
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NODE_ENV === 'development' 
              ? '*'
              : 'https://*.app.github.dev'
          }
        ]
      }
    ]
  },
  // Enable experimental features for better Server Actions support
  experimental: {
    serverActions: {
      allowedOrigins: process.env.NODE_ENV === 'development' 
        ? ['localhost:3000', '.app.github.dev']
        : ['.app.github.dev']
    }
  }
}

export default nextConfig;
