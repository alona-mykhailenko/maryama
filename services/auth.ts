import type { LoginPayload } from "@/services/types/auth";

/**
 * Logs an admin in. Supabase sets the session cookie in the response.
 * @throws Error("invalid_credentials") when the email or password is wrong,
 * Error("auth_unavailable") when Supabase can't be reached or is misconfigured
 */
export async function login({ email, password }: LoginPayload): Promise<void> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? "invalid_credentials");
  }
}

/**
 * Logs the admin out and deletes the session cookie.
 */
export async function logout(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST" });
}