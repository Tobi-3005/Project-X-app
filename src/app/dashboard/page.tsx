import { apartments } from "../../lib/mock-data";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Meine Ferienwohnungen
        </h1>
        <p className="mb-8 text-gray-600">
          Übersicht über Status, Temperatur und Energieverbrauch.
        </p>

        <div className="space-y-4">
          {apartments.map((apartment) => (
            <div
              key={apartment.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {apartment.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Status: {apartment.status}
                  </p>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                  {apartment.mode}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Temperatur</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {apartment.temperature}°C
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Verbrauch heute</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {apartment.energyToday} kWh
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Wohnung ID</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    #{apartment.id}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}