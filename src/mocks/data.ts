import { Tenant, Project } from "@/domain";

export const tenants: Tenant[] = [
  {
    id: "1",
    slug: "acme",
    name: "Acme Corporation",
  },
  {
    id: "2",
    slug: "umbrella",
    name: "Umbrella Inc",
  },
];

export const projects: Project[] = [
  {
    id: "p1",
    tenantId: "1",
    name: "Website Redesign",
    status: "active",
  },
  {
    id: "p2",
    tenantId: "1",
    name: "Mobile App",
    status: "active",
  },
  {
    id: "p3",
    tenantId: "1",
    name: "Legacy Migration",
    status: "archived",
  },
  {
    id: "p4",
    tenantId: "2",
    name: "Research Portal",
    status: "active",
  },
  {
    id: "p5",
    tenantId: "2",
    name: "Internal Dashboard",
    status: "archived",
  },
];
