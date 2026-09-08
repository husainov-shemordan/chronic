import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

const MapPage: React.FC = () => {
  const { state, setCurrentLocation, addNotification } = useGame();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const currentLoc = state.locations.find(l => l.id === state.currentLocation);

  const getDangerColor = (level: number) => {
    switch (level) {
      case 1: return 'text-green-400';
      case 2: return 'text-yellow-400';
      case 3: return 'text-orange-400';
      case 4: return 'text-red-400';
      case 5: return 'text-red-600';
      default: return 'text-gray-400';
    }
  };

  const getDangerLabel = (level: number) => {
    switch (level) {
      case 1: return 'Безопасно';
      case 2: return 'Умеренно';
      case 3: return 'Опасно';
      case 4: return 'Очень опасно';
      case 5: return 'Смертельно';
      default: return 'Неизвестно';
    }
  };

  const handleTravel = (locationId: string) => {
    const loc = state.locations.find(l => l.id === locationId);
    if (!loc || !loc.unlocked) return;
    setCurrentLocation(locationId);
    setSelectedLocation(locationId);
    addNotification(`🚶 Вы прибыли в: ${loc.name}`);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-300 mb-2 text-center">🗺️ Карта Эльдории</h1>
        <p className="text-gray-400 text-center mb-8">
          Текущая локация: <span className="text-amber-300">{currentLoc?.icon} {currentLoc?.name}</span>
        </p>

        {/* Map Visual */}
        <div className="relative bg-gradient-to-br from-gray-900 via-green-950/30 to-gray-900 rounded-3xl border border-purple-500/20 overflow-hidden mb-8" style={{ height: '500px' }}>
          {/* Background decorations */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-4xl">🌲</div>
            <div className="absolute top-20 left-32 text-3xl">🌲</div>
            <div className="absolute top-16 left-20 text-2xl">🌿</div>
            <div className="absolute bottom-20 right-20 text-4xl">🏔️</div>
            <div className="absolute top-40 right-40 text-3xl">⛰️</div>
            <div className="absolute bottom-40 left-40 text-3xl">🌊</div>
            <div className="absolute top-60 left-60 text-2xl">🌾</div>
          </div>

          {/* Grid lines */}
          <div className="absolute inset-0 opacity-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`h-${i}`} className="absolute w-full border-t border-gray-500" style={{ top: `${(i + 1) * 10}%` }} />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`v-${i}`} className="absolute h-full border-l border-gray-500" style={{ left: `${(i + 1) * 10}%` }} />
            ))}
          </div>

          {/* Location markers */}
          {state.locations.map(loc => (
            <button
              key={loc.id}
              onClick={() => loc.unlocked && setSelectedLocation(loc.id)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group
                ${loc.unlocked ? 'cursor-pointer hover:scale-125' : 'cursor-not-allowed opacity-40'}
                ${state.currentLocation === loc.id ? 'scale-125' : ''}
              `}
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            >
              <div className={`relative ${state.currentLocation === loc.id ? 'animate-pulse' : ''}`}>
                <div className={`text-3xl md:text-4xl ${!loc.unlocked ? 'grayscale' : ''}`}>
                  {loc.icon}
                </div>
                {state.currentLocation === loc.id && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 rounded-full animate-ping" />
                )}
                <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium px-2 py-0.5 rounded-full
                  ${loc.unlocked ? 'bg-gray-800/80 text-white' : 'bg-gray-900/80 text-gray-500'}
                `}>
                  {loc.name.length > 15 ? loc.name.substring(0, 15) + '...' : loc.name}
                </div>
              </div>
            </button>
          ))}

          {/* Connection lines (decorative) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <line x1="20%" y1="60%" x2="40%" y2="40%" stroke="#a855f7" strokeWidth="1" strokeDasharray="5,5" />
            <line x1="40%" y1="40%" x2="50%" y2="55%" stroke="#a855f7" strokeWidth="1" strokeDasharray="5,5" />
            <line x1="50%" y1="55%" x2="60%" y2="70%" stroke="#a855f7" strokeWidth="1" strokeDasharray="5,5" />
            <line x1="50%" y1="55%" x2="75%" y2="30%" stroke="#a855f7" strokeWidth="1" strokeDasharray="5,5" />
            <line x1="75%" y1="30%" x2="90%" y2="50%" stroke="#a855f7" strokeWidth="1" strokeDasharray="5,5" />
            <line x1="35%" y1="20%" x2="40%" y2="40%" stroke="#a855f7" strokeWidth="1" strokeDasharray="5,5" />
          </svg>
        </div>

        {/* Location Details */}
        {selectedLocation && (
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 mb-6">
            {(() => {
              const loc = state.locations.find(l => l.id === selectedLocation);
              if (!loc) return null;
              return (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{loc.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{loc.name}</h3>
                      <span className={`text-sm ${getDangerColor(loc.dangerLevel)}`}>
                        ⚠️ {getDangerLabel(loc.dangerLevel)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4">{loc.description}</p>
                  <div className="flex items-center gap-4">
                    {loc.unlocked ? (
                      <>
                        {state.currentLocation === loc.id ? (
                          <span className="px-4 py-2 bg-amber-600/20 text-amber-300 rounded-lg border border-amber-500/30">
                            📍 Вы здесь
                          </span>
                        ) : (
                          <button
                            onClick={() => handleTravel(loc.id)}
                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg"
                          >
                            🚶 Путешествовать сюда
                          </button>
                        )}
                      </>
                    ) : (
                      <span className="px-4 py-2 bg-gray-700/50 text-gray-500 rounded-lg border border-gray-600">
                        🔒 Заблокировано
                      </span>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Location List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {state.locations.map(loc => (
            <div
              key={loc.id}
              className={`bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-xl p-4 border transition-all cursor-pointer
                ${loc.unlocked ? 'border-gray-700 hover:border-purple-500/40' : 'border-gray-800 opacity-50'}
                ${state.currentLocation === loc.id ? 'ring-2 ring-amber-400/50 border-amber-500/30' : ''}
              `}
              onClick={() => loc.unlocked && setSelectedLocation(loc.id)}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{loc.unlocked ? loc.icon : '🔒'}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-white text-sm">{loc.name}</h4>
                  <span className={`text-xs ${getDangerColor(loc.dangerLevel)}`}>
                    {'⚠️'.repeat(loc.dangerLevel)} {getDangerLabel(loc.dangerLevel)}
                  </span>
                </div>
                {state.currentLocation === loc.id && (
                  <span className="text-xs bg-amber-600/20 text-amber-300 px-2 py-1 rounded-full">Текущая</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapPage;
