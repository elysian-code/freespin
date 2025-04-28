export function getBaseUrl() {
  // Check for GitHub Codespaces environment
  const forwardedHost = typeof window !== 'undefined' 
    ? window.location.host 
    : process?.env?.GITHUB_CODESPACES_PORT 
      ? process.env.CODESPACE_NAME + '.app.github.dev' 
      : undefined;

  if (forwardedHost?.includes('.app.github.dev')) {
    return `https://${forwardedHost}`
  }
  
  // Check for production environment variables
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // Development environment
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  }

  // Production fallback
  return `https://${process.env.NEXT_PUBLIC_DOMAIN || 'your-domain.com'}`
}