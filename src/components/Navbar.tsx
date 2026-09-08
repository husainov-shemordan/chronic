import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { state } = useGame();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Главная', icon: '🏠' },
    { path: '/adventure', label: 'Приключение', icon: '⚔️' },
    { path: '/inventory', label: 'Инвентарь', icon: '🎒' },
    { path: '/map', label: 'Карта', icon: '🗺️' },
    { path: '/character', label: 'Персонаж', icon: '👤' },
    { path: '/shop', label: 'Магазин', icon: '🏪' },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 border-b border-purple-500/30 shadow-lg shadow-purple-500/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:animate-bounce">🐉</span>
            <span className="text-lg font-bold bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent hidden sm:block">
              Хроники Эльдории
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5
                  ${location.pathname === item.path
                    ? 'bg-purple-600/40 text-amber-300 shadow-inner shadow-purple-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Stats bar */}
          <div className="hidden lg:flex items-center gap-3 text-sm">
            <span className="text-red-400">❤️ {state.character.health}/{state.character.maxHealth}</span>
            <span className="text-blue-400">💎 {state.character.mana}/{state.character.maxMana}</span>
            <span className="text-amber-400">💰 {state.character.gold}</span>
            <span className="text-green-400">⭐ Ур.{state.character.level}</span>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-purple-500/20 mt-2 pt-2">
            <div className="flex flex-wrap gap-2">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${location.pathname === item.path
                      ? 'bg-purple-600/40 text-amber-300'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex gap-3 mt-3 text-xs px-2">
              <span className="text-red-400">❤️ {state.character.health}/{state.character.maxHealth}</span>
              <span className="text-blue-400">💎 {state.character.mana}/{state.character.maxMana}</span>
              <span className="text-amber-400">💰 {state.character.gold}</span>
              <span className="text-green-400">⭐ Ур.{state.character.level}</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
