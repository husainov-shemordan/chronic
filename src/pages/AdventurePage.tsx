import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

const AdventurePage: React.FC = () => {
  const { state, addGold, addExperience, completeQuest, setCurrentQuest, addNotification, updateCharacter, unlockLocation } = useGame();
  const [activeTab, setActiveTab] = useState<'quests' | 'explore'>('quests');
  const [currentEvent, setCurrentEvent] = useState<{ title: string; description: string; choices: { text: string; outcome: string; goldReward?: number; expReward?: number; healthChange?: number }[] } | null>(null);
  const [outcome, setOutcome] = useState<string | null>(null);

  const handleQuestChoice = (questId: string, choiceIndex: number) => {
    const quest = state.questLog.find(q => q.id === questId);
    if (!quest) return;

    const choice = quest.choices[choiceIndex];
    if (choice.goldReward) addGold(choice.goldReward);
    if (choice.expReward) addExperience(choice.expReward);
    if (choice.healthChange) {
      updateCharacter({ health: Math.max(0, Math.min(state.character.maxHealth, state.character.health + choice.healthChange)) });
    }
    
    setOutcome(choice.outcome);
    completeQuest(questId);
    addNotification(`Квест выполнен! ${choice.goldReward ? `+${choice.goldReward}💰` : ''} ${choice.expReward ? `+${choice.expReward}⭐` : ''}`);
  };

  const handleExplore = () => {
    const events = [
      {
        title: '🌿 Загадочная поляна',
        description: 'Вы вышли на поляну, покрытую светящимися цветами. В центре стоит каменный алтарь.',
        choices: [
          { text: 'Осмотреть алтарь', outcome: 'На алтаре вы нашли древнюю монету! +15 золота', goldReward: 15, expReward: 5 },
          { text: 'Собрать цветы', outcome: 'Цветы обладают целебными свойствами. +20 HP', healthChange: 20, expReward: 5 },
          { text: 'Пройти мимо', outcome: 'Вы осторожно прошли мимо. Ничего не случилось.', expReward: 2 },
        ],
      },
      {
        title: '👹 Засада гоблинов!',
        description: 'Трое гоблинов выпрыгнули из кустов и преграждают вам путь!',
        choices: [
          { text: 'Сражаться!', outcome: 'Вы победили гоблинов! Они уронили кошелёк. +25 золота, +20 опыта', goldReward: 25, expReward: 20, healthChange: -10 },
          { text: 'Попытаться договориться', outcome: 'Гоблины требуют дань. Вы отдаёте 10 золотых, но они пропускают вас.', goldReward: -10, expReward: 5 },
          { text: 'Бежать!', outcome: 'Вы убежали, но потеряли силы. -5 HP', healthChange: -5, expReward: 3 },
        ],
      },
      {
        title: '🏚️ Заброшенная хижина',
        description: 'Вы нашли полуразрушенную хижину в лесу. Дверь приоткрыта...',
        choices: [
          { text: 'Войти и обыскать', outcome: 'Внутри вы нашли сундук с сокровищами! +40 золота', goldReward: 40, expReward: 15 },
          { text: 'Осмотреть снаружи', outcome: 'Вы заметили странные символы на стенах. +10 опыта за наблюдательность', expReward: 10 },
          { text: 'Пройти мимо', outcome: 'Не стоит лезть в неизвестные места. Мудрое решение.', expReward: 3 },
        ],
      },
      {
        title: '🧙 Таинственный странник',
        description: 'На перекрёстке стоит фигура в плаще. Она протягивает вам руку.',
        choices: [
          { text: 'Пожать руку', outcome: 'Странник оказался мудрым магом! Он благословляет вас. +30 опыта', expReward: 30 },
          { text: 'Спросить кто он', outcome: '«Я — тот, кто проверяет храбрость путников.» Он даёт вам 20 золотых.', goldReward: 20, expReward: 10 },
          { text: 'Обойти стороной', outcome: 'Вы обошли странника. Он тихо смеётся вам в спину...', expReward: 0 },
        ],
      },
      {
        title: '🌊 Лесное озеро',
        description: 'Перед вами кристально чистое озеро. На дне что-то блестит.',
        choices: [
          { text: 'Нырнуть за предметом', outcome: 'Вы нашли магический кристалл! +35 золота', goldReward: 35, expReward: 15, healthChange: -5 },
          { text: 'Отдохнуть у воды', outcome: 'Вы отдохнули и восстановили силы. +25 HP', healthChange: 25, expReward: 5 },
          { text: 'Напиться и идти дальше', outcome: 'Свежая вода придаёт сил. +10 HP, +5 опыта', healthChange: 10, expReward: 5 },
        ],
      },
    ];

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    setCurrentEvent(randomEvent);
    setOutcome(null);

    // Chance to unlock a location
    if (Math.random() > 0.6) {
      const lockedLocations = state.locations.filter(l => !l.unlocked);
      if (lockedLocations.length > 0) {
        const loc = lockedLocations[Math.floor(Math.random() * lockedLocations.length)];
        unlockLocation(loc.id);
        addNotification(`🗺️ Новая локация открыта: ${loc.name}!`);
      }
    }
  };

  const handleExploreChoice = (choiceIndex: number) => {
    if (!currentEvent) return;
    const choice = currentEvent.choices[choiceIndex];
    if (choice.goldReward) addGold(choice.goldReward);
    if (choice.expReward) addExperience(choice.expReward);
    if (choice.healthChange) {
      updateCharacter({ health: Math.max(0, Math.min(state.character.maxHealth, state.character.health + choice.healthChange)) });
    }
    setOutcome(choice.outcome);
    addNotification(`${choice.goldReward && choice.goldReward > 0 ? `+${choice.goldReward}💰 ` : ''}${choice.expReward ? `+${choice.expReward}⭐` : ''}`);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-300 mb-2 text-center">⚔️ Приключение</h1>
        <p className="text-gray-400 text-center mb-8">Выбирайте свой путь, герой</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 justify-center">
          <button
            onClick={() => setActiveTab('quests')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'quests' ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            📜 Квесты
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'explore' ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            🌍 Исследовать
          </button>
        </div>

        {/* Quests Tab */}
        {activeTab === 'quests' && (
          <div className="space-y-4">
            {state.questLog.filter(q => !q.completed).length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <div className="text-5xl mb-4">✅</div>
                <p className="text-xl">Все квесты выполнены!</p>
                <p className="text-sm mt-2">Исследуйте мир для новых приключений</p>
              </div>
            )}
            {state.questLog.filter(q => !q.completed).map(quest => (
              <div key={quest.id} className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📜</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{quest.title}</h3>
                    <p className="text-gray-400 mb-4">{quest.description}</p>
                    
                    {state.currentQuest?.id === quest.id ? (
                      <div className="space-y-2">
                        {quest.choices.map((choice, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuestChoice(quest.id, idx)}
                            className="w-full text-left px-4 py-3 bg-gray-700/50 rounded-xl border border-gray-600 hover:border-amber-500/50 hover:bg-gray-700 transition-all text-gray-200 hover:text-white"
                          >
                            → {choice.text}
                          </button>
                        ))}
                        <button
                          onClick={() => setCurrentQuest(null)}
                          className="text-sm text-gray-500 hover:text-gray-300 mt-2"
                        >
                          ← Отмена
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setCurrentQuest(quest)}
                        className="px-4 py-2 bg-purple-600/30 rounded-lg text-purple-300 hover:bg-purple-600/50 transition-all border border-purple-500/30"
                      >
                        Принять квест
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Explore Tab */}
        {activeTab === 'explore' && (
          <div className="space-y-6">
            {!currentEvent ? (
              <div className="text-center">
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-12 border border-purple-500/20">
                  <div className="text-6xl mb-6">🌍</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Исследовать окрестности</h3>
                  <p className="text-gray-400 mb-6">Отправьтесь в случайное приключение. Вас ждут события, награды и опасности!</p>
                  <button
                    onClick={handleExplore}
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white font-bold text-lg hover:from-green-500 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/30 hover:scale-105 transform"
                  >
                    🚶 Отправиться в путь
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 border border-amber-500/20">
                <h3 className="text-2xl font-bold text-white mb-4">{currentEvent.title}</h3>
                <p className="text-gray-300 mb-6 text-lg">{currentEvent.description}</p>
                
                {!outcome ? (
                  <div className="space-y-3">
                    {currentEvent.choices.map((choice, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleExploreChoice(idx)}
                        className="w-full text-left px-5 py-4 bg-gray-700/50 rounded-xl border border-gray-600 hover:border-amber-500/50 hover:bg-gray-700 transition-all text-gray-200 hover:text-white text-lg"
                      >
                        → {choice.text}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gray-700/30 rounded-xl p-5 border border-green-500/30">
                      <p className="text-green-300 text-lg">{outcome}</p>
                    </div>
                    <button
                      onClick={() => { setCurrentEvent(null); setOutcome(null); }}
                      className="px-6 py-3 bg-purple-600/30 rounded-xl text-purple-300 hover:bg-purple-600/50 transition-all border border-purple-500/30"
                    >
                      🔄 Новое приключение
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdventurePage;
