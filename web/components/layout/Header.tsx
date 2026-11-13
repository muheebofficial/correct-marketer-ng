import { HeaderClient } from "@/components/layout/HeaderClient";
import { getCollection } from "@/lib/api";
import { services } from "@/lib/content/services";
import type { Service } from "@/lib/content/types";
import { tools } from "@/lib/tools/registry";

export async function Header() {
  const allServices = await getCollection<Service>("services", services);
  const menus = {
    "/services": { allLabel: "All services", items: allServices.map((s) => ({ label: s.name, href: `/services/${s.slug}`, hint: s.outcome })) },
    "/tools": { allLabel: "All free tools", items: tools.map((t) => ({ label: t.name, href: t.href, hint: t.summary })) },
  };
  return <HeaderClient menus={menus} />;
}
