import React from 'react';

export default function VanModelHelp() {
  return (
    <div className="bg-white border border-[#DBDBDB] rounded-xl p-4 text-sm text-[#333]">
      <p className="mb-2 font-semibold">Managing Van Options</p>
      <ul className="list-disc ml-5 space-y-1">
        <li>Add or remove models under the VanModel entity.</li>
        <li>Set package_type to compact, large, or walk_in to control where they appear.</li>
        <li>Use the order field to control display ordering.</li>
        <li>Toggle is_active to hide a model without deleting it.</li>
      </ul>
    </div>
  );
}