import React, { useEffect, useMemo, useState } from 'react';
import { fetchCards, deleteCard, updateCard } from '../services/api';
import Card from '../components/Card';
import CardForm from '../components/CardForm';
import CardList from '../components/CardList';

export default function Home() {
  const [cards, setCards] = useState([]);
  const [mode, setMode] = useState('sequential'); // or 'random'
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchCards();
      setCards(data);
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function onDelete(c) {
    if (!window.confirm(`Silinsin mi: ${c.term}?`)) return;
    await deleteCard(c._id);
    setCards(prev => prev.filter(x => x._id !== c._id));
  }

  async function onScore(card, score) {
    // basit reps artırımı (backend SRS yoksa bile çalışsın)
    const nextReps = (card.reps || 0) + 1;
    const patch = { reps: nextReps };
    if (score === 'again') patch.box = 1; // istersen burada SRS kararlarını genişletebilirsin
    const updated = await updateCard(card._id, patch);
    setCards(prev => prev.map(x => x._id === card._id ? updated : x));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Pratik</h2>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Mod:</label>
            <select value={mode} onChange={e=>setMode(e.target.value)} className="rounded-lg border px-2 py-1">
              <option value="sequential">Sıralı</option>
              <option value="random">Rastgele</option>
            </select>
          </div>
        </div>
        {loading ? (
          <div className="rounded-xl border p-8 text-center text-gray-500">Yükleniyor…</div>
        ) : (
          <Card cards={cards} mode={mode} onScore={onScore} />
        )}
      </div>

      <aside className="space-y-6">
        <section className="rounded-xl border p-4">
          <h3 className="font-medium mb-3">Yeni Kart Ekle</h3>
          <CardForm onCreated={(c)=> setCards(prev => [c, ...prev])} />
        </section>

        <section className="rounded-xl border p-4">
          <h3 className="font-medium mb-3">Kartlar</h3>
          <CardList cards={cards} onDelete={onDelete} />
        </section>
      </aside>
    </div>
  );
}
