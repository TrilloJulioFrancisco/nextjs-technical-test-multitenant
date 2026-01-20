import Link from "next/link";
import { resolveTenant } from "@/lib/tenant-resolver";

interface TenantLayoutProps {
  children: React.ReactNode;
  params: Promise<{ tenant: string }>;
}

export default async function TenantLayout({
  children,
  params,
}: TenantLayoutProps) {
  const { tenant: tenantSlug } = await params;
  const tenant = await resolveTenant(tenantSlug);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">{tenant.name}</h1>
          <div className="flex gap-4">
            <Link
              href={`/${tenant.slug}/dashboard`}
              className="text-gray-600 hover:text-gray-900"
            >
              Dashboard
            </Link>
            <Link
              href={`/${tenant.slug}/projects`}
              className="text-gray-600 hover:text-gray-900"
            >
              Projects
            </Link>
          </div>
        </div>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
