import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Coffee, Zap, Droplets, Box, Plus, Trash2, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AVAILABLE_APPLIANCES = [
  { id: 'espresso', name: 'Espresso Machine', icon: Coffee, width: 0.6, depth: 0.5, color: '#8B4513' },
  { id: 'grinder', name: 'Grinder', icon: Coffee, width: 0.3, depth: 0.4, color: '#696969' },
  { id: 'fridge', name: 'Refrigerator', icon: Box, width: 0.6, depth: 0.6, color: '#C0C0C0' },
  { id: 'sink', name: 'Sink', icon: Droplets, width: 0.5, depth: 0.5, color: '#4682B4' },
  { id: 'water-tank', name: 'Water Tank', icon: Droplets, width: 0.4, depth: 0.4, color: '#1E90FF' },
  { id: 'power-system', name: 'Power System', icon: Zap, width: 0.5, depth: 0.3, color: '#FFD700' },
];

export default function LayoutConfigurator({ configuration, updateConfiguration }) {
  const [placedAppliances, setPlacedAppliances] = useState(
    configuration.layout.appliances || []
  );

  const vanDimensions = configuration.vanModel?.dimensions || { width: 2.0, length: 4.0 };
  const scale = 80; // pixels per meter

  const addAppliance = (appliance) => {
    const newAppliance = {
      ...appliance,
      instanceId: `${appliance.id}-${Date.now()}`,
      x: 0.2,
      y: 0.2,
    };
    const updated = [...placedAppliances, newAppliance];
    setPlacedAppliances(updated);
    updateConfiguration('layout', {
      appliances: updated,
      dimensions: vanDimensions,
    });
  };

  const removeAppliance = (instanceId) => {
    const updated = placedAppliances.filter(a => a.instanceId !== instanceId);
    setPlacedAppliances(updated);
    updateConfiguration('layout', {
      appliances: updated,
      dimensions: vanDimensions,
    });
  };

  const moveAppliance = (instanceId, direction) => {
    const step = 0.1;
    const updated = placedAppliances.map(appliance => {
      if (appliance.instanceId === instanceId) {
        let newX = appliance.x;
        let newY = appliance.y;

        switch (direction) {
          case 'up': newY = Math.max(0, appliance.y - step); break;
          case 'down': newY = Math.min(vanDimensions.length - appliance.depth, appliance.y + step); break;
          case 'left': newX = Math.max(0, appliance.x - step); break;
          case 'right': newX = Math.min(vanDimensions.width - appliance.width, appliance.x + step); break;
        }

        return { ...appliance, x: newX, y: newY };
      }
      return appliance;
    });

    setPlacedAppliances(updated);
    updateConfiguration('layout', {
      appliances: updated,
      dimensions: vanDimensions,
    });
  };

  if (!configuration.vanModel) {
    return (
      <div className="text-center py-12">
        <p className="text-[#969696] text-lg">Please select a van first</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-black mb-4">Design Your Layout</h2>
        <p className="text-[#333333] text-lg max-w-2xl mx-auto">
          Add appliances to your van and position them
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Appliances Palette */}
        <div className="bg-white rounded-2xl p-6 border border-[#DBDBDB]">
          <h3 className="font-bold text-black mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#FDD202]" />
            Available Equipment
          </h3>
          <div className="space-y-3">
            {AVAILABLE_APPLIANCES.map((appliance) => (
              <button
                key={appliance.id}
                onClick={() => addAppliance(appliance)}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-[#DBDBDB] hover:border-[#FDD202] hover:bg-[#FDD202]/5 transition-all"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: appliance.color + '20' }}
                >
                  <appliance.icon className="w-5 h-5" style={{ color: appliance.color }} />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-sm text-black">{appliance.name}</div>
                  <div className="text-xs text-[#969696]">
                    {appliance.width}m × {appliance.depth}m
                  </div>
                </div>
                <Plus className="w-5 h-5 text-[#969696]" />
              </button>
            ))}
          </div>
        </div>

        {/* Van Layout Canvas */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#DBDBDB]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-black">
              Van Interior ({vanDimensions.width}m × {vanDimensions.length}m)
            </h3>
            <div className="text-sm text-[#969696]">
              {placedAppliances.length} items placed
            </div>
          </div>

          <div className="bg-[#F5F5F5] rounded-xl p-4 overflow-auto">
            <div
              className="relative bg-white border-2 border-dashed border-[#969696] rounded-lg mx-auto"
              style={{
                width: vanDimensions.width * scale,
                height: vanDimensions.length * scale,
              }}
            >
              {/* Grid overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: `
                  linear-gradient(to right, #DBDBDB 1px, transparent 1px),
                  linear-gradient(to bottom, #DBDBDB 1px, transparent 1px)
                `,
                backgroundSize: `${scale}px ${scale}px`,
              }} />

              {/* Placed Appliances */}
              {placedAppliances.map((appliance) => (
                <div
                  key={appliance.instanceId}
                  className="absolute group"
                  style={{
                    left: appliance.x * scale,
                    top: appliance.y * scale,
                    width: appliance.width * scale,
                    height: appliance.depth * scale,
                  }}
                >
                  <div
                    className="w-full h-full rounded-lg border-2 border-black flex flex-col items-center justify-center relative shadow-lg"
                    style={{ backgroundColor: appliance.color }}
                  >
                    <appliance.icon className="w-6 h-6 text-white mb-1" />
                    <div className="text-xs font-bold text-white text-center px-1">
                      {appliance.name}
                    </div>

                    {/* Controls */}
                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => removeAppliance(appliance.instanceId)}
                        className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <Trash2 className="w-3 h-3 text-white" />
                      </button>
                    </div>

                    {/* Movement controls */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => moveAppliance(appliance.instanceId, 'up')}
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#FDD202]"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveAppliance(appliance.instanceId, 'down')}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#FDD202]"
                      >
                        ▼
                      </button>
                      <button
                        onClick={() => moveAppliance(appliance.instanceId, 'left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#FDD202]"
                      >
                        ◀
                      </button>
                      <button
                        onClick={() => moveAppliance(appliance.instanceId, 'right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#FDD202]"
                      >
                        ▶
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 text-sm text-[#969696] text-center">
            Click appliances to see movement controls • Hover to delete
          </div>
        </div>
      </div>
    </div>
  );
}