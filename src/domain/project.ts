export type ProjectStatus = "active" | "archived";

export interface Project {
  id: string;
  tenantId: string;
  name: string;
  status: ProjectStatus;
}
