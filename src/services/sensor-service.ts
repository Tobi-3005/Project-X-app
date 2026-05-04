import { getSensorReadingsByApartmentIdRepo } from "../repositories/sensor-repository";

export async function getSensorReadingsByApartmentId(
  apartmentId: number,
  days: number = 7
) {
  return await getSensorReadingsByApartmentIdRepo(apartmentId, days);
}
