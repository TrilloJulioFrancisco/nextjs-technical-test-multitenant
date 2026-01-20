import { Tenant } from "@/domain";
import { tenants } from "@/mocks/data";

export async function getTenantBySlug(slug: string): Promise<Tenant | null> {
  return tenants.find((t) => t.slug === slug) ?? null;
}
