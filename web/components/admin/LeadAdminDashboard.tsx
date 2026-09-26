"use client";

import { useEffect, useMemo, useState } from "react";

type LeadNote = { text: string; author: string; created_at?: string };
type ChecklistItem = { label: string; status: "pending" | "done"; completed_by?: string; completed_at?: string };

type Lead = {
    _id?: string;
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    business?: string;
    website?: string;
    stage?: string;
    owner?: string;
    source?: string;
    contact_channel_preference?: string;
    notes?: LeadNote[];
    lost_reason?: string | null;
    onboarding_checklist?: ChecklistItem[];
    created_at?: string;
    stage_updated_at?: string;
    preferred_contact?: string;
    challenge?: string;
    message?: string;
};

const emptyLead: Lead = {
    name: "",
    email: "",
    phone: "",
    stage: "new_lead",
    owner: "Muheeb",
};

const stageLabels: Record<string, string> = {
    new_lead: "New Lead",
    contacted: "Contacted",
    qualified: "Qualified",
    proposal_sent: "Proposal Sent",
    onboarding: "Onboarding",
    active_client: "Active Client / Won",
    lost: "Lost",
};

export function LeadAdminDashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [stages, setStages] = useState<string[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>("all");
    const [noteDraft, setNoteDraft] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(true);

    async function logout() {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/admin/login";
    }

    const leadId = (lead: Lead | null | undefined) => lead?._id || lead?.id || "";

    async function refreshLeads() {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/leads");
            const data = await res.json();
            if (!res.ok) throw new Error(data?.detail || "Unable to load leads.");
            const items = Array.isArray(data?.items) ? data.items : [];
            setLeads(items);
            if (!selectedId && items.length) {
                setSelectedId(leadId(items[0]));
            }
            if (selectedId && !items.some((lead) => leadId(lead) === selectedId)) {
                setSelectedId(leadId(items[0]) || null);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to load leads.");
        } finally {
            setLoading(false);
        }
    }

    async function refreshStages() {
        try {
            const res = await fetch("/api/admin/stages");
            const data = await res.json();
            if (res.ok) setStages(Array.isArray(data?.items) ? data.items : []);
        } catch {
            setStages([]);
        }
    }

    useEffect(() => {
        void refreshLeads();
        void refreshStages();
    }, []);

    const filteredLeads = useMemo(() => {
        if (filter === "all") return leads;
        return leads.filter((lead) => (lead.stage || "new_lead") === filter);
    }, [filter, leads]);

    const selectedLead = useMemo(
        () => filteredLeads.find((lead) => leadId(lead) === selectedId) || filteredLeads[0] || null,
        [filteredLeads, selectedId],
    );

    useEffect(() => {
        if (!selectedLead && filteredLeads[0]) setSelectedId(leadId(filteredLeads[0]));
    }, [filteredLeads, selectedLead]);

    async function updateLeadStage(stage: string) {
        if (!selectedLead) return;
        const id = leadId(selectedLead);
        const res = await fetch(`/api/admin/leads/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stage, owner: selectedLead.owner || "Muheeb" }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            setError(data?.detail || "Unable to update stage.");
            return;
        }
        setError("");
        await refreshLeads();
    }

    async function addNote() {
        if (!selectedLead || !noteDraft.trim()) return;
        const id = leadId(selectedLead);
        const res = await fetch(`/api/admin/leads/${id}/notes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: noteDraft.trim(), author: selectedLead.owner || "Muheeb" }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            setError(data?.detail || "Unable to add note.");
            return;
        }
        setNoteDraft("");
        setError("");
        await refreshLeads();
    }

    async function toggleChecklist(itemLabel: string, newStatus: "pending" | "done") {
        if (!selectedLead) return;
        const id = leadId(selectedLead);
        const res = await fetch(`/api/admin/leads/${id}/checklist/${encodeURIComponent(itemLabel)}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus, completed_by: selectedLead.owner || "Muheeb" }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            setError(data?.detail || "Unable to update checklist.");
            return;
        }
        setError("");
        await refreshLeads();
    }

    async function setLostReason() {
        if (!selectedLead) return;
        const reason = window.prompt("Enter the reason this lead was marked lost:");
        if (!reason || !reason.trim()) return;
        const id = leadId(selectedLead);
        const res = await fetch(`/api/admin/leads/${id}/lost`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lost_reason: reason.trim() }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            setError(data?.detail || "Unable to mark lead as lost.");
            return;
        }
        setError("");
        await refreshLeads();
    }

    return (
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 rounded-[3px] border border-obsidian/15 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="font-sub text-sm font-bold uppercase tracking-[0.18em] text-gold-ink">Admin</p>
                    <h1 className="font-display text-4xl font-extrabold text-forest">Lead pipeline dashboard</h1>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <label className="text-sm font-semibold text-mute">Stage filter</label>
                        <select
                            value={filter}
                            onChange={(event) => setFilter(event.target.value)}
                            className="min-h-[42px] rounded-[3px] border border-obsidian/20 bg-white px-3 text-sm"
                        >
                            <option value="all">All stages</option>
                            {(stages.length ? stages : Object.keys(stageLabels)).map((stage) => (
                                <option key={stage} value={stage}>{stageLabels[stage] || stage}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="button"
                        onClick={() => void logout()}
                        className="inline-flex min-h-[42px] items-center justify-center rounded-[3px] border border-obsidian/20 bg-ivory px-4 font-sub text-sm font-bold text-obsidian"
                    >
                        Log out
                    </button>
                </div>
            </div>

            {error && (
                <div className="mb-6 rounded-[3px] border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
            )}

            <div className="mb-6 grid gap-3 sm:grid-cols-3">
                {[
                    { label: "New leads", value: leads.filter((lead) => (lead.stage || "new_lead") === "new_lead").length },
                    { label: "Qualified", value: leads.filter((lead) => (lead.stage || "new_lead") === "qualified").length },
                    { label: "Onboarding", value: leads.filter((lead) => (lead.stage || "new_lead") === "onboarding").length },
                ].map((stat) => (
                    <div key={stat.label} className="rounded-[3px] border border-obsidian/15 bg-white p-4 shadow-sm">
                        <div className="text-xs font-bold uppercase tracking-[0.12em] text-mute">{stat.label}</div>
                        <div className="mt-2 font-display text-3xl font-extrabold text-forest">{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_2fr]">
                <aside className="rounded-[3px] border border-obsidian/15 bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="font-sub text-lg font-bold text-forest">Leads</h2>
                        <span className="rounded-full bg-forest/10 px-2 py-1 text-xs font-bold text-forest">{filteredLeads.length}</span>
                    </div>

                    {loading ? (
                        <p className="text-sm text-mute">Loading leads…</p>
                    ) : filteredLeads.length === 0 ? (
                        <p className="text-sm text-mute">No leads match this stage.</p>
                    ) : (
                        <div className="space-y-3">
                            {filteredLeads.map((lead) => {
                                const id = leadId(lead);
                                const active = selectedLead && leadId(selectedLead) === id;
                                return (
                                    <button
                                        key={id}
                                        onClick={() => setSelectedId(id)}
                                        className={`w-full rounded-[3px] border p-3 text-left transition ${active ? "border-forest bg-forest/5" : "border-obsidian/10 bg-white hover:border-forest/40"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="font-sub font-bold text-forest">{lead.name || "Unnamed lead"}</span>
                                            <span className="text-[10px] uppercase tracking-[0.12em] text-mute">{stageLabels[lead.stage || "new_lead"] || lead.stage || "New Lead"}</span>
                                        </div>
                                        <div className="mt-2 text-sm text-mute">{lead.email || lead.phone || "No contact details"}</div>
                                        <div className="mt-1 text-xs text-mute">Owner: {lead.owner || "Muheeb"}</div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </aside>

                <section className="rounded-[3px] border border-obsidian/15 bg-white p-5 shadow-sm">
                    {!selectedLead ? (
                        <div className="flex min-h-[220px] items-center justify-center rounded-[3px] border border-dashed border-obsidian/20 bg-[#F9F7F2]">
                            <p className="text-mute">Select a lead to inspect details.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex flex-col gap-4 border-b border-obsidian/10 pb-5 md:flex-row md:items-start md:justify-between">
                                <div>
                                    <p className="font-sub text-sm uppercase tracking-[0.12em] text-gold-ink">Lead detail</p>
                                    <h2 className="mt-2 font-display text-3xl font-extrabold text-forest">{selectedLead.name || "Unnamed lead"}</h2>
                                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-mute">
                                        <span>{selectedLead.email || "No email"}</span>
                                        <span>{selectedLead.phone || "No phone"}</span>
                                        <span>{selectedLead.business || "No business"}</span>
                                    </div>
                                </div>
                                <div className="min-w-[180px]">
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-mute">Stage</label>
                                    <select
                                        value={selectedLead.stage || "new_lead"}
                                        onChange={(event) => void updateLeadStage(event.target.value)}
                                        className="min-h-[42px] w-full rounded-[3px] border border-obsidian/20 bg-white px-3 text-sm"
                                    >
                                        {(stages.length ? stages : Object.keys(stageLabels)).map((stage) => (
                                            <option key={stage} value={stage}>{stageLabels[stage] || stage}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <div className="rounded-[3px] border border-obsidian/10 bg-[#F9F7F2] p-4">
                                    <h3 className="font-sub text-sm font-bold uppercase tracking-[0.12em] text-mute">Summary</h3>
                                    <dl className="mt-3 space-y-2 text-sm">
                                        <div className="flex justify-between gap-4"><dt className="text-mute">Source</dt><dd className="font-medium text-obsidian">{selectedLead.source || "website_form"}</dd></div>
                                        <div className="flex justify-between gap-4"><dt className="text-mute">Owner</dt><dd className="font-medium text-obsidian">{selectedLead.owner || "Muheeb"}</dd></div>
                                        <div className="flex justify-between gap-4"><dt className="text-mute">Preferred contact</dt><dd className="font-medium text-obsidian">{selectedLead.contact_channel_preference || selectedLead.preferred_contact || "Not set"}</dd></div>
                                        <div className="flex justify-between gap-4"><dt className="text-mute">Created</dt><dd className="font-medium text-obsidian">{selectedLead.created_at ? new Date(selectedLead.created_at).toLocaleString() : "—"}</dd></div>
                                        <div className="flex justify-between gap-4"><dt className="text-mute">Last update</dt><dd className="font-medium text-obsidian">{selectedLead.stage_updated_at ? new Date(selectedLead.stage_updated_at).toLocaleString() : "—"}</dd></div>
                                    </dl>
                                </div>

                                <div className="rounded-[3px] border border-obsidian/10 bg-[#F9F7F2] p-4">
                                    <h3 className="font-sub text-sm font-bold uppercase tracking-[0.12em] text-mute">Lead details</h3>
                                    <dl className="mt-3 space-y-2 text-sm">
                                        <div className="flex justify-between gap-4"><dt className="text-mute">Website</dt><dd className="font-medium text-obsidian">{selectedLead.website || "—"}</dd></div>
                                        <div className="flex justify-between gap-4"><dt className="text-mute">Challenge</dt><dd className="font-medium text-obsidian">{selectedLead.challenge || "—"}</dd></div>
                                        <div className="flex justify-between gap-4"><dt className="text-mute">Budget</dt><dd className="font-medium text-obsidian">{selectedLead.budget || "—"}</dd></div>
                                        <div className="flex justify-between gap-4"><dt className="text-mute">Lost reason</dt><dd className="font-medium text-obsidian">{selectedLead.lost_reason || "—"}</dd></div>
                                    </dl>
                                </div>
                            </div>

                            <div className="rounded-[3px] border border-obsidian/10 p-4">
                                <div className="mb-3 flex items-center justify-between gap-3">
                                    <h3 className="font-sub text-lg font-bold text-forest">Notes</h3>
                                    <button
                                        type="button"
                                        onClick={setLostReason}
                                        className="rounded-[3px] border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-red-700"
                                    >
                                        Mark lost
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {(selectedLead.notes || []).length === 0 ? (
                                        <p className="text-sm text-mute">No notes yet.</p>
                                    ) : (
                                        (selectedLead.notes || []).map((note, idx) => (
                                            <div key={`${note.text}-${idx}`} className="rounded-[3px] border border-obsidian/10 bg-[#F9F7F2] p-3">
                                                <div className="mb-1 flex items-center justify-between gap-2 text-xs uppercase tracking-[0.08em] text-mute">
                                                    <span>{note.author || "Muheeb"}</span>
                                                    <span>{note.created_at ? new Date(note.created_at).toLocaleString() : "Just now"}</span>
                                                </div>
                                                <p className="text-sm text-obsidian">{note.text}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <textarea
                                        value={noteDraft}
                                        onChange={(event) => setNoteDraft(event.target.value)}
                                        rows={3}
                                        placeholder="Add a note about this lead..."
                                        className="min-h-[90px] flex-1 rounded-[3px] border border-obsidian/20 bg-white px-3 py-2 text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => void addNote()}
                                        className="self-end rounded-[3px] bg-forest px-4 py-2 font-sub text-sm font-bold text-ivory"
                                    >
                                        Save note
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-[3px] border border-obsidian/10 p-4">
                                <h3 className="font-sub text-lg font-bold text-forest">Onboarding checklist</h3>
                                {(selectedLead.onboarding_checklist || []).length === 0 ? (
                                    <p className="mt-3 text-sm text-mute">Checklist appears when a lead moves into onboarding.</p>
                                ) : (
                                    <div className="mt-4 space-y-3">
                                        {(selectedLead.onboarding_checklist || []).map((item, idx) => (
                                            <div key={`${item.label}-${idx}`} className="flex items-center justify-between gap-3 rounded-[3px] border border-obsidian/10 bg-white p-3">
                                                <div>
                                                    <p className="font-medium text-obsidian">{item.label}</p>
                                                    {item.completed_at ? (
                                                        <p className="text-xs text-mute">Done by {item.completed_by || "Muheeb"} on {new Date(item.completed_at).toLocaleString()}</p>
                                                    ) : (
                                                        <p className="text-xs text-mute">Pending</p>
                                                    )}
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => void toggleChecklist(item.label, item.status === "done" ? "pending" : "done")}
                                                    className={`rounded-[3px] px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] ${item.status === "done" ? "bg-forest text-ivory" : "border border-obsidian/20 bg-white text-obsidian"
                                                        }`}
                                                >
                                                    {item.status === "done" ? "Done" : "Mark done"}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
