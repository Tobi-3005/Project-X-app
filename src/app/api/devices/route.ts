import { NextResponse } from "next/server";
import { getDevices } from "../../../services/device-services";

export async function GET() {
  try {
    const devices = await getDevices();
    return NextResponse.json(devices);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}