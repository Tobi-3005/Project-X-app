import Link from "next/link";
import { getApartments } from "../../services/apartment-service";

export default async function ApartmentsPage() {
  const apartments = await getApartments();

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900">Apartments</h1>
        <p className="mt-2 text-gray-600">
          Overview of all connected vacation apartments.
        </p>

        <div className="mt-8 space-y-4">
          {apartments.map((apartment) => (
            <Link
              key={apartment.id}
              href={`/apartments/${apartment.id}`}
              className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:bg-gray-50"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {apartment.name}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Status: {apartment.status}
              </p>
              <p className="mt-2 text-sm text-gray-700">
                Temperature: {apartment.temperature}°C
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}