import { apartments } from "../data/demo";

export function getApartments() {
  return apartments;
}

export function getApartmentById(id: number) {
  return apartments.find((apartment) => apartment.id === id);
}