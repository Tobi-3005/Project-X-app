export type AlertSeverity = "info" | "warning" | "critical";

export type Alert = {
  id: number;
  apartmentId: number;
  title: string;
  message: string;
  severity: AlertSeverity;
  createdAt: string;
  isResolved: boolean;
};