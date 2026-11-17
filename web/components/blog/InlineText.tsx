import Link from "next/link";
import type { ReactNode } from "react";

const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*(.+?)\*\*/g;

/**
 * Renders the small inline syntax used in blog post data:
 * [link text](url) and **bold**. Internal paths use next/link; external URLs open in a new tab.
 * Anything else is rendered as plain text, so existing posts are unaffected.
 */
export function InlineText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(TOKEN)) {
    const start = m.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    if (m[3] !== undefined) {
      nodes.push(<strong key={key++}>{m[3]}</strong>);
    } else {
      const href = m[2];
      nodes.push(
        href.startsWith("/") ? (
          <Link key={key++} href={href} className="font-semibold text-forest underline decoration-gold underline-offset-4">{m[1]}</Link>
        ) : (
          <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-forest underline decoration-gold underline-offset-4">{m[1]}</a>
        ),
      );
    }
    last = start + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}
