import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

const InventoryPage: React.FC = () => {
  const { state, equipItem, usePotion, removeItem, addNotification } = useGame();
  const [filter, setFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const filteredItems = filter === 'all' 
    ? state.inventory 
    : state.inventory.filter(i => i.type === filter);

  const handleAction = (itemId: string) => {
    const item = state.inventory.find(i => i.id === itemId);
    if (!item) return;

    if (item.type === 'weapon' || item.type === 'armor') {
      equipItem(itemId);
      addNotification(`${item.icon} ${item.name} ${item.equipped ? 'снято' : 'надето'}!`);
    } else if (item.type === 'potion') {
      usePotion(itemId);
      addNotification(`${item.icon} ${item.name} использовано!`);
    }
    setSelectedItem(null);
  };

  const getItemBorderColor = (type: string) => {
    switch (type) {
      case 'weapon': return 'border-red-500/40 hover:border-red-500/70';
      case 'armor': return 'border-blue-500/40 hover:border-blue-500/70';
      case 'potion': return 'border-green-500/40 hover:border-green-500/70';
      case 'scroll': return 'border-purple-500/40 hover:border-purple-500/70';
      default: return 'border-gray-500/40 hover:border-gray-500/70';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'weapon': return 'Оружие';
      case 'armor': return 'Доспех';
      case 'potion': return 'Зелье';
      case 'scroll': return 'Свиток';
      case 'quest': return 'Квестовый';
      default: return 'Прочее';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-300 mb-2 text-center">🎒 Инвентарь</h1>
        <p className="text-gray-400 text-center mb-8">Предметы: {state.inventory.length}</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {[
            { key: 'all', label: 'Все', icon: '📦' },
            { key: 'weapon', label: 'Оружие', icon: '⚔️' },
            { key: 'armor', label: 'Доспехи', icon: '🛡️' },
            { key: 'potion', label: 'Зелья', icon: '🧪' },
            { key: 'scroll', label: 'Свитки', icon: '📜' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f.key 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <div className="text-5xl mb-4">🕸️</div>
            <p className="text-xl">Пусто...</p>
            <p className="text-sm mt-2">Посетите магазин или найдите предметы в приключениях</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-5 border-2 transition-all cursor-pointer ${getItemBorderColor(item.type)} ${selectedItem === item.id ? 'ring-2 ring-amber-400' : ''}`}
                onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white">{item.name}</h3>
                      {item.equipped && (
                        <span className="text-xs bg-green-600/30 text-green-300 px-2 py-0.5 rounded-full">Надето</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{getTypeLabel(item.type)}</p>
                    <p className="text-sm text-gray-400 mt-2">{item.description}</p>
                    
                    {item.stats && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {item.stats.attack && <span className="text-xs bg-red-900/30 text-red-300 px-2 py-1 rounded">+{item.stats.attack} ATK</span>}
                        {item.stats.defense && <span className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded">+{item.stats.defense} DEF</span>}
                        {item.stats.health && <span className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded">+{item.stats.health} HP</span>}
                        {item.stats.magic && <span className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded">+{item.stats.magic} MAG</span>}
                      </div>
                    )}
                  </div>
                </div>

                {selectedItem === item.id && (
                  <div className="mt-4 pt-4 border-t border-gray-700 flex gap-2">
                    {(item.type === 'weapon' || item.type === 'armor') && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAction(item.id); }}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          item.equipped 
                            ? 'bg-red-600/20 text-red-300 hover:bg-red-600/30 border border-red-500/30'
                            : 'bg-green-600/20 text-green-300 hover:bg-green-600/30 border border-green-500/30'
                        }`}
                      >
                        {item.equipped ? '❌ Снять' : '✅ Надеть'}
                      </button>
                    )}
                    {item.type === 'potion' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAction(item.id); }}
                        className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-green-600/20 text-green-300 hover:bg-green-600/30 border border-green-500/30 transition-all"
                      >
                        🧪 Использовать
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); removeItem(item.id); addNotification(`${item.name} выброшено`); setSelectedItem(null); }}
                      className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-700/50 text-gray-400 hover:text-red-300 hover:bg-red-900/20 border border-gray-600 transition-all"
                    >
                      🗑️
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryPage;
