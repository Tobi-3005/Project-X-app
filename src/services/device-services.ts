import {
  listDevicesRepo,
  listDevicesByApartmentIdRepo,
} from "../repositories/device-repository";

export async function getDevices() {
  return await listDevicesRepo();
}

export async function getDevicesByApartmentId(apartmentId: number) {
  return await listDevicesByApartmentIdRepo(apartmentId);
}