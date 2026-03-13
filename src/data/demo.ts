import type { Apartment } from "../types/apartment";
import type { Alert } from "../types/alerts";
import type { Device } from "../types/device";

export const apartments: Apartment[] = [
  {
    id: 1,
    name: "Binz – Strandstraße",
    status: "occupied",
    temperature: 21,
    energyToday: 3.2,
    mode: "Comfort",
  },
  {
    id: 2,
    name: "Sellin – Villa Ostsee",
    status: "empty",
    temperature: 17,
    energyToday: 1.4,
    mode: "Eco",
  },
  {
    id: 3,
    name: "Göhren – Apartment 12",
    status: "warning",
    temperature: 18,
    energyToday: 4.8,
    mode: "Warning",
  },
];

export const alerts: Alert[] = [
  {
    id: 1,
    apartmentId: 3,
    title: "Open window detected",
    message: "A window appears to be open while heating is active.",
    severity: "warning",
    createdAt: "2026-03-14T09:30:00Z",
    isResolved: false,
  },
  {
    id: 2,
    apartmentId: 1,
    title: "High energy consumption",
    message: "Energy usage is above the normal daily range.",
    severity: "critical",
    createdAt: "2026-03-14T08:10:00Z",
    isResolved: false,
  },
];

export const devices: Device[] = [
  {
    id: 1,
    apartmentId: 1,
    name: "Living Room Thermostat",
    type: "thermostat",
    isOnline: true,
  },
  {
    id: 2,
    apartmentId: 1,
    name: "Window Sensor",
    type: "window-sensor",
    isOnline: true,
  },
  {
    id: 3,
    apartmentId: 2,
    name: "Smart Plug Boiler",
    type: "smart-plug",
    isOnline: true,
  },
];