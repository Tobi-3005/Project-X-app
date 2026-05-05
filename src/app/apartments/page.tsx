export const revalidate = 0;

import Link from "next/link";
import { getApartments } from "../../services/apartment-service";
import type { ApartmentStatus } from "../../types/apartment";

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

export default async function ApartmentsPage() {
  const apartments = await getApartments();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Wohnungen</h1>
        <p className="mt-1 text-sm text-gray-500">
          Alle verbundenen Ferienwohnungen
        </p>
      </div>

      <div className="space-y-3">
        {apartments.map((apartment) => (
          <Link
            key={apartment.id}
            href={`/apartments/${apartment.id}`}
            className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-[#185FA5]/40 hover:shadow-sm transition-all"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {apartment.name}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Modus: {apartment.mode}
              </p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-xs text-gray-400">Temperatur</p>
                <p className="text-sm font-medium text-gray-700">
                  {apartment.temperature}°C
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Verbrauch</p>
                <p className="text-sm font-medium text-gray-700">
                  {apartment.energyToday} kWh
                </p>
              </div>
              <StatusPill status={apartment.status} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
