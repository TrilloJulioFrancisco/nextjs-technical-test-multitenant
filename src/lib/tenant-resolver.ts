import { notFound } from "next/navigation";
import { Tenant } from "@/domain";
import { getTenantBySlug } from "@/services";

export async function resolveTenant(slug: string): Promise<Tenant> {
  const tenant = await getTenantBySlug(slug);

  if (!tenant) {
    notFound();
  }

  return tenant;
}
