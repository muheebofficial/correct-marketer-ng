import type { Metadata } from "next";

// The admin area is private: keep it out of search results.
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
  alternates: { canonical: undefined },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
