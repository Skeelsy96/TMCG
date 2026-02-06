// Vehicle data for Coffee Van Classifieds

export const VEHICLE_MAKES = [
  'LDV', 'Ford', 'Chevrolet', 'Chrysler', 'Dodge', 'GAZ', 'Hyundai', 'Isuzu', 
  'Force Motors', 'Renault', 'Citroën', 'Peugeot', 'Fiat', 'Toyota', 'Volkswagen', 
  'Holden', 'Mazda', 'Mitsubishi', 'Nissan', 'GWM', 'JAC', 'KGM (SsangYong)', 'Kia', 
  'BYD', 'Chery', 'Foton', 'Ram', 'Mercedes-Benz', 'Hino', 'Fuso', 'Iveco', 'Volvo', 
  'Scania', 'Kenworth', 'Mack', 'DAF', 'MAN', 'UD Trucks', 'Renault Trucks', 
  'Felix Trailers', 'Bockman Trailers', 'Sureweld', 'Austral Trailers', 
  'Belco Trailers', 'Humpback Trailers', 'Sunshine Trailers'
];

export const VEHICLE_TYPES = {
  'Trailer': ['Single-axel Box Trailer', 'Dual-axel Box Trailer', 'Large "walk-in" Trailer'],
  'Van': ['Compact Van', 'Large (serve-from-rear) Van', 'Walk-In Van', 'Custom/Vintage Van'],
  'Truck': [],
  'Ute': [],
  'SUV': [],
  'Cart': []
};

