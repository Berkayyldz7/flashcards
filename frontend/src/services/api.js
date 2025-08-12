const BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5001';

export async function fetchCards() {
  const res = await fetch(`${BASE}/api/cards`);
  if (!res.ok) throw new Error('Kartlar alınamadı');
  return res.json();
}

export async function createCard(data) {
  const res = await fetch(`${BASE}/api/cards`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Kart eklenemedi');
  return res.json();
}

export async function updateCard(id, data) {
  const res = await fetch(`${BASE}/api/cards/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Kart güncellenemedi');
  return res.json();
}

export async function deleteCard(id) {
  const res = await fetch(`${BASE}/api/cards/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Kart silinemedi');
  return res.json();
}

export async function importCards(items) {
  const res = await fetch(`${BASE}/api/cards/import`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items),
  });
  if (!res.ok) throw new Error('Import başarısız');
  return res.json();
}

export async function exportCards() {
  const res = await fetch(`${BASE}/api/cards/export`);
  if (!res.ok) throw new Error('Export başarısız');
  return res.json();
}
