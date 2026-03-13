import { NextResponse } from "next/server";
import { getAlerts } from "../../../services/alerts-services";

export async function GET() {
  const alerts = getAlerts();

  return NextResponse.json(alerts);
}