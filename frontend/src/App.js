import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ImportExport from './pages/ImportExport';

export default function App() {
  const [count, setCount] = React.useState(0);
  const [route, setRoute] = React.useState('home');

  // küçük, basit bir event bus yerine storage event kullanalım (opsiyonel)
  React.useEffect(() => {
    async function readCount() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE || 'http://localhost:5001'}/api/cards`);
        const data = await res.json();
        setCount(data.length || 0);
      } catch { /* ignore */ }
    }
    readCount();
    const t = setInterval(readCount, 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar count={count} />
      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="mb-4 flex gap-2">
          <button onClick={()=>setRoute('home')} className={`px-3 py-2 rounded-lg border ${route==='home'?'bg-white shadow':''}`}>Pratik</button>
          <button onClick={()=>setRoute('io')} className={`px-3 py-2 rounded-lg border ${route==='io'?'bg-white shadow':''}`}>İçe/Dışa Aktarım</button>
        </div>
        {route === 'home' ? <Home /> : <ImportExport />}
      </main>
    </div>
  );
}
