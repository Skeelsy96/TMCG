import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TMCGVerifiedBadge({ size = 'md', showText = true, className = '' }) {
  const sizes = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
    xl: 'text-lg px-6 py-3'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1.5 bg-gradient-to-r from-[#FDD202] to-[#f5c400] text-black font-bold rounded-full shadow-lg ${sizes[size]} ${className}`}
    >
      <Shield className={`${iconSizes[size]} fill-current`} />
      {showText && <span>Built by TMCG</span>}
      <CheckCircle className={`${iconSizes[size]}`} />
    </motion.div>
  );
}

export function TMCGVerifiedSeal({ className = '' }) {
  return (
    <motion.div
      initial={{ rotate: -10, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`relative w-24 h-24 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDD202] to-[#f5c400] rounded-full shadow-xl flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-8 h-8 mx-auto mb-1 fill-black" />
          <div className="text-[10px] font-black text-black leading-tight">
            BUILT BY<br/>TMCG
          </div>
        </div>
      </div>
      <div className="absolute inset-0 border-4 border-black rounded-full opacity-20"></div>
    </motion.div>
  );
}