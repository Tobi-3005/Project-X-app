export type SensorReading = {
  id: number;
  apartmentId: number;
  deviceId: number;
  metric: string;
  value: number;
  unit: string;
  recordedAt: string;
};