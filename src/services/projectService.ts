import { Project } from "@/domain";
import { projects, tenants } from "@/mocks/data";

export async function getProjectsByTenant(
  tenantSlug: string,
): Promise<Project[]> {
  const tenant = tenants.find((t) => t.slug === tenantSlug);
  if (!tenant) return [];

  return projects.filter((p) => p.tenantId === tenant.id);
}

export async function getProjectById(
  projectId: string,
  tenantSlug: string,
): Promise<Project | null> {
  const tenant = tenants.find((t) => t.slug === tenantSlug);
  if (!tenant) return null;

  const project = projects.find((p) => p.id === projectId);
  if (!project || project.tenantId !== tenant.id) return null;

  return project;
}
