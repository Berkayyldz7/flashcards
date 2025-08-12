import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * props:
 *  - cards: [] (backend modeline uygun)
 *  - mode: 'sequential' | 'random'
 *  - onScore(card, score) => Promise<void>  // reps artırma vb. için
 */
export default function Card({ cards, mode = 'sequential', onScore }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const order = useMemo(() => {
    if (!Array.isArray(cards)) return [];
    if (mode === 'random') {
      const shuffled = [...cards];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    return cards;
  }, [cards, mode]);

  const card = order[index];

  function next() {
    setFlipped(false);
    setIndex((i) => (i + 1) % (order.length || 1));
  }

  function flip() {
    setFlipped((f) => !f);
  }

  // keyboard: space=flip, n=next, 1–4=score
  useEffect(() => {
    function onKey(e) {
      if (!order.length) return;
      if (e.code === 'Space') { e.preventDefault(); flip(); }
      if (e.key === 'n' || e.key === 'N') next();
      if (['1','2','3','4'].includes(e.key)) {
        const score = ({'1':'again','2':'hard','3':'good','4':'easy'})[e.key];
        if (onScore && card) onScore(card, score).finally(() => next());
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [order, card, onScore]);

  if (!order.length) {
    return (
      <div className="rounded-xl border p-8 text-center text-gray-500">
        Henüz kart yok. Sağdan kart ekleyebilir veya JSON import yapabilirsin.
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div
        className={`relative h-64 sm:h-80 [perspective:1000px]`}
      >
        <div
          className={`absolute inset-0 rounded-2xl shadow-xl border bg-white transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
          aria-live="polite"
        >
          {/* front */}
          <div className="absolute inset-0 p-6 sm:p-8 [backface-visibility:hidden] flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wide text-indigo-700/80 mb-2">{card.partOfSpeech || 'term'}</div>
              <div className="text-2xl sm:text-3xl font-semibold">{card.term}</div>
              <div className="mt-2 text-gray-600">{card.definitionEn}</div>
              {card.ipa ? <div className="mt-1 text-sm text-gray-500">{card.ipa}</div> : null}
              {card.collocations?.length ? (
                <div className="mt-3">
                  <div className="text-xs font-medium text-gray-500 mb-1">Collocations</div>
                  <div className="flex flex-wrap gap-2">
                    {card.collocations.slice(0,6).map((c,i)=>(
                      <span key={i} className="px-2 py-1 text-xs rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">{c}</span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex items-center justify-between">
              <button className="px-3 py-2 rounded-lg border hover:bg-gray-50" onClick={flip} aria-label="Kartı çevir (Space)">Önü/Arkayı Gör (Space)</button>
              <div className="text-sm text-gray-500">{index+1} / {order.length}</div>
            </div>
          </div>

          {/* back */}
          <div className="absolute inset-0 p-6 sm:p-8 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wide text-emerald-700/80 mb-2">TR Anlam</div>
              <div className="text-2xl sm:text-3xl font-semibold">{card.definitionTr}</div>
              {card.examples?.length ? (
                <div className="mt-4 space-y-2">
                  <div className="text-xs font-medium text-gray-500">Örnekler</div>
                  {card.examples.slice(0,2).map((ex,i)=>(
                    <div key={i} className="text-sm">
                      <div className="text-gray-800">• {ex.en}</div>
                      {ex.tr ? <div className="text-gray-500">— {ex.tr}</div> : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="flex gap-2 justify-between items-center">
              <div className="flex gap-2">
                <button className="px-3 py-2 rounded-lg border hover:bg-gray-50" onClick={flip}>Ön Yüze Dön</button>
                <button className="px-3 py-2 rounded-lg border hover:bg-gray-50" onClick={next} aria-label="Sonraki (N)">Sonraki (N)</button>
              </div>
              <div className="flex gap-2">
                <ScoreButton onClick={()=>onScore && onScore(card,'again')} label="Again" k="1" />
                <ScoreButton onClick={()=>onScore && onScore(card,'hard')} label="Hard" k="2" />
                <ScoreButton onClick={()=>onScore && onScore(card,'good')} label="Good" k="3" />
                <ScoreButton onClick={()=>onScore && onScore(card,'easy')} label="Easy" k="4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* small legend */}
      <div className="mt-3 text-xs text-gray-500">Kısayollar: Space=çevir, 1–4=puan ver, N=sonraki</div>
    </div>
  );
}

function ScoreButton({ onClick, label, k }) {
  return (
    <button
      className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg border hover:bg-gray-50"
      onClick={onClick}
      aria-label={`${label} (${k})`}
      title={`${label} (${k})`}
    >
      {label}
    </button>
  );
}
