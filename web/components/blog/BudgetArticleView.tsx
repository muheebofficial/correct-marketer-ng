import type { Metadata } from "next";
import Link from "next/link";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { budgetArticle, budgetArticleMeta, budgetArticleReadingMinutes } from "@/lib/content/budgetArticle";
import { articleSchema } from "@/lib/schema";
import { absoluteUrl, site } from "@/lib/site";

const sections = budgetArticle.split(/(?=^## )/m).map((text) => text.trim()).filter(Boolean);
const headingId = (heading: string) => heading.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const toc = sections.map((section) => section.match(/^## (.+)$/m)?.[1]).filter((heading): heading is string => Boolean(heading));

export function budgetArticleMetadata(): Metadata {
  const canonical = absoluteUrl(`/blog/${budgetArticleMeta.slug}`);
  return {
    title: { absolute: budgetArticleMeta.seoTitle },
    description: budgetArticleMeta.description,
    authors: [{ name: `${budgetArticleMeta.author}, founder of Correct Marketer NG` }],
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: budgetArticleMeta.seoTitle,
      description: budgetArticleMeta.description,
      url: canonical,
      siteName: site.name,
      locale: "en_NG",
      publishedTime: budgetArticleMeta.published,
      modifiedTime: budgetArticleMeta.published,
      authors: [budgetArticleMeta.author],
      tags: budgetArticleMeta.tags,
      images: [{ url: absoluteUrl(`/blog/${budgetArticleMeta.slug}/opengraph-image`), width: 1200, height: 630, alt: budgetArticleMeta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: budgetArticleMeta.seoTitle,
      description: budgetArticleMeta.description,
      images: [absoluteUrl(`/blog/${budgetArticleMeta.slug}/opengraph-image`)],
    },
  };
}

function renderInline(text: string) {
  const token = /(\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^)]+\))/g;
  return text.split(token).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    if (link) return <a key={index} href={link[2]} target="_blank" rel="noopener noreferrer">{link[1]}</a>;
    return part;
  });
}

function renderTable(lines: string[], key: number) {
  const rows = lines.filter((line) => !/^\|\s*:?-{3,}/.test(line)).map((line) => line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));
  const [head, ...body] = rows;
  return (
    <div className="blog-table-scroll" role="region" aria-label="Article data table" tabIndex={0} key={key}>
      <table className="blog-table">
        <thead><tr>{head.map((cell, index) => <th key={index} scope="col">{renderInline(cell)}</th>)}</tr></thead>
        <tbody>{body.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{renderInline(cell)}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function renderSection(section: string, index: number) {
  const heading = section.match(/^## (.+)$/m)?.[1];
  const content = section.replace(/^## .+\n?/, "").trim();
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i += 1; continue; }
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) tableLines.push(lines[i++].trim());
      blocks.push(renderTable(tableLines, i));
      continue;
    }
    if (/^[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*] /.test(lines[i])) items.push(lines[i++].trim().replace(/^[-*] /, ""));
      blocks.push(<ul key={`ul-${i}`} className="blog-list">{items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}</ul>);
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\. /.test(lines[i])) items.push(lines[i++].trim().replace(/^\d+\. /, ""));
      blocks.push(<ol key={`ol-${i}`} className="blog-numbered-list">{items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}</ol>);
      continue;
    }
    if (line.startsWith("### ")) {
      const title = line.slice(4);
      blocks.push(<h3 key={`h3-${i}`} id={headingId(title)}>{title}</h3>);
      i += 1;
      continue;
    }
    const paragraph = [line];
    i += 1;
    while (i < lines.length && lines[i].trim() && !lines[i].trim().startsWith("|") && !/^\s*(?:[-*] |\d+\. |### )/.test(lines[i])) paragraph.push(lines[i++].trim());
    const isFix = paragraph.join(" ").startsWith("**What fixes it:**");
    blocks.push(isFix
      ? <p key={`p-${i}`} className="blog-fix-callout">{renderInline(paragraph.join(" "))}</p>
      : <p key={`p-${i}`}>{renderInline(paragraph.join(" "))}</p>);
  }
  return (
    <section key={index} className="blog-section" aria-labelledby={heading ? headingId(heading) : undefined}>
      {heading && <h2 id={headingId(heading)}>{heading}</h2>}
      {blocks}
      {heading === "Seven places a campaign actually breaks" && <BlogCTA compact />}
    </section>
  );
}

export function BudgetArticleView() {
  const intro = sections[0];
  const introText = intro.replace(/^## .+\n?/, "").trim();
  const canonical = absoluteUrl(`/blog/${budgetArticleMeta.slug}`);
  const schema = {
    ...articleSchema({ title: budgetArticleMeta.title, description: budgetArticleMeta.description, path: `/blog/${budgetArticleMeta.slug}`, published: budgetArticleMeta.published, updated: budgetArticleMeta.published, author: budgetArticleMeta.author }),
    image: absoluteUrl(`/blog/${budgetArticleMeta.slug}/opengraph-image`),
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: absoluteUrl("/logo-color.svg") } },
    articleSection: budgetArticleMeta.category,
    keywords: budgetArticleMeta.tags.join(", "),
  };
  return (
    <article className="blog-page">
      <JsonLd data={schema} />
      <header className="blog-hero">
        <div className="mx-auto max-w-page px-5 py-12 sm:px-8 sm:py-16">
          <Link href="/blog" className="mb-7 inline-flex font-sub text-sm font-bold text-gold-soft underline underline-offset-4">← All blog posts</Link>
          <p className="mb-4 font-sub text-sm font-bold uppercase tracking-[0.16em] text-gold-soft">{budgetArticleMeta.category}</p>
          <h1 className="max-w-5xl font-display text-4xl font-extrabold leading-[1.08] sm:text-6xl">{budgetArticleMeta.title}</h1>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-sub text-sm text-ivory/85">
            <span>{budgetArticleMeta.author}, founder of Correct Marketer NG</span>
            <time dateTime={budgetArticleMeta.published}>8 November 2026</time>
            <span>{budgetArticleReadingMinutes} min read</span>
            <span>{budgetArticleMeta.category}</span>
          </div>
        </div>
      </header>
      <div className="blog-layout mx-auto max-w-page px-5 py-10 sm:px-8 sm:py-14">
        <aside className="blog-toc" aria-label="Table of contents">
          <details className="blog-toc-mobile">
            <summary>In this article <span aria-hidden="true">+</span></summary>
            <TocLinks />
          </details>
          <nav className="blog-toc-desktop" aria-label="Table of contents">
            <h2>In this article</h2><TocLinks />
          </nav>
        </aside>
        <div className="blog-content">
          <p className="blog-intro">{renderInline(introText)}</p>
          <div className="blog-prose">{sections.slice(1).map(renderSection)}</div>
          <div className="sr-only" aria-label="Article canonical URL">{canonical}</div>
        </div>
      </div>
    </article>
  );
}

function TocLinks() {
  return <ol>{toc.map((heading) => <li key={heading}><a href={`#${headingId(heading)}`}>{heading}</a></li>)}</ol>;
}
