import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, DollarSign, Settings, Ruler } from "lucide-react";

function currencyAud(n) {
  if (typeof n !== "number") return "—";
  try {
    return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);
  } catch {
    return `$${n}`;
  }
}

export default function CompareTable({ selectedModels = [] }) {
  const cols = selectedModels.length;

  if (cols === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-[#DBDBDB]">
        <p className="text-[#969696] text-lg">Select up to 3 models to compare.</p>
      </div>
    );
  }

  const gridStyle = { gridTemplateColumns: `1.2fr repeat(${cols}, 1fr)` };

  const Row = ({ label, icon: Icon, children }) => (
    <div className="contents">
      <div className="p-4 bg-[#F5F5F5] border border-[#DBDBDB] flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-[#FDD202]" />}
        <span className="font-medium text-black">{label}</span>
      </div>
      {children}
    </div>
  );

  const HeaderCell = ({ m }) => (
    <div className="p-4 bg-white border border-[#DBDBDB]">
      <div className="flex items-center justify-between gap-2 mb-1">
        <h3 className="font-semibold text-black leading-snug">{m.name}</h3>
        <Badge className="bg-[#FDD202] text-black">{(m.package_type || "").replace("_", " ")}</Badge>
      </div>
      {m.image_url && (
        <img src={m.image_url} alt={m.name} className="mt-2 h-24 w-full object-cover rounded-md" />
      )}
    </div>
  );

  const Cell = ({ children }) => (
    <div className="p-4 bg-white border border-[#DBDBDB] align-top">{children}</div>
  );

  return (
    <div className="overflow-x-auto">
      <div className="grid" style={gridStyle}>
        {/* Header */}
        <div className="p-4 bg-[#F5F5F5] border border-[#DBDBDB] font-medium text-black">Model</div>
        {selectedModels.map((m) => (
          <HeaderCell key={m.id} m={m} />
        ))}

        {/* Size */}
        <Row label="Van Size" icon={Ruler}>
          {selectedModels.map((m) => (
            <Cell key={m.id + "-size"}>
              {m.comparison?.size || (m.package_type || "—").replace("_", " ")}
            </Cell>
          ))}
        </Row>

        {/* Specifications */}
        <Row label="Specifications" icon={Settings}>
          {selectedModels.map((m) => (
            <Cell key={m.id + "-specs"}>
              {(m.comparison?.specifications || []).length ? (
                <ul className="space-y-1 text-sm text-[#333333]">
                  {(m.comparison.specifications || []).slice(0, 8).map((s, i) => (
                    <li key={i} className="flex justify-between gap-3">
                      <span className="text-[#666]">{s.label}</span>
                      <span className="font-medium text-black">{s.value}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-[#969696]">—</span>
              )}
            </Cell>
          ))}
        </Row>

        {/* Features */}
        <Row label="Features" icon={CheckCircle2}>
          {selectedModels.map((m) => (
            <Cell key={m.id + "-features"}>
              {(m.comparison?.features || []).length ? (
                <ul className="list-disc ml-5 space-y-1 text-sm text-[#333333]">
                  {(m.comparison.features || []).slice(0, 8).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              ) : (
                <span className="text-[#969696]">—</span>
              )}
            </Cell>
          ))}
        </Row>

        {/* Pricing */}
        <Row label="Pricing" icon={DollarSign}>
          {selectedModels.map((m) => (
            <Cell key={m.id + "-pricing"}>
              {m.comparison?.pricing?.base_from_aud ? (
                <div>
                  <div className="text-black font-semibold">{currencyAud(m.comparison.pricing.base_from_aud)}</div>
                  {m.comparison.pricing.notes && (
                    <div className="text-xs text-[#666] mt-1">{m.comparison.pricing.notes}</div>
                  )}
                </div>
              ) : (
                <span className="text-[#969696]">—</span>
              )}
            </Cell>
          ))}
        </Row>
      </div>
    </div>
  );
}