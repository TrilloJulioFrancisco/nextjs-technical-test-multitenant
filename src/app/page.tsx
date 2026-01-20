import Link from "next/link";
import { getAllTenants } from "@/services";

export default async function HomePage() {
  const tenants = await getAllTenants();

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Multi-tenant Dashboard
        </h1>
        <p className="text-gray-500 mb-6">Select an organization to continue</p>

        <div className="space-y-3">
          {tenants.map((tenant) => (
            <Link
              key={tenant.id}
              href={`/${tenant.slug}/dashboard`}
              className="block w-full p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-900">{tenant.name}</span>
              <span className="text-gray-400 text-sm ml-2">/{tenant.slug}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
