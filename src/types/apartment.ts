export type ApartmentStatus = "occupied" | "empty" | "warning";

export type ApartmentMode = "Comfort" | "Eco" | "Warning";

export type Apartment = {
  id: number;
  name: string;
  status: ApartmentStatus;
  temperature: number;
  energyToday: number;
  mode: ApartmentMode;
};