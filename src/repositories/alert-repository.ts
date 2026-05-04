import "server-only";
import { supabaseAdmin } from "../lib/supabase/server";
import type { Alert } from "../types/alerts";

type AlertRow = {
  id: number;
  apartment_id: number;
  title: string;
  message: string;
  severity: Alert["severity"];
  created_at: string;
  is_resolved: boolean;
};

function mapAlertRow(row: AlertRow): Alert {
  return {
    id: row.id,
    apartmentId: row.apartment_id,
    title: row.title,
    message: row.message,
    severity: row.severity,
    createdAt: row.created_at,
    isResolved: row.is_resolved,
  };
}

export async function listAlertsRepo(): Promise<Alert[]> {
  const { data, error } = await supabaseAdmin
    .from("alerts")
    .select("id, apartment_id, title, message, severity, created_at, is_resolved")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load alerts: ${error.message}`);
  }

  return (data ?? []).map((row) => mapAlertRow(row as AlertRow));
}

export async function listAlertsByApartmentIdRepo(
  apartmentId: number
): Promise<Alert[]> {
  const { data, error } = await supabaseAdmin
    .from("alerts")
    .select("id, apartment_id, title, message, severity, created_at, is_resolved")
    .eq("apartment_id", apartmentId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load alerts: ${error.message}`);
  }

  return (data ?? []).map((row) => mapAlertRow(row as AlertRow));
}
