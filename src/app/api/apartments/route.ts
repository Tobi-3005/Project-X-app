import { NextResponse } from "next/server";
import { getApartments } from "../../../services/apartment-service";

export async function GET() {
  const apartments = getApartments();

  return NextResponse.json(apartments);
}