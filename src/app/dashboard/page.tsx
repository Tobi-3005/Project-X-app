import { getApartments } from "../../services/apartment-service";
import { getAlerts } from "../../services/alerts-services";
import type { ApartmentStatus } from "../../types/apartment";
import type { AlertSeverity } from "../../types/alerts";

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

function SeverityDot({ severity }: { severity: AlertSeverity }) {
  const colors = {
    critical: "bg-red-500",
    warning: "bg-orange-400",
    info: "bg-[#185FA5]",
  };
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full flex-shrink-0 mt-1 ${colors[severity]}`}
    />
  );
}

export default async function DashboardPage() {
  const [apartments, alerts] = await Promise.all([
    getApartments(),
    getAlerts(),
  ]);

  const occupied = apartments.filter((a) => a.status === "occupied").length;
  const warnings = apartments.filter((a) => a.status === "warning").length;
  const totalEnergy = apartments.reduce((sum, a) => sum + a.energyToday, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Übersicht deines Ferienwohnungsportfolios
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 mb-10 md:grid-cols-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            Wohnungen
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {apartments.length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            Belegt
          </p>
          <p className="mt-2 text-3xl font-bold text-green-600">{occupied}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            Warnungen
          </p>
          <p className="mt-2 text-3xl font-bold text-orange-500">{warnings}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            Verbrauch heute
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {totalEnergy.toFixed(1)}{" "}
            <span className="text-lg font-normal text-gray-400">kWh</span>
          </p>
        </div>
      </div>

      {/* Apartments grid */}
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
        Wohnungen
      </h2>
      <div className="grid grid-cols-1 gap-4 mb-10 md:grid-cols-3">
        {apartments.map((apartment) => (
          <div
            key={apartment.id}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                {apartment.name}
              </h3>
              <StatusPill status={apartment.status} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Temperatur</span>
                <span className="font-medium text-gray-700">
                  {apartment.temperature}°C
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Verbrauch</span>
                <span className="font-medium text-gray-700">
                  {apartment.energyToday} kWh
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Modus</span>
                <span className="font-medium text-gray-700">
                  {apartment.mode}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
        Aktuelle Alerts
      </h2>
      {alerts.length === 0 ? (
        <p className="text-sm text-gray-400">Keine offenen Alerts.</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 p-4">
              <SeverityDot severity={alert.severity} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {alert.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{alert.message}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                Apt. #{alert.apartmentId}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
