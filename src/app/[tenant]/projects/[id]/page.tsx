import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectById } from "@/services";

interface ProjectDetailPageProps {
  params: Promise<{ tenant: string; id: string }>;
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { tenant: tenantSlug, id: projectId } = await params;
  const project = await getProjectById(projectId, tenantSlug);

  if (!project) {
    notFound();
  }

  const statusStyles = {
    active: "bg-green-100 text-green-800",
    archived: "bg-gray-100 text-gray-600",
  };

  return (
    <div>
      <Link
        href={`/${tenantSlug}/projects`}
        className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block"
      >
        ← Back to Projects
      </Link>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${statusStyles[project.status]}`}
          >
            {project.status}
          </span>
        </div>

        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-gray-500">Project ID</dt>
            <dd className="font-medium text-gray-900">{project.id}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Status</dt>
            <dd className="font-medium text-gray-900 capitalize">
              {project.status}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
