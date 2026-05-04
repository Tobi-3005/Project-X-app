export type SensorReading = {
  id: number;
  apartmentId: number;
  timestamp: string;
  temperature: number;
  energyKwh: number;
  windowOpen: boolean;
};
