import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const SIZE_OPTIONS = [
  { label: "All Sizes", value: "All" },
  { label: "Compact", value: "compact" },
  { label: "Large", value: "large" },
  { label: "Walk-In", value: "walk_in" },
];

const STYLE_OPTIONS = [
  { label: "All Styles", value: "All" },
  { label: "Serve-from-Rear", value: "serve_from_rear" },
  { label: "Walk-In", value: "walk_in" },
  { label: "SUV/Ute", value: "suv_ute" },
  { label: "Other", value: "other" },
];

function formatAud(n) {
  try { return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n); } catch { return `$${n}`; }
}

export default function CompareFilters({ filters, onChange, minPrice = 0, maxPrice = 300000, onClear }) {
  const [localPrice, setLocalPrice] = React.useState(filters.price || [minPrice, maxPrice]);

  React.useEffect(() => {
    setLocalPrice([
      Math.max(minPrice, filters.price?.[0] ?? minPrice),
      Math.min(maxPrice, filters.price?.[1] ?? maxPrice),
    ]);
  }, [minPrice, maxPrice]);

  return (
    <div className="bg-white border border-[#DBDBDB] rounded-2xl p-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-black mb-2">Van Size</label>
          <Select value={filters.size} onValueChange={(v) => onChange({ ...filters, size: v })}>
            <SelectTrigger className="bg-white border-[#DBDBDB]">
              <SelectValue placeholder="All Sizes" />
            </SelectTrigger>
            <SelectContent>
              {SIZE_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">Fit-out Style</label>
          <Select value={filters.style} onValueChange={(v) => onChange({ ...filters, style: v })}>
            <SelectTrigger className="bg-white border-[#DBDBDB]">
              <SelectValue placeholder="All Styles" />
            </SelectTrigger>
            <SelectContent>
              {STYLE_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">Pricing Range</label>
          <div className="px-1 py-1">
            <Slider
              min={minPrice}
              max={maxPrice}
              step={1000}
              value={localPrice}
              onValueChange={(v) => setLocalPrice(v)}
              onValueCommit={(v) => onChange({ ...filters, price: v })}
            />
            <div className="mt-2 text-xs text-[#666] flex justify-between">
              <span>{formatAud(localPrice[0])}</span>
              <span>{formatAud(localPrice[1])}</span>
            </div>
          </div>
        </div>
      </div>

      {onClear && (
        <div className="flex justify-end mt-4">
          <button
            onClick={onClear}
            className="text-sm px-4 py-2 border border-[#DBDBDB] rounded-lg hover:bg-[#F5F5F5]"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}