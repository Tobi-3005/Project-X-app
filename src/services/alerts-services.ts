import { alerts } from "../data/demo";

export function getAlerts() {
  return alerts;
}

export function getAlertsByApartmentId(apartmentId: number) {
  return alerts.filter((alert) => alert.apartmentId === apartmentId);
}