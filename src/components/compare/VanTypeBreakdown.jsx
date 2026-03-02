import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function VanTypeBreakdown() {
  const sections = [
    {
      key: "compact",
      title: "Compact Van Package — Functionality Overview",
      intro:
        "Engineered to be both exceptionally nimble and highly efficient, making them the ideal choice for a range of operational environments.",
      bullets: [
        "Corporate Precincts and Business Parks",
        "Industrial Estates and Trade Centres",
        "Sports Ovals and Event Venues",
        "Local Parks and Community Spaces",
        "Residential Back Streets and Suburbs",
      ],
    },
    {
      key: "large",
      title: "Large Van Package — Functionality Overview",
      intro:
        "The most popular choice for mobile coffee operators: highly versatile with ample room and superb efficiency across small to large events.",
      bullets: [
        "Local events (open homes, community markets)",
        "Weddings and multi‑day festivals",
        "General‑purpose catering with room for add‑ons",
        "Optional equipment (e.g., pie warmers, blenders) supported with additional batteries",
      ],
    },
    {
      key: "walk_in",
      title: "Walk‑In Van Package — Functionality Overview",
      intro:
        "Big Spaces | Big Impacts | Big Opportunities. Ideal for high‑volume service with generous storage and workspace.",
      bullets: [
        "Large events and high‑turnover catering",
        "Suitable for single operator or 2‑3 staff",
        "Service via engineered push‑out window for efficient order flow",
        "Great for premium presence and maximum capacity",
      ],
    },
  ];

  return (
    <div className="bg-white border border-[#DBDBDB] rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-black mb-4">What Each Van Type Offers</h3>
      <Accordion type="multiple" className="w-full">
        {sections.map((s) => (
          <AccordionItem key={s.key} value={s.key}>
            <AccordionTrigger className="text-left text-black">{s.title}</AccordionTrigger>
            <AccordionContent>
              <p className="text-[#333333] mb-3">{s.intro}</p>
              <ul className="list-disc ml-6 text-[#333333] space-y-1">
                {s.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}