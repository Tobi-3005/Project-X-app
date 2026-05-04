import {
  listAlertsRepo,
  listAlertsByApartmentIdRepo,
} from "../repositories/alert-repository";

export async function getAlerts() {
  return await listAlertsRepo();
}

export async function getAlertsByApartmentId(apartmentId: number) {
  return await listAlertsByApartmentIdRepo(apartmentId);
}