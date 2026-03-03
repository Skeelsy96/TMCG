import React, { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Coffee, Zap, Droplets, Box, Plus, Trash2, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AVAILABLE_APPLIANCES = [
  { id: 'espresso', name: 'Espresso Machine', icon: Coffee, width: 0.6, depth: 0.5, color: '#8B4513' },
  { id: 'grinder', name: 'Grinder', icon: Coffee, width: 0.3, depth: 0.4, color: '#696969' },
  { id: 'fridge', name: 'Refrigerator', icon: Box, width: 0.6, depth: 0.6, color: '#C0C0C0' },
  { id: 'sink', name: 'Sink', icon: Droplets, width: 0.5, depth: 0.5, color: '#4682B4' },
  { id: 'water-tank', name: 'Water Tank', icon: Droplets, width: 0.4, depth: 0.4, color: '#1E90FF' },
  { id: 'power-system', name: 'Power System', icon: Zap, width: 0.5, depth: 0.3, color: '#FFD700' },
];

// Allowed layouts by fit-out style
const ALLOWED_LAYOUTS_MAP = {
  serve_from_rear: ['rear_bar', 'side_service'],
  walk_in: ['walk_in_galley_left', 'walk_in_galley_right', 'u_shape'],
  suv_ute: ['tray_service', 'pop_up_bar'],
  other: ['rear_bar', 'side_service']
};

// Helpers to read numeric specs (expect mm for dimensions)
function buildSpecMap(specs = []) { const map = {}; specs.forEach(s => { if (s?.key) map[s.key] = s; }); return map; }
function mmToM(v) { return typeof v === 'number' ? v / 1000 : undefined; }

export default function LayoutConfigurator({ configuration, updateConfiguration }) {
  const [placedAppliances, setPlacedAppliances] = useState(
    configuration.layout.appliances || []
  );

  const specMap = buildSpecMap(configuration.vanModel?.comparison?.specifications);
  const widthM = mmToM(specMap?.interior_width_mm?.numeric_value);
  const lengthM = mmToM(specMap?.interior_length_mm?.numeric_value);
  const vanDimensions = {
    width: widthM || 2.0,
    length: lengthM || 4.0,
  };
  const scale = 80; // pixels per meter

  const containerRef = useRef(null);
  const draggingRef = useRef({ id: null, offsetX: 0, offsetY: 0 });
  const snapTo = 0.05; // metres
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  const onMouseDownAppliance = (e, appliance) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / scale;
    const mouseY = (e.clientY - rect.top) / scale;
    draggingRef.current = {
      id: appliance.instanceId,
      offsetX: mouseX - appliance.x,
      offsetY: mouseY - appliance.y,
    };
  };

  const onMouseMoveCanvas = (e) => {
    if (!draggingRef.current.id || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let x = (e.clientX - rect.left) / scale - draggingRef.current.offsetX;
    let y = (e.clientY - rect.top) / scale - draggingRef.current.offsetY;

    // Find dragged appliance to clamp within bounds
    const idx = placedAppliances.findIndex(a => a.instanceId === draggingRef.current.id);
    if (idx === -1) return;
    const a = placedAppliances[idx];

    x = clamp(x, 0, Math.max(0, vanDimensions.width - a.width));
    y = clamp(y, 0, Math.max(0, vanDimensions.length - a.depth));

    // Snap to grid
    x = Math.round(x / snapTo) * snapTo;
    y = Math.round(y / snapTo) * snapTo;

    const updated = placedAppliances.map(ap => ap.instanceId === a.instanceId ? { ...ap, x, y } : ap);
    setPlacedAppliances(updated);
    updateConfiguration('layout', { appliances: updated, dimensions: vanDimensions });
  };

  const endDrag = () => {
    draggingRef.current.id = null;
  };

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

  // Ensure a default layout type allowed by current fit_out_style
  const allowedLayouts = ALLOWED_LAYOUTS_MAP[configuration.vanModel?.fit_out_style || 'other'] || ALLOWED_LAYOUTS_MAP.other;
  if (!configuration.layout?.type || !allowedLayouts.includes(configuration.layout.type)) {
    // Set default without causing render loops (only when mismatch)
    if (configuration.layout?.type !== allowedLayouts[0]) {
      updateConfiguration('layout', { type: allowedLayouts[0] });
    }
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-black mb-4">Design Your Layout</h2>
        <p className="text-[#333333] text-lg max-w-2xl mx-auto">
          Add appliances to your van and position them
        </p>
      </div>

      {/* Layout Type Selector */}
      <div className="bg-white rounded-2xl p-6 border border-[#DBDBDB] mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="font-semibold text-black">Layout Type</div>
          <Select value={configuration.layout?.type || allowedLayouts[0]} onValueChange={(v) => updateConfiguration('layout', { type: v })}>
            <SelectTrigger className="w-full md:w-72 bg-white border-[#DBDBDB]">
              <SelectValue placeholder="Select layout" />
            </SelectTrigger>
            <SelectContent>
              {allowedLayouts.map((l) => (
                <SelectItem key={l} value={l}>{l.replaceAll('_', ' ')}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="text-xs text-[#666]">Allowed for: {(configuration.vanModel?.fit_out_style || 'other').replaceAll('_',' ')}</div>
        </div>
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
              ref={containerRef}
              onMouseMove={onMouseMoveCanvas}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
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
                  className="absolute group cursor-move"
                  style={{
                    left: appliance.x * scale,
                    top: appliance.y * scale,
                    width: appliance.width * scale,
                    height: appliance.depth * scale,
                  }}
                  onMouseDown={(e) => onMouseDownAppliance(e, appliance)}
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

                    {/* Drag to move - controls removed per UX update */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 text-sm text-[#969696] text-center">
            Drag and drop items to reposition • Click the red dot to remove
          </div>
        </div>
      </div>
    </div>
  );
}