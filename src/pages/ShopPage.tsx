import React, { useState } from 'react';
import { useGame, Item } from '../context/GameContext';

const shopItems: Item[] = [
  {
    id: 'iron-sword',
    name: 'Железный меч',
    description: 'Надёжный меч из хорошей стали.',
    type: 'weapon',
    icon: '🗡️',
    price: 50,
    stats: { attack: 12 },
  },
  {
    id: 'steel-sword',
    name: 'Стальной клинок',
    description: 'Острый как бритва. Закалён в горне.',
    type: 'weapon',
    icon: '⚔️',
    price: 120,
    stats: { attack: 20 },
  },
  {
    id: 'magic-staff',
    name: 'Магический посох',
    description: 'Усиливает заклинания владельца.',
    type: 'weapon',
    icon: '🪄',
    price: 100,
    stats: { attack: 8, magic: 10 },
  },
  {
    id: 'chain-mail',
    name: 'Кольчуга',
    description: 'Отличная защита от рубящих ударов.',
    type: 'armor',
    icon: '🛡️',
    price: 80,
    stats: { defense: 8 },
  },
  {
    id: 'plate-armor',
    name: 'Латные доспехи',
    description: 'Тяжёлые, но непробиваемые.',
    type: 'armor',
    icon: '🦾',
    price: 200,
    stats: { defense: 15 },
  },
  {
    id: 'magic-robe',
    name: 'Мантия мага',
    description: 'Усиливает магические способности.',
    type: 'armor',
    icon: '🧥',
    price: 150,
    stats: { defense: 5, magic: 8 },
  },
  {
    id: 'health-potion',
    name: 'Зелье здоровья',
    description: 'Восстанавливает 30 HP.',
    type: 'potion',
    icon: '🧪',
    price: 15,
    stats: { health: 30 },
  },
  {
    id: 'greater-health-potion',
    name: 'Большое зелье здоровья',
    description: 'Восстанавливает 60 HP.',
    type: 'potion',
    icon: '⚗️',
    price: 30,
    stats: { health: 60 },
  },
  {
    id: 'mana-potion',
    name: 'Зелье маны',
    description: 'Восстанавливает 25 маны.',
    type: 'potion',
    icon: '💙',
    price: 20,
    stats: { magic: 25 },
  },
  {
    id: 'fire-scroll',
    name: 'Свиток огненного шара',
    description: 'Одноразовое мощное заклинание.',
    type: 'scroll',
    icon: '🔥',
    price: 45,
    stats: { attack: 25 },
  },
  {
    id: 'shield-scroll',
    name: 'Свиток защиты',
    description: 'Временно повышает защиту.',
    type: 'scroll',
    icon: '🌀',
    price: 35,
    stats: { defense: 10 },
  },
  {
    id: 'elixir',
    name: 'Эликсир силы',
    description: 'Навсегда увеличивает здоровье на 20.',
    type: 'potion',
    icon: '✨',
    price: 100,
    stats: { health: 20 },
  },
];

const ShopPage: React.FC = () => {
  const { state, spendGold, addGold, addItem, addNotification, removeItem } = useGame();
  const [filter, setFilter] = useState<string>('all');
  const [tab, setTab] = useState<'buy' | 'sell'>('buy');

  const filteredShopItems = filter === 'all'
    ? shopItems
    : shopItems.filter(i => i.type === filter);

  const handleBuy = (item: Item) => {
    if (state.character.gold < item.price) {
      addNotification('❌ Недостаточно золота!');
      return;
    }
    if (spendGold(item.price)) {
      const newItem = { ...item, id: `${item.id}-${Date.now()}` };
      addItem(newItem);
      addNotification(`✅ Куплено: ${item.name}!`);
    }
  };

  const handleSell = (itemId: string) => {
    const item = state.inventory.find(i => i.id === itemId);
    if (!item) return;
    const sellPrice = Math.floor(item.price * 0.6);
    removeItem(itemId);
    addGold(sellPrice);
    addNotification(`💰 Продано: ${item.name} за ${sellPrice} золота!`);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-300 mb-2 text-center">🏪 Магазин</h1>
        <p className="text-gray-400 text-center mb-2">Торговый город Эльдории</p>
        <p className="text-center mb-8">
          <span className="text-amber-300 font-bold text-lg">💰 {state.character.gold} золота</span>
        </p>

        {/* Buy/Sell Tabs */}
        <div className="flex gap-2 justify-center mb-6">
          <button
            onClick={() => setTab('buy')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${tab === 'buy' ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            🛒 Купить
          </button>
          <button
            onClick={() => setTab('sell')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${tab === 'sell' ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            💸 Продать
          </button>
        </div>

        {/* Filters */}
        {tab === 'buy' && (
          <div className="flex flex-wrap gap-2 justify-center mb-6">
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
        )}

        {/* Buy Tab */}
        {tab === 'buy' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredShopItems.map(item => (
              <div key={item.id} className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-5 border border-gray-700 hover:border-amber-500/30 transition-all">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.type === 'weapon' ? 'Оружие' : item.type === 'armor' ? 'Доспех' : item.type === 'potion' ? 'Зелье' : 'Свиток'}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                    
                    {item.stats && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.stats.attack && <span className="text-xs bg-red-900/30 text-red-300 px-2 py-0.5 rounded">+{item.stats.attack} ATK</span>}
                        {item.stats.defense && <span className="text-xs bg-blue-900/30 text-blue-300 px-2 py-0.5 rounded">+{item.stats.defense} DEF</span>}
                        {item.stats.health && <span className="text-xs bg-green-900/30 text-green-300 px-2 py-0.5 rounded">+{item.stats.health} HP</span>}
                        {item.stats.magic && <span className="text-xs bg-purple-900/30 text-purple-300 px-2 py-0.5 rounded">+{item.stats.magic} MAG</span>}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-amber-300 font-bold">💰 {item.price}</span>
                  <button
                    onClick={() => handleBuy(item)}
                    disabled={state.character.gold < item.price}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      state.character.gold >= item.price
                        ? 'bg-green-600/20 text-green-300 hover:bg-green-600/40 border border-green-500/30'
                        : 'bg-gray-700/30 text-gray-600 border border-gray-700 cursor-not-allowed'
                    }`}
                  >
                    {state.character.gold >= item.price ? '🛒 Купить' : '🚫 Мало золота'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sell Tab */}
        {tab === 'sell' && (
          <div className="space-y-3">
            {state.inventory.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="text-5xl mb-4">🕸️</div>
                <p className="text-xl">Нечего продавать</p>
                <p className="text-sm mt-2">Ваш инвентарь пуст</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {state.inventory.map(item => {
                  const sellPrice = Math.floor(item.price * 0.6);
                  return (
                    <div key={item.id} className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-4 border border-gray-700 hover:border-red-500/30 transition-all flex items-center gap-3">
                      <div className="text-2xl">{item.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white text-sm">{item.name}</h4>
                        {item.equipped && <span className="text-xs text-green-400">Надето</span>}
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-amber-300 font-bold text-sm">💰 {sellPrice}</p>
                        <button
                          onClick={() => {
                            if (item.equipped) {
                              addNotification('❌ Нельзя продать экипированный предмет!');
                              return;
                            }
                            handleSell(item.id);
                          }}
                          className="mt-1 px-3 py-1 bg-red-600/20 text-red-300 rounded text-xs hover:bg-red-600/40 border border-red-500/30 transition-all"
                        >
                          Продать
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
