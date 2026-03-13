import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Project X</h1>
          <p className="text-sm text-gray-500">
            Smart Energy for Vacation Rentals
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link href="/dashboard" className="hover:text-black">
            Dashboard
          </Link>
          <Link href="/apartments" className="hover:text-black">
            Apartments
          </Link>
          <Link href="/alerts" className="hover:text-black">
            Alerts
          </Link>
          <Link href="/settings" className="hover:text-black">
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}
