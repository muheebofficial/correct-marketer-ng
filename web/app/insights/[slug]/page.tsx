import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { Button } from "@/components/ui/Button";
import { OneSignalSubscribeButton } from "@/components/tracking/OneSignalSubscribeButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { services } from "@/lib/content/services";
import type { Service } from "@/lib/content/types";
import { getCollection } from "@/lib/api";
import { formatDate, getPosts, slugify } from "@/lib/insights";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getPosts()).find((p) => p.slug === slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/insights/${post.slug}`,
    type: "article",
    publishedTime: post.published,
    modifiedTime: post.updated,
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = await getPosts();
  const foundPost = all.find((p) => p.slug === slug);

  if (!foundPost) notFound();

  const post = foundPost;
  const path = `/insights/${post.slug}`;
  const allServices = await getCollection<Service>("services", services);
  const serviceAliases: Record<string, string> = {
    seo: "best-seo-agency-in-nigeria",
    "web-development": "best-web-development-company-in-nigeria",
    "ai-marketing-automation": "best-ai-automation-agency-in-nigeria",
  };
  const serviceSlug = serviceAliases[post.service] ?? post.service;
  const service = allServices.find((s) => s.slug === serviceSlug);
  const related = all.filter((p) => post.related.includes(p.slug));
  const url = absoluteUrl(path);
  const share = [
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}` },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: "Share on X", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}` },
  ];
  const isClaudeDuetPost = post.slug === "claude-duet-proactive-ai-agents-nigerian-business";
  const heroImage = "/claude-duet-blog-post-image.svg";

  if (isClaudeDuetPost) {
    const faqItems = post.faq ?? [];
    const breadcrumbItems = [
      { name: "Home", path: "/" },
      { name: "Insights", path: "/insights" },
      { name: "AI Automation", path: "/insights/category/ai-automation" },
      { name: post.title, path },
    ];

    return (
      <>
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.description,
              image: absoluteUrl(heroImage),
              mainEntityOfPage: absoluteUrl(path),
              datePublished: post.published,
              dateModified: post.updated,
              author: { "@type": "Person", name: post.author },
              publisher: {
                "@type": "Organization",
                name: site.name,
                logo: {
                  "@type": "ImageObject",
                  url: absoluteUrl("/logo-color.svg"),
                },
              },
              articleSection: post.category,
            },
            faqSchema(faqItems),
            breadcrumbSchema(breadcrumbItems.map((crumb) => ({ name: crumb.name, path: crumb.path }))),
          ]}
        />
        <article>
          <header className="on-dark adire bg-forest text-ivory">
            <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 md:py-20">
              <Breadcrumbs tone="dark" items={[{ name: "Insights", path: "/insights" }, { name: "AI Automation", path: "/insights/category/ai-automation" }, { name: post.title, path }]} />
              <p className="mt-8 font-sub text-sm font-bold text-gold-soft">{post.category}</p>
              <h1 className="mt-2 font-display text-[clamp(2.25rem,5.5vw,4rem)] font-extrabold leading-[1.02]">{post.title}</h1>
              <p className="mt-5 text-sm text-ivory/85">
                By <Link href="/about" className="font-semibold underline underline-offset-4">{post.author}</Link> · Published <time dateTime={post.published}>{formatDate(post.published)}</time> · {post.readingMinutes} min read
              </p>
              <figure className="mt-8 overflow-hidden rounded-2xl border border-gold/30 bg-[#071918]">
                <img src={heroImage} alt="Checklist showing AI tasks marked done and one payment waiting for the owner's approval, under the headline 'AI that starts work before you ask'" width={1200} height={630} className="h-auto w-full" priority />
              </figure>
            </div>
          </header>

          <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
            <nav aria-label="Table of contents" className="mb-12 rounded-2xl border border-stone-light bg-stone-50 p-5">
              <p className="font-sub text-sm font-bold uppercase tracking-[0.12em] text-forest">Table of contents</p>
              <ol className="mt-4 space-y-2 text-base">
                <li><a href="#what-is-claude-duet" className="text-forest underline-offset-4 hover:underline">What is Claude Duet?</a></li>
                <li><a href="#the-part-that-matters-it-starts-work-it-doesnt-just-answer" className="text-forest underline-offset-4 hover:underline">The part that matters: it starts work, it doesn't just answer</a></li>
                <li><a href="#straight-talk-can-you-use-it-in-nigeria-today" className="text-forest underline-offset-4 hover:underline">Straight talk: can you use it in Nigeria today?</a></li>
                <li><a href="#its-not-alone-the-race-is-on" className="text-forest underline-offset-4 hover:underline">It's not alone: the race is on</a></li>
                <li><a href="#five-things-nigerian-business-owners-should-do-right-now" className="text-forest underline-offset-4 hover:underline">5 things Nigerian business owners should do right now</a></li>
                <li><a href="#the-bottom-line" className="text-forest underline-offset-4 hover:underline">The bottom line</a></li>
                <li><a href="#faq" className="text-forest underline-offset-4 hover:underline">FAQ</a></li>
              </ol>
            </nav>

            <div className="prose-cm text-lg">
              <p className="font-accent text-xl italic text-mute">Let me say the quiet part loud: the AI conversation is changing, and most business owners are still stuck on the old one.</p>
              <p>The old one was "which chatbot should I ask?" The new one is "which AI should I trust to start work on its own?"</p>
              <p>On October 21, 2026, Anthropic introduced <strong>Claude Duet</strong>, and it is the clearest signal yet of where this is going. <a href="https://venturebeat.com/technology/anthropics-answer-to-muse-is-here-claude-duet-a-mobile-and-desktop-ai-agent-that-takes-actions-proactively" target="_blank" rel="noopener noreferrer">VentureBeat broke down the launch</a>, and I want to translate it into what it means for you, a business owner in Nigeria.</p>

              <section className="mt-10" id="what-is-claude-duet">
                <h2 className="mb-3 font-sub text-2xl font-bold text-forest">What is Claude Duet?</h2>
                <p>Duet is an AI assistant that watches the apps you connect to it, works out what needs your attention, and carries out tasks in the background. You don't have to open a chat and type a prompt every time.</p>
                <p>According to the report, it can:</p>
                <ul className="list-disc pl-6">
                  <li>Build a <strong>daily briefing</strong> from your connected accounts</li>
                  <li>Check those accounts every few hours and <strong>notify you</strong> when something needs attention</li>
                  <li>Chase <strong>unpaid invoices</strong> and draft customer follow-ups</li>
                  <li>Build financial forecasts and simple web apps</li>
                  <li>Keep working in the cloud <strong>after you close your laptop or lock your phone</strong></li>
                </ul>
                <p>It runs through a mobile app (iOS and Android) and claude.ai, and you talk to it by text or voice.</p>
              </section>

              <section className="mt-10" id="the-part-that-matters-it-starts-work-it-doesnt-just-answer">
                <h2 className="mb-3 font-sub text-2xl font-bold text-forest">The part that matters: it starts work, it doesn't just answer</h2>
                <p>Think about what actually kills small businesses. It's rarely a lack of tools. It's the email that sat unread for two days, the invoice nobody followed up, the customer who went cold because nobody replied in time.</p>
                <p>Duet is built around catching exactly those moments. That's the shift: from AI that <strong>waits for instructions</strong> to AI that <strong>notices work that needs doing</strong>.</p>
                <p>And before you panic about an AI going rogue with your money, here's the sensible part. Per the report, Duet shows you what it plans to do and asks for approval before sending a message, paying for something, signing an agreement, or deleting anything. Some actions, like securities trades and transfers between financial accounts, are off the table entirely.</p>
              </section>

              <section className="mt-10" id="straight-talk-can-you-use-it-in-nigeria-today">
                <h2 className="mb-3 font-sub text-2xl font-bold text-forest">Straight talk: can you use it in Nigeria today?</h2>
                <p>No, not yet, and I won't pretend otherwise.</p>
                <p>Duet is a <strong>research preview</strong>, open to <strong>U.S. subscribers</strong> on Claude's Pro and Max plans through a waitlist. It also isn't available for Team or Enterprise plans at launch. Anthropic has admitted it can misread a conversation or get the urgency of an issue wrong, and the checks happen every few hours, not in real time.</p>
                <p>So why am I writing about it? Because <strong>the direction is the story, not the launch date.</strong></p>
              </section>

              <section className="mt-10" id="its-not-alone-the-race-is-on">
                <h2 className="mb-3 font-sub text-2xl font-bold text-forest">It's not alone: the race is on</h2>
                <p>Duet is entering a market that's already moving fast. Meta launched its own proactive agent, <strong>Muse</strong>, in September, and it works through WhatsApp. <a href="https://finance.yahoo.com/markets/article/metas-muse-ai-agent-hits-109-million-downloads-as-chatgpt-slides-25-153532560.html" target="_blank" rel="noopener noreferrer">Sensor Tower estimates</a>, as reported in the VentureBeat piece, put Muse at about 10.9 million downloads in its first six weeks. <a href="https://openai.com/index/introducing-dots/" target="_blank" rel="noopener noreferrer">OpenAI has its own competing agents too.</a></p>
                <p>When Meta, Anthropic, and OpenAI all build toward the same idea inside a single month, that's not a trend. That's a direction of travel.</p>
                <p>And notice Meta's choice: <strong>WhatsApp</strong>. In Nigeria, WhatsApp is where business actually happens. Orders, enquiries, price negotiations, payment confirmations. If the world's biggest platforms see WhatsApp as the place for AI agents to work, you should too.</p>
              </section>

              <section className="mt-10" id="five-things-nigerian-business-owners-should-do-right-now">
                <h2 className="mb-3 font-sub text-2xl font-bold text-forest">5 things Nigerian business owners should do right now</h2>
                <ol className="list-decimal pl-6">
                  <li><strong>Get your leads and data in order first.</strong> An agent can only act on what it can see. If your customer list lives in your head, your DMs, and three notebooks, no AI will fix that. Put your customers, orders, and follow-ups in one place.</li>
                  <li><strong>Fix your process before you automate it.</strong> Automation doesn't repair a messy sales process. It runs it faster. Write down how a lead becomes a paying customer in your business. Every step.</li>
                  <li><strong>Start with the repetitive stuff.</strong> Follow-up messages, order confirmations, FAQs, invoice reminders. These are low-risk, easy to check, and eat hours every week. Start there, not with payroll.</li>
                  <li><strong>Keep a human in the approval loop.</strong> Even the most advanced agents ask before doing anything consequential. Build the same rule into your own systems: AI drafts and prepares, you approve what matters.</li>
                  <li><strong>Don't wait for the perfect tool.</strong> You don't need Duet to start. <Link href="/services/best-ai-automation-agency-in-nigeria">WhatsApp sales and follow-up systems</Link> are available now. The businesses that build the habit early will be ready when tools like Duet arrive.</li>
                </ol>
              </section>

              <section className="mt-10" id="the-bottom-line">
                <h2 className="mb-3 font-sub text-2xl font-bold text-forest">The bottom line</h2>
                <p>Claude Duet is not for most Nigerian businesses today. But it's a clear preview of how business will run in the next few years: AI that watches, flags, prepares, and acts, with you making the final call.</p>
                <p>The question isn't whether this reaches Nigeria. It's whether your business will be organised enough to use it when it does.</p>
                <p>At Correct Marketer NG, we help Nigerian businesses get lead flow, follow-up, and sales automation working now, so you're not scrambling later. We bring in the leads, automate the follow-up, and leave you talking only to customers who are ready to buy.</p>
                <p><strong>Want to start? Message us on WhatsApp: <a href="https://wa.me/2349110172901" target="_blank" rel="noopener noreferrer">+234 911 017 2901</a> or visit <Link href="/">correctmarketer.com.ng</Link>.</strong></p>
                <p>We also help businesses use <Link href="/services/best-ai-automation-agency-in-nigeria">AI automation</Link> in a practical way, without waiting for the next big launch.</p>
              </section>

              <section className="mt-10" id="faq">
                <h2 className="mb-6 font-sub text-2xl font-bold text-forest">FAQ</h2>
                {faqItems.map((faqItem) => (
                  <div key={faqItem.q} className="mb-6 border-b border-stone-light pb-5">
                    <h3 className="font-sub text-xl font-bold text-forest">{faqItem.q}</h3>
                    <p className="mt-2">{faqItem.a}</p>
                  </div>
                ))}
              </section>

              <p className="mt-10 text-sm italic text-mute">Source: <a href="https://venturebeat.com/technology/anthropics-answer-to-muse-is-here-claude-duet-a-mobile-and-desktop-ai-agent-that-takes-actions-proactively" target="_blank" rel="noopener noreferrer">VentureBeat, "Anthropic's answer to Muse is here: Claude Duet"</a>, October 21, 2026.</p>
            </div>
          </div>
        </article>

        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
            <h2 className="font-display text-3xl font-extrabold text-forest">Related reading</h2>
            <ul className="mt-4 space-y-3">
              <li><Link href="/insights/can-ai-automate-whatsapp-customer-support" className="font-sub text-lg font-bold text-forest underline decoration-gold underline-offset-4">Can AI Automate WhatsApp Customer Support for Your Business?</Link></li>
              <li><Link href="/insights/why-your-website-is-not-generating-customers" className="font-sub text-lg font-bold text-forest underline decoration-gold underline-offset-4">Why Your Website Isn't Generating Customers (and How to Fix It)</Link></li>
              <li><Link href="/insights" className="font-sub text-lg font-bold text-forest underline decoration-gold underline-offset-4">Insights blog index</Link></li>
            </ul>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.description,
          path,
          published: post.published,
          updated: post.updated,
          author: post.author,
        })}
      />
      <article>
        <header className="on-dark adire bg-forest text-ivory">
          <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 md:py-20">
            <Breadcrumbs
              tone="dark"
              items={[
                { name: "Insights", path: "/insights" },
                { name: post.category, path: `/insights/category/${slugify(post.category)}` },
                { name: post.title, path },
              ]}
            />
            <p className="mt-8 font-sub text-sm font-bold text-gold-soft">{post.category}</p>
            <h1 className="mt-2 font-display text-[clamp(2.25rem,5.5vw,4rem)] font-extrabold leading-[1.02]">{post.title}</h1>
            <div className="mt-5"><OneSignalSubscribeButton /></div>
            <p className="mt-5 text-sm text-ivory/85">
              By <Link href="/about" className="font-semibold underline underline-offset-4">{post.author}</Link> · Published{" "}
              <time dateTime={post.published}>{formatDate(post.published)}</time>
              {post.updated !== post.published && <> · Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></>} · {post.readingMinutes} min read
            </p>
          </div>
        </header>

        <div className="mx-auto grid max-w-4xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_220px] lg:gap-14">
          <div className="prose-cm text-lg">
            <p className="font-accent text-xl italic text-mute">{post.intro}</p>
            {post.sections.map((s) => (
              <section key={s.heading} className="mt-10">
                <h2 id={slugify(s.heading)} className="mb-3 font-sub text-2xl font-bold text-forest">{s.heading}</h2>
                {s.paragraphs.map((p) => <p key={p}>{p}</p>)}
              </section>
            ))}

            {post.faq && post.faq.length > 0 && (
              <section className="mt-12">
                <h2 id="faq" className="mb-6 font-sub text-2xl font-bold text-forest">FAQ</h2>
                {post.faq.map((faqItem) => (
                  <div key={faqItem.q} className="mb-6 border-b border-stone-light pb-5">
                    <h3 className="font-sub text-xl font-bold text-forest">{faqItem.q}</h3>
                    <p className="mt-2">{faqItem.a}</p>
                  </div>
                ))}
              </section>
            )}

            {post.source && <p className="mt-10 text-sm italic text-mute">Source: {post.source}</p>}

            {service && (
              <aside className="mt-12 border-l-4 border-gold bg-white p-6">
                <p className="font-sub text-lg font-bold text-forest">Want this handled for you?</p>
                <p className="mb-4 mt-1 text-base text-mute">See how we approach {service.name.toLowerCase()} for Nigerian businesses.</p>
                <Button href={`/services/${service.slug}`} variant="forest" event="service_cta_click" params={{ source: "article", service: service.slug }}>
                  {service.cta}
                </Button>
              </aside>
            )}

            {post.cta && (
              <p className="mt-8 text-base font-semibold text-forest"><strong>{post.cta}</strong></p>
            )}

            <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-base">
              {share.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-forest underline decoration-gold underline-offset-4">{s.label}</a>
              ))}
            </div>
          </div>

          <aside aria-label="Table of contents" className="hidden lg:block">
            <nav className="sticky top-28 border-l border-stone-light pl-4 text-sm">
              <p className="mb-3 font-sub font-bold">In this article</p>
              <ol className="space-y-2">
                {post.sections.map((s) => (
                  <li key={s.heading}><a href={`#${slugify(s.heading)}`} className="text-mute underline-offset-4 hover:text-forest hover:underline">{s.heading}</a></li>
                ))}
              </ol>
            </nav>
          </aside>
        </div>

        <section aria-label="About the author" className="mx-auto max-w-4xl px-5 pb-12 sm:px-8">
          <div className="border-t border-stone-light pt-8">
            <p className="font-sub text-lg font-bold">{site.founder.name}</p>
            <p className="text-sm font-semibold text-gold-ink">{site.founder.title}, Correct Marketer NG</p>
            <p className="mt-2 max-w-2xl text-mute">
              Digital marketing strategist, web developer and agentic AI workflow architect specialising in SEO and paid advertising.
            </p>
          </div>
        </section>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-h" className="bg-white">
          <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
            <h2 id="related-h" className="font-display text-3xl font-extrabold text-forest">Keep reading</h2>
            <ul className="mt-4 space-y-2">
              {related.map((r) => (
                <li key={r.slug}><Link href={`/insights/${r.slug}`} className="font-sub text-lg font-bold text-forest underline decoration-gold underline-offset-4">{r.title}</Link></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="nl-h" className="on-dark bg-obsidian text-ivory">
        <div className="mx-auto grid max-w-4xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-2">
          <div>
            <h2 id="nl-h" className="font-display text-3xl font-extrabold">Get Smarter About Growth</h2>
            <p className="mt-2 text-ivory/85">Practical marketing, SEO, AI and growth strategies for Nigerian businesses, without the jargon.</p>
            <div className="mt-5"><WhatsAppButton source="article_newsletter_block" message={`Hi Correct Marketer NG, I read "${post.title}" and would like to talk.`} label="Talk to us on WhatsApp" /></div>
          </div>
          <NewsletterForm tone="dark" idPrefix="article-nl" />
        </div>
      </section>

      <FooterCTA source="article" />
    </>
  );
}
