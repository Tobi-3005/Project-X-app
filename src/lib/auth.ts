import "server-only";
import { createServerSupabaseClient, supabaseAdmin } from "./supabase/server";

export type UserRole = "admin" | "owner" | "manager";

export type AuthUser = {
  id: string;
  email: string;
  role: UserRole;
  fullName: string | null;
};

export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  const role = await getUserRole(user.id);

  return {
    id: user.id,
    email: user.email ?? "",
    role,
    fullName: (user.user_metadata?.full_name as string | undefined) ?? null,
  };
}

export async function getUserRole(userId: string): Promise<UserRole> {
  const { data } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  return (data?.role as UserRole | undefined) ?? "manager";
}
