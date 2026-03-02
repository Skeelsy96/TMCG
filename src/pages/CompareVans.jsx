import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import VanCompareSelector from "../components/compare/VanCompareSelector";
import CompareTable from "../components/compare/CompareTable";
import CompareFilters from "../components/compare/CompareFilters";
import VanTypeBreakdown from "../components/compare/VanTypeBreakdown";

export default function CompareVans() {
  const { data: models = [], isLoading } = useQuery({
    queryKey: ["van-models"],
    queryFn: () => base44.entities.VanModel.filter({ is_active: true }, "order", 100),
    initialData: [],
  });

  const [selectedIds, setSelectedIds] = React.useState(["", "", ""]);
  const [filters, setFilters] = React.useState({ size: "All", style: "All", price: [0, 300000] });

  const handleChange = (idx, id) => {
    setSelectedIds((prev) => {
      const next = [...prev];
      next[idx] = id;
      return next;
    });
  };

  const selectedModels = models.filter((m) => selectedIds.includes(m.id));

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <section className="bg-black py-14 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Compare <span className="text-[#FDD202]">Van Models</span>
          </h1>
          <p className="text-[#969696] max-w-2xl mx-auto">
            Select up to three models to see key differences side-by-side.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {isLoading ? (
          <div className="text-center text-[#969696]">Loading models…</div>
        ) : (
          <>
            <VanCompareSelector models={models} selectedIds={selectedIds} onChange={handleChange} />
            <CompareTable selectedModels={selectedModels} />

            <div className="text-xs text-[#666] text-center">
              Tip: You can edit comparison data anytime in the VanModel records (comparison section).
            </div>
          </>
        )}
      </div>
    </div>
  );
}