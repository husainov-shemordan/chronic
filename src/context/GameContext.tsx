import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Item {
  id: string;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'potion' | 'scroll' | 'quest';
  icon: string;
  price: number;
  stats?: { attack?: number; defense?: number; health?: number; magic?: number };
  equipped?: boolean;
}

export interface Character {
  name: string;
  level: number;
  experience: number;
  maxExperience: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  attack: number;
  defense: number;
  magic: number;
  gold: number;
  class: string;
}

export interface GameLocation {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  x: number;
  y: number;
  dangerLevel: number;
}

export interface QuestEvent {
  id: string;
  title: string;
  description: string;
  choices: { text: string; outcome: string; goldReward?: number; expReward?: number; healthChange?: number; itemId?: string }[];
  completed: boolean;
}

interface GameState {
  character: Character;
  inventory: Item[];
  locations: GameLocation[];
  currentLocation: string;
  questLog: QuestEvent[];
  currentQuest: QuestEvent | null;
  notifications: string[];
}

interface GameContextType {
  state: GameState;
  addGold: (amount: number) => void;
  spendGold: (amount: number) => boolean;
  addExperience: (amount: number) => void;
  addItem: (item: Item) => void;
  removeItem: (itemId: string) => void;
  equipItem: (itemId: string) => void;
  usePotion: (itemId: string) => void;
  unlockLocation: (locationId: string) => void;
  setCurrentLocation: (locationId: string) => void;
  setCurrentQuest: (quest: QuestEvent | null) => void;
  completeQuest: (questId: string) => void;
  addNotification: (msg: string) => void;
  clearNotifications: () => void;
  updateCharacter: (updates: Partial<Character>) => void;
}

const defaultCharacter: Character = {
  name: 'Странник',
  level: 1,
  experience: 0,
  maxExperience: 100,
  health: 100,
  maxHealth: 100,
  mana: 50,
  maxMana: 50,
  attack: 10,
  defense: 5,
  magic: 8,
  gold: 50,
  class: 'Воин',
};

const defaultInventory: Item[] = [
  {
    id: 'rusty-sword',
    name: 'Ржавый меч',
    description: 'Старый меч, видавший виды. Всё ещё режет.',
    type: 'weapon',
    icon: '⚔️',
    price: 15,
    stats: { attack: 5 },
    equipped: true,
  },
  {
    id: 'leather-armor',
    name: 'Кожаный доспех',
    description: 'Простая, но надёжная защита.',
    type: 'armor',
    icon: '🛡️',
    price: 20,
    stats: { defense: 3 },
    equipped: true,
  },
  {
    id: 'health-potion-1',
    name: 'Зелье здоровья',
    description: 'Восстанавливает 30 HP.',
    type: 'potion',
    icon: '🧪',
    price: 10,
    stats: { health: 30 },
  },
];

const defaultLocations: GameLocation[] = [
  { id: 'village', name: 'Деревня Светлый Дол', description: 'Тихая деревня у подножия гор. Здесь начинается ваш путь.', icon: '🏘️', unlocked: true, x: 20, y: 60, dangerLevel: 1 },
  { id: 'forest', name: 'Тёмный лес', description: 'Густой лес, полный тайн и опасностей.', icon: '🌲', unlocked: true, x: 40, y: 40, dangerLevel: 2 },
  { id: 'cave', name: 'Пещеры Эхо', description: 'Система пещер, где эхо хранит голоса древних.', icon: '🕳️', unlocked: false, x: 60, y: 70, dangerLevel: 3 },
  { id: 'castle', name: 'Замок Теней', description: 'Заброшенный замок на вершине утёса.', icon: '🏰', unlocked: false, x: 75, y: 30, dangerLevel: 4 },
  { id: 'dragon-lair', name: 'Логово Дракона', description: 'Вулканическая пещера, где спит древний дракон.', icon: '🐉', unlocked: false, x: 90, y: 50, dangerLevel: 5 },
  { id: 'temple', name: 'Храм Мудрости', description: 'Древний храм, где можно познать магию.', icon: '🏛️', unlocked: false, x: 35, y: 20, dangerLevel: 2 },
  { id: 'market', name: 'Торговый город', description: 'Шумный город с лучшими торговцами.', icon: '🏪', unlocked: true, x: 50, y: 55, dangerLevel: 1 },
];

