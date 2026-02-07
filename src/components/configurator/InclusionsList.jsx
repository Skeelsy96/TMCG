import React, { useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { CheckCircle, PlusCircle } from "lucide-react";

const CATEGORY_LABELS = {
  appliances: "Appliances & Accessories",
  power: "Power System",
  water_waste: "Water & Waste",
  barista_kit: "Barista Kit"
};

function mapVanIdToType(vanModelId) {
  if (!vanModelId) return null;
  if (vanModelId === "Compact-Van") return "compact";
  if (vanModelId === "Large-Van") return "large";
  return "walk_in"; // "Walk-In Van"
}

export default function InclusionsList({ vanModelId }) {
  const vanType = useMemo(() => mapVanIdToType(vanModelId), [vanModelId]);

  // Seed once if empty (backend will no-op if already populated)
  useEffect(() => {
    if (!vanType) return;
    base44.functions.invoke("seedInclusions", { van_type: vanType }).catch(() => {});
  }, [vanType]);

  const { data: inclusions = [], isLoading } = useQuery({
    queryKey: ["inclusions", vanType],
    queryFn: () => vanType ? base44.entities.VanFitOutInclusionsList.filter({ van_type: vanType }, "name", 500) : [],
    enabled: !!vanType
  });

  const grouped = useMemo(() => {
    const g = { appliances: [], power: [], water_waste: [], barista_kit: [] };
    inclusions.forEach((i) => { if (g[i.category]) g[i.category].push(i); });
    return g;
  }, [inclusions]);

  const optionalExtras = [
    "Pie Warmer",
    "Blender",
    "Sandwich Press",
    "Ice Machine",
    "Additional Fridges/Freezers"
  ];

  if (!vanType) return null;

  return null;
}