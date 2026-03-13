import { getAlerts } from "../../services/alerts-services";

export default function AlertsPage() {
  const alerts = getAlerts();

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900">Alerts</h1>
        <p className="mt-2 text-gray-600">
          Important warnings and system notifications.
        </p>

        <div className="mt-8 space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {alert.title}
              </h2>
              <p className="mt-1 text-gray-600">{alert.message}</p>
              <p className="mt-2 text-sm text-gray-500">
                Severity: {alert.severity}
              </p>
              <p className="text-sm text-gray-500">
                Apartment ID: {alert.apartmentId}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}