export const revalidate = 0;

import Link from "next/link";
import { getApartmentById } from "../../../services/apartment-service";
import { getAlertsByApartmentId } from "../../../services/alerts-services";
import { getDevicesByApartmentId } from "../../../services/device-services";
import { getSensorReadingsByApartmentId } from "../../../services/sensor-service";
import SensorCharts from "../../../components/sensor-charts";
import type { ApartmentStatus } from "../../../types/apartment";
import type { AlertSeverity } from "../../../types/alerts";

function StatusPill({ status }: { status: ApartmentStatus }) {
  const map = {
    occupied: { cls: "bg-green-100 text-green-700", label: "Belegt" },
    empty: { cls: "bg-gray-100 text-gray-500", label: "Leer" },
    warning: { cls: "bg-orange-100 text-orange-700", label: "Warnung" },
  };
  const { cls, label } = map[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}
    >
      {label}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: AlertSeverity }) {
  const map = {
    critical: { cls: "bg-red-100 text-red-700", label: "Kritisch" },
    warning: { cls: "bg-orange-100 text-orange-700", label: "Warnung" },
    info: { cls: "bg-blue-100 text-[#185FA5]", label: "Info" },
  };
  const { cls, label } = map[severity];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${cls}`}
    >
      {label}
    </span>
  );
}

type ApartmentDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ApartmentDetailPage({
  params,
}: ApartmentDetailPageProps) {
  const { id } = await params;
  const apartmentId = Number(id);

  const [apartment, alerts, devices, readings] = await Promise.all([
    getApartmentById(apartmentId),
    getAlertsByApartmentId(apartmentId),
    getDevicesByApartmentId(apartmentId),
    getSensorReadingsByApartmentId(apartmentId),
  ]);

  if (!apartment) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Wohnung nicht gefunden
        </h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Link
        href="/apartments"
        className="text-sm text-[#185FA5] hover:underline mb-6 inline-block"
      >
        ← Zurück zu Apartments
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{apartment.name}</h1>
        <StatusPill status={apartment.status} />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            Temperatur
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {apartment.temperature}°C
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            Verbrauch heute
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {apartment.energyToday}{" "}
            <span className="text-lg font-normal text-gray-400">kWh</span>
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            Modus
          </p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {apartment.mode}
          </p>
        </div>
      </div>

      {/* Sensor Charts */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Sensor-Verlauf · 7 Tage
        </h2>
        <SensorCharts readings={readings} />
      </section>

      {/* Devices */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Geräte
        </h2>
        {devices.length === 0 ? (
          <p className="text-sm text-gray-400">Keine Geräte verbunden.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {devices.map((device) => (
              <div
                key={device.id}
                className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {device.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{device.type}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                    device.isOnline ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      device.isOnline ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                  {device.isOnline ? "Online" : "Offline"}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Alerts */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Alerts
        </h2>
        {alerts.length === 0 ? (
          <p className="text-sm text-gray-400">
            Keine Alerts für diese Wohnung.
          </p>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-4 p-5">
                <SeverityBadge severity={alert.severity} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {alert.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {alert.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
