import { resolveTenant } from "@/lib/tenant-resolver";
import { getProjectsByTenant } from "@/services";
import { StatCard } from "@/components/ui/StatCard";

interface DashboardPageProps {
  params: Promise<{ tenant: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { tenant: tenantSlug } = await params;
  const tenant = await resolveTenant(tenantSlug);
  const projects = await getProjectsByTenant(tenantSlug);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Dashboard - {tenant.name}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Projects" value={projects.length} />
        <StatCard
          title="Active Projects"
          value={projects.filter((p) => p.status === "active").length}
        />
        <StatCard
          title="Archived Projects"
          value={projects.filter((p) => p.status === "archived").length}
        />
      </div>
    </div>
  );
}
