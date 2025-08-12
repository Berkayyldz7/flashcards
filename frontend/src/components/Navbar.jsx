import React from 'react';

export default function Navbar({ count }) {
  return (
    <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">Q</span>
          <span className="font-semibold">Quizlett Clone</span>
        </div>
        <div className="text-sm text-gray-600">Toplam kart: <span className="font-semibold">{count}</span></div>
      </div>
    </header>
  );
}
