import { devices } from "../data/demo";

export function getDevices() {
  return devices;
}

export function getDevicesByApartmentId(apartmentId: number) {
  return devices.filter((device) => device.apartmentId === apartmentId);
}