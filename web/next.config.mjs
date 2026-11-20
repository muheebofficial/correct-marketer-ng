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
  async redirects() {
    // The /insights section was merged into /blog; keep every old URL alive with a permanent redirect.
    return [
      // Service URLs were localised to Lagos, Nigeria; the six previously live URLs redirect permanently.
      { source: "/services/best-seo-agency-in-nigeria", destination: "/services/best-seo-agency-in-lagos-nigeria", permanent: true },
      { source: "/services/best-google-ads-agency-in-nigeria", destination: "/services/best-google-ads-agency-in-lagos-nigeria", permanent: true },
      { source: "/services/best-ai-automation-agency-in-nigeria", destination: "/services/best-ai-automation-agency-in-lagos-nigeria", permanent: true },
      { source: "/services/best-web-development-company-in-nigeria", destination: "/services/best-web-development-company-in-lagos-nigeria", permanent: true },
      { source: "/services/best-lead-generation-agency-in-nigeria", destination: "/services/best-lead-generation-agency-in-lagos-nigeria", permanent: true },
      { source: "/services/best-brand-strategy-agency-in-nigeria", destination: "/services/best-brand-strategy-agency-in-lagos-nigeria", permanent: true },
      // Earlier service and hub slugs (original, stage-grouped and pre-localisation) all resolve to the Lagos-localised pages.
      { source: "/services/attract-customers", destination: "/services/attract-customers-in-lagos-nigeria", permanent: true },
      { source: "/services/generate-leads", destination: "/services/generate-leads-in-lagos-nigeria", permanent: true },
      { source: "/services/nurture-prospects", destination: "/services/nurture-prospects-in-lagos-nigeria", permanent: true },
      { source: "/services/convert-leads", destination: "/services/convert-leads-in-lagos-nigeria", permanent: true },
      { source: "/services/retain-and-scale", destination: "/services/retain-and-scale-customers-in-lagos-nigeria", permanent: true },
      { source: "/services/answer-engine-optimisation-geo-nigeria", destination: "/services/ai-search-optimisation-aeo-geo-in-lagos-nigeria", permanent: true },
      { source: "/services/local-seo-google-business-profile-nigeria", destination: "/services/best-local-seo-google-business-profile-in-lagos-nigeria", permanent: true },
      { source: "/services/social-media-advertising-agency-in-nigeria", destination: "/services/best-social-media-advertising-agency-in-lagos-nigeria", permanent: true },
      { source: "/services/click-to-whatsapp-ads-nigeria", destination: "/services/click-to-whatsapp-ads-in-lagos-nigeria", permanent: true },
      { source: "/services/ai-content-marketing-agency-in-nigeria", destination: "/services/best-ai-content-marketing-agency-in-lagos-nigeria", permanent: true },
      { source: "/services/ai-video-visual-content-nigeria", destination: "/services/ai-video-and-visual-content-in-lagos-nigeria", permanent: true },
      { source: "/services/multilingual-content-yoruba-igbo-hausa-nigeria", destination: "/services/yoruba-igbo-hausa-content-marketing-in-lagos-nigeria", permanent: true },
      { source: "/services/influencer-marketing-agency-in-nigeria", destination: "/services/best-influencer-marketing-agency-in-lagos-nigeria", permanent: true },
      { source: "/services/marketplace-optimisation-nigeria", destination: "/services/marketplace-optimisation-in-lagos-nigeria", permanent: true },
      { source: "/services/digital-pr-thought-leadership-nigeria", destination: "/services/digital-pr-agency-in-lagos-nigeria", permanent: true },
      { source: "/services/landing-pages-lead-magnets-nigeria", destination: "/services/landing-pages-and-lead-magnets-in-lagos-nigeria", permanent: true },
      { source: "/services/marketing-tracking-attribution-nigeria", destination: "/services/marketing-tracking-and-attribution-in-lagos-nigeria", permanent: true },
      { source: "/services/whatsapp-business-setup-nigeria", destination: "/services/whatsapp-business-setup-in-lagos-nigeria", permanent: true },
      { source: "/services/ai-whatsapp-sales-agent-nigeria", destination: "/services/ai-whatsapp-sales-agent-in-lagos-nigeria", permanent: true },
      { source: "/services/ai-chatbot-customer-service-automation-nigeria", destination: "/services/ai-chatbot-customer-service-automation-in-lagos-nigeria", permanent: true },
      { source: "/services/crm-setup-automation-nigeria", destination: "/services/crm-setup-and-automation-in-lagos-nigeria", permanent: true },
      { source: "/services/follow-up-sequences-email-sms-whatsapp-nigeria", destination: "/services/follow-up-automation-email-sms-whatsapp-in-lagos-nigeria", permanent: true },
      { source: "/services/whatsapp-marketing-automation-nigeria", destination: "/services/whatsapp-marketing-automation-in-lagos-nigeria", permanent: true },
      { source: "/services/social-media-management-agency-in-nigeria", destination: "/services/best-social-media-management-agency-in-lagos-nigeria", permanent: true },
      { source: "/services/conversion-rate-optimisation-nigeria", destination: "/services/conversion-rate-optimisation-agency-in-lagos-nigeria", permanent: true },
      { source: "/services/sales-funnel-offer-design-nigeria", destination: "/services/sales-funnel-and-offer-design-in-lagos-nigeria", permanent: true },
      { source: "/services/trust-social-proof-building-nigeria", destination: "/services/trust-and-social-proof-building-in-lagos-nigeria", permanent: true },
      { source: "/services/payment-checkout-integration-nigeria", destination: "/services/payment-checkout-integration-in-lagos-nigeria", permanent: true },
      { source: "/services/booking-appointment-automation-nigeria", destination: "/services/booking-and-appointment-automation-in-lagos-nigeria", permanent: true },
      { source: "/services/whatsapp-sales-team-training-nigeria", destination: "/services/whatsapp-sales-team-training-in-lagos-nigeria", permanent: true },
      { source: "/services/retargeting-cart-recovery-nigeria", destination: "/services/retargeting-and-cart-recovery-in-lagos-nigeria", permanent: true },
      { source: "/services/ecommerce-optimisation-ai-nigeria", destination: "/services/ecommerce-optimisation-in-lagos-nigeria", permanent: true },
      { source: "/services/customer-retention-loyalty-referral-nigeria", destination: "/services/customer-retention-loyalty-and-referrals-in-lagos-nigeria", permanent: true },
      { source: "/services/marketing-reporting-dashboards-nigeria", destination: "/services/marketing-reporting-dashboards-in-lagos-nigeria", permanent: true },
      { source: "/services/growth-scaling-ab-testing-nigeria", destination: "/services/growth-experiments-and-ab-testing-in-lagos-nigeria", permanent: true },
      { source: "/services/market-expansion-diaspora-marketing-nigeria", destination: "/services/nationwide-expansion-and-diaspora-marketing-from-lagos-nigeria", permanent: true },
      { source: "/services/business-process-automation-nigeria", destination: "/services/business-process-automation-in-lagos-nigeria", permanent: true },
      { source: "/services/custom-web-apps-dashboards-nigeria", destination: "/services/custom-web-apps-and-dashboards-in-lagos-nigeria", permanent: true },
      { source: "/services/ai-training-workshops-nigeria", destination: "/services/ai-training-workshops-in-lagos-nigeria", permanent: true },
      { source: "/services/fractional-cmo-growth-retainer-nigeria", destination: "/services/fractional-cmo-in-lagos-nigeria", permanent: true },
      { source: "/services/content-video-marketing-agency-in-nigeria", destination: "/services/best-ai-content-marketing-agency-in-lagos-nigeria", permanent: true },
      { source: "/services/seo", destination: "/services/best-seo-agency-in-lagos-nigeria", permanent: true },
      { source: "/services/paid-advertising", destination: "/services/best-google-ads-agency-in-lagos-nigeria", permanent: true },
      { source: "/services/ai-marketing-automation", destination: "/services/best-ai-automation-agency-in-lagos-nigeria", permanent: true },
      { source: "/services/web-development", destination: "/services/best-web-development-company-in-lagos-nigeria", permanent: true },
      { source: "/services/lead-generation", destination: "/services/best-lead-generation-agency-in-lagos-nigeria", permanent: true },
      { source: "/services/brand-strategy", destination: "/services/best-brand-strategy-agency-in-lagos-nigeria", permanent: true },
      { source: "/insights", destination: "/blog", permanent: true },
      { source: "/insights/category/:category", destination: "/blog/category/:category", permanent: true },
      { source: "/insights/tag/:tag", destination: "/blog/tag/:tag", permanent: true },
      { source: "/insights/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
