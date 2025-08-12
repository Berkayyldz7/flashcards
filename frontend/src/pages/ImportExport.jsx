import React, { useRef, useState } from 'react';
import { importCards, exportCards } from '../services/api';

export default function ImportExport() {
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);

  async function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      setBusy(true);
      const text = await f.text();
      const json = JSON.parse(text);
      const res = await importCards(json);
      alert(`İçe aktarıldı: ${res.count || json.length} kart`);
    } catch (err) {
      alert('JSON okunamadı / import hatası');
    } finally {
      setBusy(false);
      e.target.value = '';
    }
  }

  async function handleExport() {
    try {
      setBusy(true);
      const data = await exportCards();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'cards-export.json'; a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Export hatası');
    } finally { setBusy(false); }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">İçe/Dışa Aktarım</h2>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => fileRef.current?.click()} className="px-4 py-2 rounded-lg border hover:bg-gray-50" disabled={busy}>
          JSON İçe Aktar
        </button>
        <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={handleFile} />
        <button onClick={handleExport} className="px-4 py-2 rounded-lg border hover:bg-gray-50" disabled={busy}>
          JSON Dışa Aktar
        </button>
      </div>
      <p className="text-sm text-gray-500">Format: <code>[{"{ term, definitionEn, definitionTr, ... }" }]</code></p>
    </div>
  );
}
