import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';

export default function CreateEarlyBirdSheetButton() {
  const [xlsxUrl, setXlsxUrl] = useState('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/e9ca9b217_EarlyBirdProductslistwithPricing.xlsx');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    setLoading(true); setError(''); setResult(null);
    try {
      const { data } = await base44.functions.invoke('createEarlyBirdProductsSheet', { xlsxUrl });
      setResult(data);
    } catch (e) {
      setError(e?.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-[#DBDBDB] rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-2">Create Google Sheet from XLSX</h3>
      <p className="text-sm text-[#333333] mb-4">Converts your uploaded XLSX into a Google Sheet and auto-fills Image URLs.</p>
      <input
        className="w-full border rounded-md px-3 py-2 mb-3 text-sm"
        value={xlsxUrl}
        onChange={(e) => setXlsxUrl(e.target.value)}
        placeholder="XLSX file URL"
      />
      <Button onClick={handleCreate} disabled={loading} className="bg-black text-white">
        {loading ? 'Creating…' : 'Create Google Sheet'}
      </Button>
      {result?.url && (
        <div className="mt-3 text-sm">
          Sheet created: <a href={result.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">Open Google Sheet</a>
        </div>
      )}
      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
    </div>
  );
}