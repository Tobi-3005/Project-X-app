import "server-only";
import { supabaseAdmin } from "../lib/supabase/server";
import type { SensorReading } from "../types/sensor";

type SensorReadingRow = {
  id: number;
  apartment_id: number;
  timestamp: string;
  temperature: string;
  energy_kwh: string;
  window_open: boolean;
};

function mapSensorRow(row: SensorReadingRow): SensorReading {
  return {
    id: row.id,
    apartmentId: row.apartment_id,
    timestamp: row.timestamp,
    temperature: Number(row.temperature),
    energyKwh: Number(row.energy_kwh),
    windowOpen: row.window_open,
  };
}

export async function getSensorReadingsByApartmentIdRepo(
  apartmentId: number,
  days: number = 7
): Promise<SensorReading[]> {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data, error } = await supabaseAdmin
    .from("sensor_readings")
    .select("id, apartment_id, timestamp, temperature, energy_kwh, window_open")
    .eq("apartment_id", apartmentId)
    .gte("timestamp", since.toISOString())
    .order("timestamp", { ascending: true });

  if (error) {
    throw new Error(`Failed to load sensor readings: ${error.message}`);
  }

  return (data ?? []).map((row) => mapSensorRow(row as SensorReadingRow));
}
