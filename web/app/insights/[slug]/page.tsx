import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { services } from "@/lib/content/services";
import { formatDate, getPosts, slugify } from "@/lib/insights";
import { articleSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = (await getPosts()).find((p) => p.slug === params.slug);
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

export default async function PostPage({ params }: { params: { slug: string } }) {
  const all = await getPosts();
  const post = all.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const path = `/insights/${post.slug}`;
  const service = services.find((s) => s.slug === post.service);
  const related = all.filter((p) => post.related.includes(p.slug));
  const url = absoluteUrl(path);
  const share = [
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}` },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: "Share on X", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}` },
  ];

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

            {service && (
              <aside className="mt-12 border-l-4 border-gold bg-white p-6">
                <p className="font-sub text-lg font-bold text-forest">Want this handled for you?</p>
                <p className="mb-4 mt-1 text-base text-mute">See how we approach {service.name.toLowerCase()} for Nigerian businesses.</p>
                <Button href={`/services/${service.slug}`} variant="forest" event="service_cta_click" params={{ source: "article", service: service.slug }}>
                  {service.cta}
                </Button>
              </aside>
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
