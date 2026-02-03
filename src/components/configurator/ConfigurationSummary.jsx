import React from 'react';
import { Check, Coffee, Package, Palette, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ConfigurationSummary({ configuration }) {
  const calculateTotal = () => {
    let total = parseFloat(configuration.vanModel?.price.replace(/,/g, '') || 0);

    // Materials
    if (configuration.materials.benchtop === 'timber') total += 1500;
    if (configuration.materials.benchtop === 'black-granite') total += 2500;
    if (configuration.materials.cabinetry === 'timber') total += 800;
    if (configuration.materials.cabinetry === 'navy') total += 500;
    if (configuration.materials.flooring === 'timber-look') total += 400;
    if (configuration.materials.flooring === 'non-slip-checker') total += 800;

    // Branding
    if (configuration.branding.logoPosition === 'wrap') total += 3500;

    return total;
  };

  const total = calculateTotal();

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-black mb-4">Your Configuration Summary</h2>
        <p className="text-[#333333] text-lg max-w-2xl mx-auto">
          Review your custom coffee van design
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Van Model */}
        <div className="bg-white rounded-2xl p-6 border border-[#DBDBDB]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#FDD202]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Coffee className="w-6 h-6 text-[#FDD202]" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-black text-lg mb-2">Base Van</h3>
              {configuration.vanModel ? (
                <>
                  <div className="text-[#333333] mb-2">
                    {configuration.vanModel.name} - {configuration.vanModel.baseModel}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">
                      {configuration.vanModel.dimensions.width}m × {configuration.vanModel.dimensions.length}m
                    </Badge>
                    {configuration.vanModel.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline">{feature}</Badge>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-[#969696]">No van selected</div>
              )}
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-black">
                ${configuration.vanModel?.price || '0'}
              </div>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="bg-white rounded-2xl p-6 border border-[#DBDBDB]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#FDD202]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6 text-[#FDD202]" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-black text-lg mb-2">Equipment Layout</h3>
              {configuration.layout.appliances.length > 0 ? (
                <div className="space-y-1">
                  {configuration.layout.appliances.map((appliance, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[#333333]">
                      <Check className="w-4 h-4 text-green-500" />
                      {appliance.name} ({appliance.width}m × {appliance.depth}m)
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[#969696]">No equipment placed</div>
              )}
            </div>
          </div>
        </div>

        {/* Materials */}
        <div className="bg-white rounded-2xl p-6 border border-[#DBDBDB]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#FDD202]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Palette className="w-6 h-6 text-[#FDD202]" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-black text-lg mb-3">Materials & Finishes</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#333333]">Benchtop</span>
                  <span className="font-semibold text-black capitalize">
                    {configuration.materials.benchtop?.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#333333]">Cabinetry</span>
                  <span className="font-semibold text-black capitalize">
                    {configuration.materials.cabinetry}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#333333]">Flooring</span>
                  <span className="font-semibold text-black capitalize">
                    {configuration.materials.flooring?.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="bg-white rounded-2xl p-6 border border-[#DBDBDB]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#FDD202]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-[#FDD202]" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-black text-lg mb-3">Branding</h3>
              <div className="space-y-3">
                {configuration.branding.businessName && (
                  <div>
                    <div className="text-sm text-[#969696] mb-1">Business Name</div>
                    <div className="text-lg font-bold text-black">
                      {configuration.branding.businessName}
                    </div>
                  </div>
                )}
                <div className="flex gap-4">
                  <div>
                    <div className="text-sm text-[#969696] mb-2">Colour Scheme</div>
                    <div className="flex gap-2">
                      <div
                        className="w-12 h-12 rounded-lg border border-[#DBDBDB]"
                        style={{ backgroundColor: configuration.branding.primaryColor }}
                      />
                      <div
                        className="w-12 h-12 rounded-lg border border-[#DBDBDB]"
                        style={{ backgroundColor: configuration.branding.secondaryColor }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-[#969696] mb-2">Logo Position</div>
                    <Badge className="capitalize">
                      {configuration.branding.logoPosition?.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="bg-gradient-to-r from-black to-[#333333] rounded-2xl p-8">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-white/70 mb-1">Estimated Total Investment</div>
              <div className="text-xs text-white/50">Excludes GST • Final quote may vary</div>
            </div>
            <div className="text-5xl font-bold text-[#FDD202]">
              ${total.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h4 className="font-bold text-black mb-2">What Happens Next?</h4>
          <ul className="space-y-2 text-sm text-[#333333]">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-500" />
              Export your configuration or request a detailed quote
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-500" />
              Our team will review and provide accurate pricing
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-500" />
              Schedule a call to discuss your build timeline
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-500" />
              Finalise design and begin construction (8–12 weeks)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}