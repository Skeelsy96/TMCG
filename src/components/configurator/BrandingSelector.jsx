import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const COLOR_PRESETS = [
  { name: 'TMCG Yellow & Black', primary: '#FDD202', secondary: '#000000' },
  { name: 'Classic Red & White', primary: '#FF0000', secondary: '#FFFFFF' },
  { name: 'Modern Blue & Grey', primary: '#0066CC', secondary: '#808080' },
  { name: 'Earthy Green & Brown', primary: '#2D5016', secondary: '#8B6F47' },
  { name: 'Purple & White', primary: '#663399', secondary: '#FFFFFF' },
  { name: 'Orange & Black', primary: '#FF6600', secondary: '#000000' },
];

export default function BrandingSelector({ configuration, updateConfiguration }) {
  const branding = configuration.branding || {};

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-black mb-4">Brand Your Van</h2>
        <p className="text-[#333333] text-lg max-w-2xl mx-auto">
          Customize colors and branding to match your business identity
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Business Name */}
        <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
          <Label className="text-lg font-bold text-black mb-4 block">Business Name</Label>
          <Input
            value={branding.businessName || ''}
            onChange={(e) =>
              updateConfiguration('branding', { ...branding, businessName: e.target.value })
            }
            placeholder="Your Coffee Co."
            className="text-lg h-14"
          />
          <p className="text-sm text-[#969696] mt-2">
            This will be displayed on your van exterior
          </p>
        </div>

        {/* Color Scheme */}
        <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
          <h3 className="text-lg font-bold text-black mb-6">Color Scheme</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {COLOR_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() =>
                  updateConfiguration('branding', {
                    ...branding,
                    primaryColor: preset.primary,
                    secondaryColor: preset.secondary,
                  })
                }
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  branding.primaryColor === preset.primary &&
                  branding.secondaryColor === preset.secondary
                    ? 'border-[#FDD202] bg-[#FDD202]/10'
                    : 'border-[#DBDBDB] hover:border-[#969696]'
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className="w-12 h-12 rounded-lg border border-[#DBDBDB]"
                    style={{ backgroundColor: preset.primary }}
                  />
                  <div
                    className="w-12 h-12 rounded-lg border border-[#DBDBDB]"
                    style={{ backgroundColor: preset.secondary }}
                  />
                </div>
                <div className="font-semibold text-black">{preset.name}</div>
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="mb-2 block">Primary Color</Label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={branding.primaryColor || '#FDD202'}
                  onChange={(e) =>
                    updateConfiguration('branding', {
                      ...branding,
                      primaryColor: e.target.value,
                    })
                  }
                  className="w-20 h-12 rounded-lg border border-[#DBDBDB] cursor-pointer"
                />
                <Input
                  value={branding.primaryColor || '#FDD202'}
                  onChange={(e) =>
                    updateConfiguration('branding', {
                      ...branding,
                      primaryColor: e.target.value,
                    })
                  }
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Secondary Color</Label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={branding.secondaryColor || '#000000'}
                  onChange={(e) =>
                    updateConfiguration('branding', {
                      ...branding,
                      secondaryColor: e.target.value,
                    })
                  }
                  className="w-20 h-12 rounded-lg border border-[#DBDBDB] cursor-pointer"
                />
                <Input
                  value={branding.secondaryColor || '#000000'}
                  onChange={(e) =>
                    updateConfiguration('branding', {
                      ...branding,
                      secondaryColor: e.target.value,
                    })
                  }
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Logo Position */}
        <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
          <Label className="text-lg font-bold text-black mb-4 block">Logo & Branding Position</Label>
          <RadioGroup
            value={branding.logoPosition || 'side'}
            onValueChange={(value) =>
              updateConfiguration('branding', { ...branding, logoPosition: value })
            }
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-[#DBDBDB] hover:bg-[#F5F5F5]">
                <RadioGroupItem value="side" id="side" />
                <Label htmlFor="side" className="flex-1 cursor-pointer">
                  <div className="font-semibold text-black">Side Panel</div>
                  <div className="text-sm text-[#969696]">Large branding on van sides</div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-[#DBDBDB] hover:bg-[#F5F5F5]">
                <RadioGroupItem value="front" id="front" />
                <Label htmlFor="front" className="flex-1 cursor-pointer">
                  <div className="font-semibold text-black">Front Panel</div>
                  <div className="text-sm text-[#969696]">Prominent front display</div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-[#DBDBDB] hover:bg-[#F5F5F5]">
                <RadioGroupItem value="wrap" id="wrap" />
                <Label htmlFor="wrap" className="flex-1 cursor-pointer">
                  <div className="font-semibold text-black">Full Wrap</div>
                  <div className="text-sm text-[#969696]">Complete vehicle wrap (+$3,500)</div>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
          <h3 className="text-lg font-bold text-black mb-6">Brand Preview</h3>
          <div
            className="h-64 rounded-xl flex items-center justify-center text-4xl font-bold shadow-lg"
            style={{
              backgroundColor: branding.primaryColor || '#FDD202',
              color: branding.secondaryColor || '#000000',
            }}
          >
            {branding.businessName || 'Your Business Name'}
          </div>
        </div>
      </div>
    </div>
  );
}