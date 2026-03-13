import { NextResponse } from "next/server";
import { getApartmentById } from "../../../../services/apartment-service";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const apartmentId = Number(id);
  const apartment = getApartmentById(apartmentId);

  if (!apartment) {
    return NextResponse.json(
      { error: "Apartment not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(apartment);
}