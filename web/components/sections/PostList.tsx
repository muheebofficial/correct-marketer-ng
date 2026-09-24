import Link from "next/link";
import { formatDate } from "@/lib/insights";
import type { Post } from "@/lib/content/types";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="divide-y divide-obsidian/15 border-y border-obsidian/15">
      {posts.map((p) => (
        <li key={p.slug}>
          <article className="grid gap-2 py-7 md:grid-cols-[180px_1fr] md:gap-10">
            <div className="text-sm text-mute">
              <p className="font-sub font-bold text-gold-ink">{p.category}</p>
              <p><time dateTime={p.published}>{formatDate(p.published)}</time> · {p.readingMinutes} min read</p>
            </div>
            <div>
              <h2 className="font-sub text-2xl font-bold leading-snug text-forest">
                <Link href={`/insights/${p.slug}`} className="underline-offset-4 hover:underline">{p.title}</Link>
              </h2>
              <p className="mt-2 max-w-2xl text-mute">{p.description}</p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
