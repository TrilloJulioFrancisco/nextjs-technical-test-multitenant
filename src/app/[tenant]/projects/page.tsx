import { resolveTenant } from "@/lib/tenant-resolver";
import { getProjectsByTenant } from "@/services";
import { ProjectCard } from "@/components/projects/ProjectCard";

interface ProjectsPageProps {
  params: Promise<{ tenant: string }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { tenant: tenantSlug } = await params;
  await resolveTenant(tenantSlug);
  const projects = await getProjectsByTenant(tenantSlug);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects</h2>

      {projects.length === 0 ? (
        <div className="p-10 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-500">
          No projects found for this organization.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
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
