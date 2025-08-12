import React, { useState } from 'react';
import { createCard } from '../services/api';

const toArray = (s) =>
  !s ? [] : s.split(/[|;,\n]/).map(x => x.trim()).filter(Boolean);

export default function CardForm({ onCreated }) {
  const [form, setForm] = useState({
    term: '',
    definitionEn: '',
    definitionTr: '',
    partOfSpeech: '',
    ipa: '',
    collocations: '',
    tags: '',
    exampleEn: '',
    exampleTr: ''
  });
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        term: form.term,
        definitionEn: form.definitionEn,
        definitionTr: form.definitionTr,
        partOfSpeech: form.partOfSpeech || undefined,
        ipa: form.ipa || undefined,
        collocations: toArray(form.collocations),
        tags: toArray(form.tags),
        examples: form.exampleEn ? [{ en: form.exampleEn, tr: form.exampleTr || undefined }] : []
      };
      const created = await createCard(payload);
      onCreated && onCreated(created);
      setForm({
        term: '', definitionEn: '', definitionTr: '',
        partOfSpeech: '', ipa: '', collocations: '',
        tags: '', exampleEn: '', exampleTr: ''
      });
    } catch (e1) {
      alert(e1.message || 'Hata');
    } finally {
      setLoading(false);
    }
  }

  function set(k, v){ setForm(prev => ({...prev, [k]: v})); }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Term (EN)*" value={form.term} onChange={e=>set('term', e.target.value)} required />
        <Input label="Part of Speech" value={form.partOfSpeech} onChange={e=>set('partOfSpeech', e.target.value)} placeholder="noun/verb/adj..." />
        <Input label="Definition (EN)*" value={form.definitionEn} onChange={e=>set('definitionEn', e.target.value)} required />
        <Input label="Anlam (TR)*" value={form.definitionTr} onChange={e=>set('definitionTr', e.target.value)} required />
        <Input label="IPA" value={form.ipa} onChange={e=>set('ipa', e.target.value)} />
        <Input label="Collocations (; , veya | ile ayır)" value={form.collocations} onChange={e=>set('collocations', e.target.value)} />
        <Input label="Tags (; , veya | ile ayır)" value={form.tags} onChange={e=>set('tags', e.target.value)} />
        <Input label="Örnek (EN)" value={form.exampleEn} onChange={e=>set('exampleEn', e.target.value)} />
        <Input label="Örnek (TR)" value={form.exampleTr} onChange={e=>set('exampleTr', e.target.value)} />
      </div>
      <button disabled={loading} className="w-full sm:w-auto px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">
        {loading ? 'Kaydediliyor...' : 'Kart Ekle'}
      </button>
    </form>
  );
}

function Input({ label, ...rest }) {
  return (
    <label className="block text-sm">
      <span className="text-gray-600">{label}</span>
      <input {...rest} className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
    </label>
  );
}
