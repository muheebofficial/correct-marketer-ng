/** Single source of truth for the tools: the header dropdown, footer, /tools page and sitemap all read this. */
export type Tool = {
  slug: string;
  name: string;
  href: string;
  tag: string; // short label, e.g. "Paid ads"
  summary: string; // one line for the menu
  description: string; // what the visitor gets, for /tools
  gets: string[]; // bullet list of what they get
  time: string;
};

export const tools: Tool[] = [
  {
    slug: "ad-budget-calculator",
    name: "Naira Ad Reality Check",
    href: "/tools/ad-budget-calculator",
    tag: "Paid ads",
    summary: "Is more ad budget the fix? Find out in a minute.",
    description: "Enter your ad spend, enquiries and sales. We show whether your leak is in the ads, the follow-up or the tracking, before you raise your budget.",
    gets: ["Cost per enquiry and cost per sale, with 7.5% VAT", "Your break-even close rate", "What doubling the budget would really do", "The 3 fixes to make first"],
    time: "About 1 minute",
  },
  {
    slug: "website-conversion-checker",
    name: "Website Conversion Checker",
    href: "/tools/website-conversion-checker",
    tag: "Website",
    summary: "Scan your page for what stops visitors becoming enquiries.",
    description: "Paste your website address. We read the page the way a visitor's phone does and check the basics that turn visits into WhatsApp chats, calls and forms.",
    gets: ["A score out of 100 with a plain-English verdict", "Checks for WhatsApp or call button, HTTPS, mobile setup, title, description and more", "The top fixes ranked by impact", "Nothing stored unless you send the result to us"],
    time: "About 15 seconds",
  },
];

export const getTool = (slug: string) => tools.find((t) => t.slug === slug);
