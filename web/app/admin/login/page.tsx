"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSending(true);
        setError("");

        const formData = new FormData(event.currentTarget);
        const username = String(formData.get("username") || "").trim();
        const password = String(formData.get("password") || "");

        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json().catch(() => ({}));
        setSending(false);

        if (!res.ok) {
            setError(data?.detail || "Invalid login.");
            return;
        }

        router.push("/admin");
        router.refresh();
    }

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center px-4 py-16">
            <div className="w-full rounded-[3px] border border-obsidian/15 bg-white p-6 shadow-sm">
                <p className="font-sub text-xs font-bold uppercase tracking-[0.18em] text-gold-ink">Internal access</p>
                <h1 className="mt-2 font-display text-3xl font-extrabold text-forest">Admin login</h1>
                <p className="mt-2 text-sm text-mute">Use your internal Correct Marketer NG credentials to access the lead dashboard.</p>

                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="username" className="mb-1 block text-sm font-semibold text-obsidian">Username</label>
                        <input id="username" name="username" autoComplete="username" required className="min-h-[44px] w-full rounded-[3px] border border-obsidian/20 bg-white px-3 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm font-semibold text-obsidian">Password</label>
                        <input id="password" name="password" type="password" autoComplete="current-password" required className="min-h-[44px] w-full rounded-[3px] border border-obsidian/20 bg-white px-3 text-sm" />
                    </div>

                    {error && <p className="rounded-[3px] border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

                    <button type="submit" disabled={sending} className="inline-flex min-h-[44px] w-full items-center justify-center rounded-[3px] bg-forest px-4 font-sub font-bold text-ivory disabled:opacity-60">
                        {sending ? "Checking…" : "Unlock dashboard"}
                    </button>
                </form>
            </div>
        </div>
    );
}
