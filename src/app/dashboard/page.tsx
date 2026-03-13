import { getApartments } from "../../services/apartment-service";

export default async function DashboardPage() {
  const apartments = await getApartments();

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Portfolio overview of your vacation rentals.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Apartments</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {apartments.length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Occupied</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {apartments.filter((a) => a.status === "occupied").length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Warnings</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {apartments.filter((a) => a.status === "warning").length}
            </p>
          </div>
        </div>

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
                  <p className="text-sm text-gray-500">Temperature</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {apartment.temperature}°C
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Energy Today</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {apartment.energyToday} kWh
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Apartment ID</p>
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
