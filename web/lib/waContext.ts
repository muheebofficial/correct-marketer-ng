const map: [string, string][] = [
  ["/services/seo", "Hi Correct Marketer NG, I'd like an SEO growth consultation."],
  ["/services/paid-advertising", "Hi Correct Marketer NG, I'd like to review my ad performance."],
  ["/services/ai-marketing-automation", "Hi Correct Marketer NG, I'd like to explore AI automation for my business."],
  ["/services/web-development", "Hi Correct Marketer NG, I'd like to talk about a new website."],
  ["/services/lead-generation", "Hi Correct Marketer NG, I'd like to generate more qualified leads."],
  ["/services/brand-strategy", "Hi Correct Marketer NG, I'd like help with my brand and positioning."],
  ["/industries", "Hi Correct Marketer NG, I run a business and want a growth plan for my industry."],
  ["/case-studies", "Hi Correct Marketer NG, I'd like to build something like your case studies."],
];

/** Pick a WhatsApp opener that matches the page the visitor is on. */
export function waMessageFor(pathname: string): string {
  const hit = map.find(([prefix]) => pathname.startsWith(prefix));
  return hit ? hit[1] : "Hi Correct Marketer NG, I want to discuss growing my business.";
}
