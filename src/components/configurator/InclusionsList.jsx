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

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#DBDBDB]">
      <h2 className="text-2xl font-bold text-black mb-6">Package Details</h2>

      {isLoading ? (
        <p className="text-[#969696]">Loading inclusions…</p>
      ) : inclusions.length === 0 ? (
        <p className="text-[#969696]">Inclusions are being prepared. Please check back shortly.</p>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([key, items]) => (
            <div key={key}>
              <h3 className="text-lg font-bold text-black mb-3">{CATEGORY_LABELS[key]}</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#FDD202] flex-shrink-0 mt-0.5" />
                    <span className="text-[#333333]">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 pt-6 border-t border-[#DBDBDB]">
        <h3 className="text-xl font-semibold text-black mb-3 flex items-center gap-2">
          <PlusCircle className="w-5 h-5" /> Optional Extras Available
        </h3>
        <ul className="grid sm:grid-cols-2 gap-2 text-[#333333]">
          {optionalExtras.map((x) => (
            <li key={x} className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-[#FDD202] rounded-full" /> {x}
            </li>
          ))}
        </ul>
        <p className="text-xs text-[#969696] mt-3">Note: Some extras increase power consumption and may require additional batteries.</p>
      </div>
    </div>
  );
}