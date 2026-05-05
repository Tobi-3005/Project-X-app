export const revalidate = 0;

import { getAlerts } from "../../services/alerts-services";
import type { AlertSeverity } from "../../types/alerts";

function SeverityDot({ severity }: { severity: AlertSeverity }) {
  const colors = {
    critical: "bg-red-500",
    warning: "bg-orange-400",
    info: "bg-[#185FA5]",
  };
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${colors[severity]}`}
    />
  );
}

function SeverityLabel({ severity }: { severity: AlertSeverity }) {
  const map = {
    critical: { cls: "text-red-600", label: "Kritisch" },
    warning: { cls: "text-orange-500", label: "Warnung" },
    info: { cls: "text-[#185FA5]", label: "Info" },
  };
  const { cls, label } = map[severity];
  return <span className={`text-xs font-medium ${cls}`}>{label}</span>;
}

export default async function AlertsPage() {
  const alerts = await getAlerts();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Meldungen</h1>
        <p className="mt-1 text-sm text-gray-500">
          Warnungen und Systemmeldungen
        </p>
      </div>

      {alerts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
          <p className="text-sm text-gray-400">Keine offenen Meldungen.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-4 p-5">
              <SeverityDot severity={alert.severity} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-gray-900">
                    {alert.title}
                  </p>
                  <SeverityLabel severity={alert.severity} />
                </div>
                <p className="text-sm text-gray-500">{alert.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Wohnung #{alert.apartmentId}
                </p>
              </div>
              <p className="text-xs text-gray-400 flex-shrink-0">
                {new Date(alert.createdAt).toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
