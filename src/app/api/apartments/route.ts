import { NextResponse } from "next/server";
import { getApartments } from "../../../services/apartment-service";

export async function GET() {
  try {
    const apartments = await getApartments();
    return NextResponse.json(apartments);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}