import { resolveTenant } from "@/lib/tenant-resolver";
import { getProjectsByTenant } from "@/services";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { StatusFilter } from "@/components/projects/StatusFilter";
import { ProjectStatus } from "@/domain";

interface ProjectsPageProps {
  params: Promise<{ tenant: string }>;
  searchParams: Promise<{ status?: string }>;
}

export default async function ProjectsPage({
  params,
  searchParams,
}: ProjectsPageProps) {
  const { tenant: tenantSlug } = await params;
  const { status } = await searchParams;
  await resolveTenant(tenantSlug);

  const allProjects = await getProjectsByTenant(tenantSlug);

  const validStatuses: ProjectStatus[] = ["active", "archived"];
  const currentStatus =
    status && validStatuses.includes(status as ProjectStatus)
      ? (status as ProjectStatus)
      : "all";

  const filteredProjects =
    currentStatus === "all"
      ? allProjects
      : allProjects.filter((p) => p.status === currentStatus);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects</h2>

      <StatusFilter tenantSlug={tenantSlug} currentStatus={currentStatus} />

      {filteredProjects.length === 0 ? (
        <div className="p-10 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-500">
          No projects found for this organization.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              tenantSlug={tenantSlug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
