import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function VanCompareSelector({ models = [], selectedIds = [], onChange }) {
  const slots = [0, 1, 2];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {slots.map((idx) => (
        <div key={idx} className="bg-white border border-[#DBDBDB] rounded-xl p-4">
          <label className="block text-sm font-medium text-black mb-2">Select Model {idx + 1}</label>
          <Select
            value={selectedIds[idx] || ""}
            onValueChange={(val) => onChange(idx, val || null)}
          >
            <SelectTrigger className="bg-white border-[#DBDBDB]">
              <SelectValue placeholder="Choose a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={null}>None</SelectItem>
              {models.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}