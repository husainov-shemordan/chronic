import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AdventurePage from './pages/AdventurePage';
import InventoryPage from './pages/InventoryPage';
import MapPage from './pages/MapPage';
import CharacterPage from './pages/CharacterPage';
import ShopPage from './pages/ShopPage';
import NotificationBar from './components/NotificationBar';

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
          <Navbar />
          <NotificationBar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/adventure" element={<AdventurePage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/character" element={<CharacterPage />} />
              <Route path="/shop" element={<ShopPage />} />
            </Routes>
          </main>
          {/* Footer */}
          <footer className="border-t border-gray-800 py-6 text-center text-gray-600 text-sm">
            <p>🐉 Хроники Эльдории — RPG Приключение © 2026</p>
            <p className="mt-1 text-xs">Создано с помощью React + Tailwind CSS</p>
          </footer>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;
