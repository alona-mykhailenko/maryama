import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supbase/server";

export async function getAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  return data?.claims ?? null; // contains the admin's email and id
}

export async function isAdmin() {
  return (await getAdmin()) !== null;
}

export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}