export type DeviceType =
  | "thermostat"
  | "window-sensor"
  | "smart-plug"
  | "temperature-sensor"
  | "gateway"
  | "power-meter";

export type Device = {
  id: number;
  apartmentId: number;
  name: string;
  type: DeviceType;
  isOnline: boolean;
};