const defaultQuests: QuestEvent[] = [
  {
    id: 'q1',
    title: 'Странная просьба',
    description: 'Старый лесник просит вас investigate странные звуки из Тёмного леса. Он обещает награду.',
    choices: [
      { text: 'Отправиться в лес', outcome: 'Вы нашли раненого оленя и помогли ему. Лесник благодарит вас и дарит 20 золотых.', goldReward: 20, expReward: 15 },
      { text: 'Попросить больше золота заранее', outcome: 'Лесник недоволен, но даёт вам 10 золотых авансом. Вы идёте в лес и находите древний амулет.', goldReward: 10, expReward: 10 },
      { text: 'Отказаться', outcome: 'Вы отказались. Ничего не произошло, но и награды нет.', expReward: 0 },
    ],
    completed: false,
  },
  {
    id: 'q2',
    title: 'Торговец в беде',
    description: 'На дороге вы встречаете ограбленного торговца. Он просит помощи.',
    choices: [
      { text: 'Помочь и провести до города', outcome: 'Торговец благодарен и дарит вам зелье. Его история о драконе интригует...', goldReward: 5, expReward: 20 },
      { text: 'Обыскать место нападения', outcome: 'Вы нашли кошель с 30 золотыми! Но на вас напал волк. (-15 HP)', goldReward: 30, expReward: 10, healthChange: -15 },
      { text: 'Пройти мимо', outcome: 'Вы прошли мимо. Торговец обречённо смотрит вам в спину.', expReward: -5 },
    ],
    completed: false,
  },
  {
    id: 'q3',
    title: 'Тайна храма',
    description: 'Жрец храма просит разгадать загадку древних рунил. Это испытание вашей мудрости.',
    choices: [
      { text: 'Медитировать перед рунами', outcome: 'Вы постигли секрет рун! Ваша магия возросла. (+5 магии)', expReward: 30 },
      { text: 'Попросить подсказку у библиотекаря', outcome: 'Библиотекаръ помог вам. Вы узнали новое заклинание. (+10 маны)', expReward: 15 },
      { text: 'Игнорировать руны', outcome: 'Вы ушли из храма. Жрец разочарован.', expReward: 0 },
    ],
    completed: false,
  },
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>({
    character: defaultCharacter,
    inventory: defaultInventory,
    locations: defaultLocations,
    currentLocation: 'village',
    questLog: defaultQuests,
    currentQuest: null,
    notifications: [],
  });

  const addGold = (amount: number) => {
    setState(prev => ({
      ...prev,
      character: { ...prev.character, gold: prev.character.gold + amount },
    }));
  };

  const spendGold = (amount: number): boolean => {
    if (state.character.gold < amount) return false;
    setState(prev => ({
      ...prev,
      character: { ...prev.character, gold: prev.character.gold - amount },
    }));
    return true;
  };

  const addExperience = (amount: number) => {
    setState(prev => {
      let newExp = prev.character.experience + amount;
      let newLevel = prev.character.level;
      let newMaxExp = prev.character.maxExperience;
      let newMaxHealth = prev.character.maxHealth;
      let newMaxMana = prev.character.maxMana;
      let newAttack = prev.character.attack;
      let newDefense = prev.character.defense;
      let newMagic = prev.character.magic;

      while (newExp >= newMaxExp) {
        newExp -= newMaxExp;
        newLevel++;
        newMaxExp = Math.floor(newMaxExp * 1.5);
        newMaxHealth += 15;
        newMaxMana += 8;
        newAttack += 2;
        newDefense += 1;
        newMagic += 2;
      }

      return {
        ...prev,
        character: {
          ...prev.character,
          experience: newExp,
          level: newLevel,
          maxExperience: newMaxExp,
          maxHealth: newMaxHealth,
          maxMana: newMaxMana,
          health: newLevel > prev.character.level ? newMaxHealth : prev.character.health,
          mana: newLevel > prev.character.level ? newMaxMana : prev.character.mana,
          attack: newAttack,
          defense: newDefense,
          magic: newMagic,
        },
      };
    });
  };

  const addItem = (item: Item) => {
    setState(prev => ({
      ...prev,
      inventory: [...prev.inventory, item],
    }));
  };

  const removeItem = (itemId: string) => {
    setState(prev => ({
      ...prev,
      inventory: prev.inventory.filter(i => i.id !== itemId),
    }));
  };

  const equipItem = (itemId: string) => {
    setState(prev => {
      const item = prev.inventory.find(i => i.id === itemId);
      if (!item || (item.type !== 'weapon' && item.type !== 'armor')) return prev;

      const newInventory = prev.inventory.map(i => {
        if (i.type === item.type) return { ...i, equipped: false };
        if (i.id === itemId) return { ...i, equipped: true };
        return i;
      });

      return { ...prev, inventory: newInventory };
    });
  };

  const usePotion = (itemId: string) => {
    setState(prev => {
      const item = prev.inventory.find(i => i.id === itemId);
      if (!item || item.type !== 'potion') return prev;

      return {
        ...prev,
        character: {
          ...prev.character,
          health: Math.min(prev.character.maxHealth, prev.character.health + (item.stats?.health || 0)),
          mana: Math.min(prev.character.maxMana, prev.character.mana + (item.stats?.magic || 0)),
        },
        inventory: prev.inventory.filter(i => i.id !== itemId),
      };
    });
  };

  const unlockLocation = (locationId: string) => {
    setState(prev => ({
      ...prev,
      locations: prev.locations.map(l => l.id === locationId ? { ...l, unlocked: true } : l),
    }));
  };

  const setCurrentLocation = (locationId: string) => {
    setState(prev => ({ ...prev, currentLocation: locationId }));
  };

  const setCurrentQuest = (quest: QuestEvent | null) => {
    setState(prev => ({ ...prev, currentQuest: quest }));
  };

  const completeQuest = (questId: string) => {
    setState(prev => ({
      ...prev,
      questLog: prev.questLog.map(q => q.id === questId ? { ...q, completed: true } : q),
      currentQuest: null,
    }));
  };

  const addNotification = (msg: string) => {
    setState(prev => ({
      ...prev,
      notifications: [...prev.notifications, msg],
    }));
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        notifications: prev.notifications.slice(1),
      }));
    }, 3000);
  };

  const clearNotifications = () => {
    setState(prev => ({ ...prev, notifications: [] }));
  };

  const updateCharacter = (updates: Partial<Character>) => {
    setState(prev => ({
      ...prev,
      character: { ...prev.character, ...updates },
    }));
  };

  return (
    <GameContext.Provider value={{
      state,
      addGold,
      spendGold,
      addExperience,
      addItem,
      removeItem,
      equipItem,
      usePotion,
      unlockLocation,
      setCurrentLocation,
      setCurrentQuest,
      completeQuest,
      addNotification,
      clearNotifications,
      updateCharacter,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
