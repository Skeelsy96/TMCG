import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getMakesForVehicleType } from './vehicleData';

export default function AdvancedFilters({ filters, onFilterChange }) {
  const availableMakes = getMakesForVehicleType(filters.Vehicle_type);

  return (
    <div className="space-y-6 p-6 bg-white rounded-2xl border border-[#969696]">
      <h3 className="font-semibold text-lg text-black">Advanced Filters</h3>

      {/* Vehicle Make */}
      {filters.Vehicle_type && availableMakes.length > 0 && (
        <div>
          <Label className="text-sm font-medium text-[#333333] mb-2 block">Vehicle Make</Label>
          <Select
            value={filters.Vehicle_Make || 'all'}
            onValueChange={(value) => onFilterChange({ Vehicle_Make: value === 'all' ? '' : value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any Make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Make</SelectItem>
              {availableMakes.map((make) => (
                <SelectItem key={make} value={make}>{make}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Year Range */}
      <div>
        <Label className="text-sm font-medium text-[#333333] mb-2 block">Year Built</Label>
        <div className="flex gap-3 items-center">
          <Input
            type="number"
            placeholder="From"
            value={filters.minYear || ''}
            onChange={(e) => onFilterChange({ minYear: e.target.value })}
          />
          <span className="text-[#969696]">-</span>
          <Input
            type="number"
            placeholder="To"
            value={filters.maxYear || ''}
            onChange={(e) => onFilterChange({ maxYear: e.target.value })}
          />
        </div>
      </div>

      {/* Kilometers Range */}
      <div>
        <Label className="text-sm font-medium text-[#333333] mb-2 block">Maximum Kilometers</Label>
        <Input
          type="number"
          placeholder="e.g., 150000"
          value={filters.maxKms || ''}
          onChange={(e) => onFilterChange({ maxKms: e.target.value })}
        />
      </div>

      {/* Power Source */}
      <div>
        <Label className="text-sm font-medium text-[#333333] mb-2 block">Power Source</Label>
        <Select
          value={filters.power_source || 'all'}
          onValueChange={(value) => onFilterChange({ power_source: value === 'all' ? '' : value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any Power Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Power Source</SelectItem>
            <SelectItem value="generator">Generator</SelectItem>
            <SelectItem value="battery">Battery</SelectItem>
            <SelectItem value="Gas/LPG">Gas/LPG</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Water Capacity */}
      <div>
        <Label className="text-sm font-medium text-[#333333] mb-2 block">Minimum Water Capacity (L)</Label>
        <Input
          type="number"
          placeholder="e.g., 80"
          value={filters.minWaterCapacity || ''}
          onChange={(e) => onFilterChange({ minWaterCapacity: e.target.value })}
        />
      </div>
    </div>
  );
}