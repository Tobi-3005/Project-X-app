import { getApartmentById } from "../../../services/apartment-service";
import { getAlertsByApartmentId } from "../../../services/alerts-services";
import { getDevicesByApartmentId } from "../../../services/device-services";

type ApartmentDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ApartmentDetailPage({
  params,
}: ApartmentDetailPageProps) {
  const { id } = await params;
  const apartmentId = Number(id);

  const apartment = await getApartmentById(apartmentId);
  const alerts = getAlertsByApartmentId(apartmentId);
  const devices = getDevicesByApartmentId(apartmentId);

  if (!apartment) {
    return (
      <main className="min-h-screen p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900">
            Apartment not found
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">{apartment.name}</h1>
        <p className="mt-2 text-gray-600">Apartment detail overview</p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Status</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {apartment.status}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Temperature</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {apartment.temperature}°C
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Energy Today</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {apartment.energyToday} kWh
            </p>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">Devices</h2>
          <div className="mt-4 space-y-3">
            {devices.map((device) => (
              <div
                key={device.id}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <p className="font-medium text-gray-900">{device.name}</p>
                <p className="text-sm text-gray-500">Type: {device.type}</p>
                <p className="text-sm text-gray-500">
                  Online: {device.isOnline ? "Yes" : "No"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">Alerts</h2>
          <div className="mt-4 space-y-3">
            {alerts.length === 0 ? (
              <p className="text-gray-600">No alerts for this apartment.</p>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <p className="font-medium text-gray-900">{alert.title}</p>
                  <p className="text-sm text-gray-600">{alert.message}</p>
                  <p className="text-sm text-gray-500">
                    Severity: {alert.severity}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}