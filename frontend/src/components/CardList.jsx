import React from 'react';

export default function CardList({ cards, onEdit, onDelete }) {
  if (!cards?.length) {
    return <div className="text-gray-500">Kart yok.</div>;
  }
  return (
    <ul className="divide-y rounded-lg border">
      {cards.map(card => (
        <li key={card._id} className="p-3 flex items-start justify-between gap-3">
          <div>
            <div className="font-medium">{card.term}</div>
            <div className="text-sm text-gray-600">{card.definitionTr}</div>
            <div className="text-xs text-gray-500">{card.definitionEn}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onEdit?.(card)} className="px-3 py-1 rounded border hover:bg-gray-50">Düzenle</button>
            <button onClick={() => onDelete?.(card)} className="px-3 py-1 rounded border hover:bg-red-50 text-red-600">Sil</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
