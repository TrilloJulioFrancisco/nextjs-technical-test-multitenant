"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ProjectStatus } from "@/domain";

type FilterOption = ProjectStatus | "all";

interface StatusFilterProps {
  tenantSlug: string;
  currentStatus: FilterOption;
}

export function StatusFilter({ tenantSlug, currentStatus }: StatusFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (status: FilterOption) => {
    const params = new URLSearchParams(searchParams.toString());

    if (status === "all") {
      params.delete("status");
    } else {
      params.set("status", status);
    }

    const query = params.toString();
    router.push(`/${tenantSlug}/projects${query ? `?${query}` : ""}`);
  };

  const options: { value: FilterOption; label: string }[] = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "archived", label: "Archived" },
  ];

  return (
    <div className="flex gap-2 mb-6">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleFilter(option.value)}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            currentStatus === option.value
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
