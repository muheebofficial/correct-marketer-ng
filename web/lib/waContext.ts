const map: [string, string][] = [
  ["/services/best-seo-agency-in-nigeria", "Hi Correct Marketer NG, I want to speak with the best SEO agency in Nigeria about growing my business."],
  ["/services/best-google-ads-agency-in-nigeria", "Hi Correct Marketer NG, I want to speak with the best Google Ads agency in Nigeria about my campaigns."],
  ["/services/best-ai-automation-agency-in-nigeria", "Hi Correct Marketer NG, I want to explore AI automation with the best AI agency in Nigeria."],
  ["/services/best-web-development-company-in-nigeria", "Hi Correct Marketer NG, I want to talk with the best web development company in Nigeria about a new website."],
  ["/services/best-lead-generation-agency-in-nigeria", "Hi Correct Marketer NG, I want to speak with the best lead generation agency in Nigeria about more qualified leads."],
  ["/services/best-brand-strategy-agency-in-nigeria", "Hi Correct Marketer NG, I want to speak with the best brand strategy agency in Nigeria about my positioning."],
  ["/industries", "Hi Correct Marketer NG, I run a business and want a growth plan for my industry."],
  ["/case-studies", "Hi Correct Marketer NG, I'd like to build something like your case studies."],
];

/** Pick a WhatsApp opener that matches the page the visitor is on. */
export function waMessageFor(pathname: string): string {
  const hit = map.find(([prefix]) => pathname.startsWith(prefix));
  return hit ? hit[1] : "Hi Correct Marketer NG, I want to discuss growing my business.";
}