export const VEHICLE_MODELS = {
  'LDV': {
    van: ['G10', 'G10+', 'V80', 'EV80', 'Deliver 7', 'Deliver 9', 'Deliver 9 Cab Chassis', 'Deliver 9 Bus', 'eDeliver 3', 'eDeliver 7', 'eDeliver 9'],
    ute: ['T60', 'T60 Max'],
    suv: ['D90']
  },
  'Ford': {
    van: ['Transit', 'Transit Custom', 'Transit Courier', 'Transit Connect', 'E-Transit', 'E-Transit Custom', 'Tourneo Custom', 'Tourneo Connect', 'Tourneo Courier', 'E-Series', 'Econoline'],
    ute: ['Ranger'],
    suv: ['Everest', 'Escape', 'Puma', 'Territory', 'Bronco', 'Edge'],
    truck: ['F-250', 'F-350', 'F-450', 'F-550', 'F-650', 'F-750']
  },
  'Chevrolet': {
    van: ['Express', 'Express Cargo', 'Express Passenger', 'City Express', 'Astro', 'G-Series Van'],
    truck: ['Silverado 2500HD', 'Silverado 3500HD', 'Silverado 4500HD', 'Silverado 5500HD', 'Silverado 6500HD']
  },
  'Chrysler': {
    van: ['Voyager', 'Grand Voyager', 'Pacifica', 'Town & Country', 'Grand Caravan']
  },
  'Dodge': {
    van: ['Caravan', 'Grand Caravan', 'Ram Van', 'B-Series Van', 'Sprinter', 'Journey']
  },
  'GAZ': {
    van: ['Gazelle', 'Gazelle Next', 'Gazelle Business', 'Sobol', 'GAZ-2705', 'GAZ-3221']
  },
  'Hyundai': {
    van: ['H-1', 'Starex', 'iLoad', 'iMax', 'Staria', 'Staria Load', 'Porter', 'H100'],
    truck: ['Mighty EX2', 'Mighty EX4', 'Mighty EX6', 'Mighty EX8', 'Pavise']
  },
  'Isuzu': {
    van: ['Fargo', 'Como'],
    ute: ['D-MAX'],
    suv: ['MU-X'],
    truck: ['NLR', 'NNR', 'NPR', 'NQR', 'FRR', 'FSR', 'FTR', 'FVR', 'FVZ', 'FXR', 'FXL', 'FYH', 'FYJ', 'Giga']
  },
  'Force Motors': {
    van: ['Traveller', 'Traveller Mono Bus', 'Traveller School Bus', 'Traveller Ambulance', 'Urbania']
  },
  'Renault': {
    van: ['Kangoo', 'Kangoo Express', 'Kangoo Z.E.', 'Express Van', 'Trafic', 'Master', 'Master Z.E.']
  },
  'Citroën': {
    van: ['Berlingo', 'Berlingo Van', 'Jumpy', 'Dispatch', 'Jumper', 'Relay', 'SpaceTourer']
  },
  'Peugeot': {
    van: ['Partner', 'Partner Van', 'Expert', 'Expert Van', 'Boxer', 'Rifter', 'Traveller']
  },
  'Fiat': {
    van: ['Ducato', 'Ducato Van', 'Ducato Maxi', 'Scudo', 'Talento', 'Doblo Cargo', 'Doblo XL', 'Fiorino', 'Fiorino Cargo', 'Qubo', 'Ulysse']
  },
  'Toyota': {
    van: ['HiAce', 'HiAce Commuter', 'Granvia', 'ProAce', 'ProAce City', 'LiteAce', 'TownAce', 'Noah', 'Voxy', 'Alphard', 'Vellfire', 'Sienna', 'Estima'],
    ute: ['HiLux', 'LandCruiser 70'],
    suv: ['RAV4', 'Kluger', 'LandCruiser 300', 'LandCruiser 250', 'LandCruiser 70 Wagon', 'Fortuner', 'C-HR', 'Corolla Cross', 'Yaris Cross', 'Highlander']
  },
  'Volkswagen': {
    van: ['Transporter', 'Transporter Kombi', 'Caravelle', 'Multivan', 'California', 'Caddy', 'Caddy Cargo', 'Crafter', 'Crafter Panel Van', 'ID. Buzz', 'ID. Buzz Cargo'],
    ute: ['Amarok'],
    suv: ['Tiguan', 'Tiguan Allspace', 'Touareg', 'T-Cross', 'T-Roc']
  },
  'Holden': {
    van: ['Combo', 'Combo Cargo', 'Vivaro', 'Vivaro-e', 'Movano', 'Movano-e'],
    suv: ['Trailblazer', 'Captiva', 'Equinox', 'Acadia']
  },
  'Mazda': {
    ute: ['BT-50'],
    suv: ['CX-3', 'CX-30', 'CX-5', 'CX-60', 'CX-8', 'CX-9', 'CX-90']
  },
  'Mitsubishi': {
    ute: ['Triton'],
    suv: ['Outlander', 'Eclipse Cross', 'Pajero Sport']
  },
  'Nissan': {
    ute: ['Navara'],
    suv: ['X-Trail', 'Qashqai', 'Pathfinder', 'Patrol', 'Juke']
  },
  'GWM': {
    ute: ['Cannon', 'Cannon Alpha'],
    suv: ['Haval Jolion', 'Haval H6', 'Haval H6 GT', 'Tank 300', 'Tank 500'],
    truck: ['Shunyi Light Truck', 'King Kong Cannon']
  },
  'JAC': {
    ute: ['T9'],
    suv: ['JS4', 'JS6'],
    truck: ['N-Series', 'N55', 'N65', 'N75', 'N90']
  },
  'KGM (SsangYong)': {
    ute: ['Musso'],
    suv: ['Korando', 'Tivoli', 'Rexton']
  },
  'Kia': {
    ute: ['Tasman'],
    suv: ['Sportage', 'Seltos', 'Sorento', 'Carnival', 'EV6', 'EV9']
  },
  'BYD': {
    suv: ['Atto 3', 'Seal U', 'Yuan Plus']
  },
  'Chery': {
    suv: ['Tiggo 7 Pro', 'Tiggo 8 Pro']
  },
  'Foton': {
    suv: ['Sauvana'],
    truck: ['Aumark S', 'Aumark C', 'Auman EST']
  },
  'Ram': {
    suv: ['Grand Wagoneer', 'Wagoneer'],
    truck: ['2500', '3500', '4500', '5500']
  },
  'Mercedes-Benz': {
    suv: ['GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'G-Class'],
    truck: ['Actros', 'Arocs', 'Atego', 'Econic', 'Unimog']
  },
  'Hino': {
    truck: ['300 Series', '500 Series', '700 Series']
  },
  'Fuso': {
    truck: ['Canter', 'Fighter', 'Shogun']
  },
  'Iveco': {
    truck: ['Daily Cab Chassis', 'Eurocargo', 'Euro6', 'S-Way', 'T-Way']
  },
  'Volvo': {
    truck: ['FL', 'FE', 'FM', 'FMX', 'FH', 'FH16']
  },
  'Scania': {
    truck: ['P-Series', 'G-Series', 'R-Series', 'S-Series']
  },
  'Kenworth': {
    truck: ['K200', 'K220', 'T359', 'T410', 'T610', 'T659', 'T909', 'C509', 'C540']
  },
  'Mack': {
    truck: ['Metro-Liner', 'Granite', 'Anthem', 'Trident', 'Super-Liner', 'Titan']
  },
  'DAF': {
    truck: ['LF', 'CF', 'XF']
  },
  'MAN': {
    truck: ['TGL', 'TGM', 'TGS', 'TGX']
  },
  'UD Trucks': {
    truck: ['Quon', 'Croner', 'Condor']
  },
  'Renault Trucks': {
    truck: ['Master Cab Chassis', 'Trafic Cab Chassis', 'D-Series', 'C-Series']
  }
};

export const TRAILER_MAKES = [
  'Felix Trailers', 'Bockman Trailers', 'Sureweld', 'Austral Trailers', 
  'Belco Trailers', 'Humpback Trailers', 'Sunshine Trailers'
];

export const POWER_SOURCES = ['Generator', 'Battery', 'Gas/LPG', 'Hybrid'];

export const CONDITIONS = ['excellent', 'good', 'fair'];

export const STATES = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'];

// Helper function to get models for a specific make and vehicle type
export function getModelsForMake(make, vehicleType) {
  if (!make) return [];
  
  const makeData = VEHICLE_MODELS[make];
  if (!makeData) return [];
  
  const typeKey = vehicleType?.toLowerCase();
  return makeData[typeKey] || [];
}

// Helper function to get makes for a specific vehicle type
export function getMakesForVehicleType(vehicleType) {
  if (vehicleType === 'Trailer') {
    return TRAILER_MAKES;
  }
  
  if (!vehicleType) return VEHICLE_MAKES;
  
  const typeKey = vehicleType.toLowerCase();
  const makes = [];
  
  for (const [make, models] of Object.entries(VEHICLE_MODELS)) {
    if (models[typeKey] && models[typeKey].length > 0) {
      makes.push(make);
    }
  }
  
  return makes.sort();
}