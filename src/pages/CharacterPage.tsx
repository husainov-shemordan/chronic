import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

const CharacterPage: React.FC = () => {
  const { state, updateCharacter, addNotification } = useGame();
  const { character } = state;
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(character.name);


  const availablePoints = Math.max(0, character.level * 2 - 6);

  const handleNameSave = () => {
    if (nameInput.trim()) {
      updateCharacter({ name: nameInput.trim() });
      addNotification('Имя изменено!');
    }
    setEditing(false);
  };

  const upgradeStat = (stat: 'attack' | 'defense' | 'magic') => {
    if (availablePoints <= 0) return;
    updateCharacter({ [stat]: character[stat] + 1 });
    addNotification(`${stat === 'attack' ? '⚔️ Атака' : stat === 'defense' ? '🛡️ Защита' : '✨ Магия'} +1!`);
  };

  const expPercent = (character.experience / character.maxExperience) * 100;
  const healthPercent = (character.health / character.maxHealth) * 100;
  const manaPercent = (character.mana / character.maxMana) * 100;

  const getClassIcon = () => {
    switch (character.class) {
      case 'Воин': return '⚔️';
      case 'Маг': return '🧙';
      case 'Лучник': return '🏹';
      default: return '🗡️';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-300 mb-8 text-center">👤 Персонаж</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Character Info Card */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20">
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">{getClassIcon()}</div>
              {editing ? (
                <div className="flex items-center gap-2 justify-center">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    className="bg-gray-700 text-white px-3 py-1 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-500"
                    maxLength={20}
                  />
                  <button onClick={handleNameSave} className="text-green-400 hover:text-green-300">✓</button>
                  <button onClick={() => setEditing(false)} className="text-red-400 hover:text-red-300">✗</button>
                </div>
              ) : (
                <h2 className="text-2xl font-bold text-white cursor-pointer hover:text-amber-300 transition-colors" onClick={() => setEditing(true)}>
                  {character.name}
                </h2>
              )}
              <p className="text-gray-400 mt-1">{character.class} • Уровень {character.level}</p>
            </div>

            {/* Bars */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-red-400">❤️ Здоровье</span>
                  <span className="text-gray-400">{character.health}/{character.maxHealth}</span>
                </div>
                <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-500" style={{ width: `${healthPercent}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-blue-400">💎 Мана</span>
                  <span className="text-gray-400">{character.mana}/{character.maxMana}</span>
                </div>
                <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-500" style={{ width: `${manaPercent}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-amber-400">⭐ Опыт</span>
                  <span className="text-gray-400">{character.experience}/{character.maxExperience}</span>
                </div>
                <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 rounded-full transition-all duration-500" style={{ width: `${expPercent}%` }} />
                </div>
              </div>
            </div>

            {/* Gold */}
            <div className="mt-6 p-3 bg-amber-900/20 rounded-xl border border-amber-500/20 text-center">
              <span className="text-2xl font-bold text-amber-300">💰 {character.gold}</span>
              <span className="text-gray-400 text-sm ml-2">золотых</span>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              📊 Характеристики
              {availablePoints > 0 && (
                <span className="text-xs bg-green-600/20 text-green-300 px-2 py-1 rounded-full animate-pulse">
                  +{availablePoints} очков
                </span>
              )}
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚔️</span>
                  <div>
                    <p className="text-white font-medium">Атака</p>
                    <p className="text-xs text-gray-500">Урон в бою</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-red-400">{character.attack}</span>
                  {availablePoints > 0 && (
                    <button
                      onClick={() => upgradeStat('attack')}
                      className="w-7 h-7 bg-green-600/20 text-green-400 rounded-full hover:bg-green-600/40 transition-all text-sm font-bold"
                    >
                      +
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🛡️</span>
                  <div>
                    <p className="text-white font-medium">Защита</p>
                    <p className="text-xs text-gray-500">Снижение урона</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-blue-400">{character.defense}</span>
                  {availablePoints > 0 && (
                    <button
                      onClick={() => upgradeStat('defense')}
                      className="w-7 h-7 bg-green-600/20 text-green-400 rounded-full hover:bg-green-600/40 transition-all text-sm font-bold"
                    >
                      +
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✨</span>
                  <div>
                    <p className="text-white font-medium">Магия</p>
                    <p className="text-xs text-gray-500">Сила заклинаний</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-purple-400">{character.magic}</span>
                  {availablePoints > 0 && (
                    <button
                      onClick={() => upgradeStat('magic')}
                      className="w-7 h-7 bg-green-600/20 text-green-400 rounded-full hover:bg-green-600/40 transition-all text-sm font-bold"
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Equipment Summary */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Экипировка:</h4>
              <div className="space-y-2">
                {state.inventory.filter(i => i.equipped).map(item => (
                  <div key={item.id} className="flex items-center gap-2 text-sm bg-gray-700/20 rounded-lg px-3 py-2">
                    <span>{item.icon}</span>
                    <span className="text-gray-300">{item.name}</span>
                  </div>
                ))}
                {state.inventory.filter(i => i.equipped).length === 0 && (
                  <p className="text-gray-600 text-sm italic">Нет экипированных предметов</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements / Progress */}
        <div className="mt-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-4">🏆 Прогресс</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-700/20 rounded-xl">
              <div className="text-2xl mb-1">⚔️</div>
              <div className="text-lg font-bold text-white">{state.questLog.filter(q => q.completed).length}</div>
              <div className="text-xs text-gray-500">Квестов</div>
            </div>
            <div className="text-center p-3 bg-gray-700/20 rounded-xl">
              <div className="text-2xl mb-1">📍</div>
              <div className="text-lg font-bold text-white">{state.locations.filter(l => l.unlocked).length}/{state.locations.length}</div>
              <div className="text-xs text-gray-500">Локаций</div>
            </div>
            <div className="text-center p-3 bg-gray-700/20 rounded-xl">
              <div className="text-2xl mb-1">🎒</div>
              <div className="text-lg font-bold text-white">{state.inventory.length}</div>
              <div className="text-xs text-gray-500">Предметов</div>
            </div>
            <div className="text-center p-3 bg-gray-700/20 rounded-xl">
              <div className="text-2xl mb-1">⭐</div>
              <div className="text-lg font-bold text-white">{character.level}</div>
              <div className="text-xs text-gray-500">Уровень</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
