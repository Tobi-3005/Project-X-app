import "server-only";
import { supabaseAdmin } from "../lib/supabase/server";
import type { Device } from "../types/device";

type DeviceRow = {
  id: number;
  apartment_id: number;
  name: string;
  type: Device["type"];
  is_online: boolean;
};

function mapDeviceRow(row: DeviceRow): Device {
  return {
    id: row.id,
    apartmentId: row.apartment_id,
    name: row.name,
    type: row.type,
    isOnline: row.is_online,
  };
}

export async function listDevicesRepo(): Promise<Device[]> {
  const { data, error } = await supabaseAdmin
    .from("devices")
    .select("id, apartment_id, name, type, is_online")
    .order("id", { ascending: true });

  if (error) {
    throw new Error(`Failed to load devices: ${error.message}`);
  }

  return (data ?? []).map((row) => mapDeviceRow(row as DeviceRow));
}

export async function listDevicesByApartmentIdRepo(
  apartmentId: number
): Promise<Device[]> {
  const { data, error } = await supabaseAdmin
    .from("devices")
    .select("id, apartment_id, name, type, is_online")
    .eq("apartment_id", apartmentId)
    .order("id", { ascending: true });

  if (error) {
    throw new Error(`Failed to load devices: ${error.message}`);
  }

  return (data ?? []).map((row) => mapDeviceRow(row as DeviceRow));
}
