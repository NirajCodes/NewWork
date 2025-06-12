import React, { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import { Navbar } from './components/Navbar';
import { RouteFinder } from './components/RouteFinder';
import { StationInfo } from './components/StationInfo';
import './index.css';

const App: React.FC = () => {
  const [page, setPage] = useState<'route' | 'station'>('route');
  return (
    <AppProvider>
      <Navbar page={page} setPage={setPage} />
      <main className="p-4">
        {page === 'route' ? <RouteFinder /> : <StationInfo />}
      </main>
    </AppProvider>
  );
};

export default App;
