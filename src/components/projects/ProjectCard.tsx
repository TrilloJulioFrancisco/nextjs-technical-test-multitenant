import Link from "next/link";
import { Project } from "@/domain";

interface ProjectCardProps {
  project: Project;
  tenantSlug: string;
}

export function ProjectCard({ project, tenantSlug }: ProjectCardProps) {
  const statusStyles = {
    active: "bg-green-100 text-green-800",
    archived: "bg-gray-100 text-gray-600",
  };

  return (
    <Link
      href={`/${tenantSlug}/projects/${project.id}`}
      className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">{project.name}</h3>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[project.status]}`}
        >
          {project.status}
        </span>
      </div>
    </Link>
  );
}
