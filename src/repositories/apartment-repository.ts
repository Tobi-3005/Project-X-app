import "server-only";
import { supabaseAdmin } from "../lib/supabase/server";
import type { Apartment } from "../types/apartment";

type ApartmentRow = {
  id: number;
  name: string;
  status: Apartment["status"];
  temperature: number;
  energy_today: number;
  mode: Apartment["mode"];
};

function mapApartmentRow(row: ApartmentRow): Apartment {
  return {
    id: row.id,
    name: row.name,
    status: row.status,
    temperature: Number(row.temperature),
    energyToday: Number(row.energy_today),
    mode: row.mode,
  };
}

export async function listApartmentsRepo(): Promise<Apartment[]> {
  const { data, error } = await supabaseAdmin
    .from("apartments")
    .select("id, name, status, temperature, energy_today, mode")
    .order("id", { ascending: true });

  if (error) {
    throw new Error(`Failed to load apartments: ${error.message}`);
  }

  return (data ?? []).map((row) => mapApartmentRow(row as ApartmentRow));
}

export async function getApartmentByIdRepo(
  id: number
): Promise<Apartment | null> {
  const { data, error } = await supabaseAdmin
    .from("apartments")
    .select("id, name, status, temperature, energy_today, mode")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load apartment: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  return mapApartmentRow(data as ApartmentRow);
}