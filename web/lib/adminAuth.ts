import { cookies } from "next/headers";

const ADMIN_SESSION_COOKIE = "cm_admin_session";

export function getAdminCredentials(): { username: string; password: string } {
    return {
        username: process.env.ADMIN_USERNAME || "admin",
        password: process.env.ADMIN_PASSWORD || "change-me",
    };
}

export function createAdminSession(username: string) {
    const secret = process.env.ADMIN_COOKIE_SECRET || "development-secret";
    const value = Buffer.from(`${username}:${secret}`).toString("base64");
    cookies().set(ADMIN_SESSION_COOKIE, value, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 12,
    });
}

export function clearAdminSession() {
    cookies().delete(ADMIN_SESSION_COOKIE);
}

export function isAdminSessionValid(): boolean {
    const cookieValue = cookies().get(ADMIN_SESSION_COOKIE)?.value;
    if (!cookieValue) return false;

    const { username, password } = getAdminCredentials();
    const expected = Buffer.from(`${username}:${process.env.ADMIN_COOKIE_SECRET || "development-secret"}`).toString("base64");
    return cookieValue === expected && !!username && !!password;
}

export function isAdminLoginAttemptValid(username: string, password: string): boolean {
    const expected = getAdminCredentials();
    return username === expected.username && password === expected.password;
}
