import { HeaderClient } from "@/components/layout/HeaderClient";
import type { MegaGroup } from "@/components/layout/ServicesMegaMenu";
import { getServicesByGroup, serviceGroups } from "@/lib/services-taxonomy";
import { tools } from "@/lib/tools/registry";

export function Header() {
  const groups: MegaGroup[] = serviceGroups.map((g) => ({
    slug: g.slug,
    name: g.name,
    stage: g.stage,
    tagline: g.tagline,
    items: getServicesByGroup(g.slug).map((s) => ({ label: s.menuLabel, href: s.path })),
  }));
  const menus = { "/tools": { allLabel: "All free tools", items: tools.map((t) => ({ label: t.name, href: t.href, hint: t.summary })) } };
  return <HeaderClient menus={menus} serviceGroups={groups} />;
}
