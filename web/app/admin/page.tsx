import { redirect } from "next/navigation";
import { LeadAdminDashboard } from "@/components/admin/LeadAdminDashboard";
import { isAdminSessionValid } from "@/lib/adminAuth";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
    title: "Admin Dashboard",
    description: "Internal lead pipeline dashboard for Correct Marketer NG.",
    path: "/admin",
});

export default function AdminPage() {
    if (!isAdminSessionValid()) {
        redirect("/admin/login");
    }

    return <LeadAdminDashboard />;
}
