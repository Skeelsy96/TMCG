import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';
import { Upload, Loader2 } from 'lucide-react';

export default function ImportEarlyBirdProductsButton() {
  const [spreadsheetId, setSpreadsheetId] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('upsert');
  const [message, setMessage] = useState('');

  const handleImport = async () => {
    try {
      setLoading(true);
      setMessage('');
      const { data } = await base44.functions.invoke('importEarlyBirdProducts', { spreadsheetId, mode });
      setMessage(`Done. Created ${data.results?.created || 0}, Updated ${data.results?.updated || 0}, Skipped ${data.results?.skipped || 0}${data.results?.cleared ? ', Replaced existing' : ''}.`);
    } catch (e) {
      setMessage(e?.response?.data?.error || e.message || 'Import failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-xl bg-white">
      <div className="flex items-center gap-2 mb-2">
        <Upload className="w-4 h-4" />
        <div className="font-semibold">Import Early Bird Products</div>
      </div>
      <div className="text-sm text-slate-600 mb-3">Paste your Google Sheet ID (from the URL) and import into EarlyBirdProducts.</div>
      <div className="flex flex-col sm:flex-row gap-2 mb-2">
        <Input placeholder="Spreadsheet ID" value={spreadsheetId} onChange={(e) => setSpreadsheetId(e.target.value)} />
        <select className="border rounded px-3 py-2" value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="upsert">Upsert</option>
          <option value="replace">Replace (clear then import)</option>
        </select>
        <Button onClick={handleImport} disabled={!spreadsheetId || loading} className="min-w-[120px]">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Import'}
        </Button>
      </div>
      {message && <div className="text-sm text-slate-700">{message}</div>}
    </div>
  );
}