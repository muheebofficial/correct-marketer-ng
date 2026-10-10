/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  experimental: {
    outputFileTracingIncludes: {
      "/api/free-guide": ["./private/The-Nigerian-Business-Guide-to-Agentic-AI-Automation.pdf"],
    },
  },
  async rewrites() {
    return {
      beforeFiles: [{ source: "/free-guide", destination: "/free-guide/index.html" }],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
