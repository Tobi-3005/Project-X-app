import { NextResponse } from "next/server";
import { getDevices } from "../../../services/device-services";

export async function GET() {
  const devices = getDevices();

  return NextResponse.json(devices);
}