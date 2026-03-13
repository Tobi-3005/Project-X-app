import {
  getApartmentByIdRepo,
  listApartmentsRepo,
} from "../repositories/apartment-repository";

export async function getApartments() {
  return await listApartmentsRepo();
}

export async function getApartmentById(id: number) {
  return await getApartmentByIdRepo(id);
}