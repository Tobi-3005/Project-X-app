import { NextResponse } from "next/server";
import { getSensorReadingsByApartmentId } from "../../../../services/sensor-service";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ apartmentId: string }> }
) {
  try {
    const { apartmentId: aptIdParam } = await params;
    const apartmentId = Number(aptIdParam);
    const { searchParams } = new URL(request.url);
    const days = Number(searchParams.get("days") ?? "7");

    const readings = await getSensorReadingsByApartmentId(apartmentId, days);
    return NextResponse.json(readings);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
