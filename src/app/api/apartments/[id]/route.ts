import { NextResponse } from "next/server";
import { getApartmentById } from "../../../../services/apartment-service";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const apartmentId = Number(params.id);
    const apartment = await getApartmentById(apartmentId);

    if (!apartment) {
      return NextResponse.json(
        { error: "Apartment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(apartment);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}