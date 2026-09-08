import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-pulse">✨</div>
        <div className="absolute top-20 right-20 text-4xl opacity-20 animate-pulse delay-700">🌟</div>
        <div className="absolute bottom-20 left-1/4 text-5xl opacity-15 animate-pulse delay-1000">⚡</div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="text-7xl mb-6 animate-bounce">🐉</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
            Хроники Эльдории
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
            Эпическое RPG-приключение в мире магии и мечей
          </p>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Исследуйте древние земли, сражайтесь с чудовищами, собирайте сокровища 
            и раскройте тайны забытого королевства. Ваша история начинается здесь.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/adventure"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-bold text-lg hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transform"
            >
              ⚔️ Начать приключение
            </Link>
            <Link
              to="/character"
              className="px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl text-gray-200 font-bold text-lg hover:from-gray-600 hover:to-gray-700 transition-all border border-gray-600 hover:border-gray-500 hover:scale-105 transform"
            >
              👤 Мой герой
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-amber-300 mb-12">🌍 Мир Эльдории</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:transform hover:scale-105">
              <div className="text-4xl mb-4">⚔️</div>
              <h3 className="text-xl font-bold text-white mb-2">Эпические квесты</h3>
              <p className="text-gray-400">Принимайте решения, влияющие на историю. Каждый выбор имеет последствия.</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:transform hover:scale-105">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold text-white mb-2">Открытый мир</h3>
              <p className="text-gray-400">Исследуйте 7 уникальных локаций — от тихих деревень до логова дракона.</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:transform hover:scale-105">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-white mb-2">Прокачка героя</h3>
              <p className="text-gray-400">Развивайте характеристики, собирайте экипировку и становитесь сильнее.</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:transform hover:scale-105">
              <div className="text-4xl mb-4">🎒</div>
              <h3 className="text-xl font-bold text-white mb-2">Система инвентаря</h3>
              <p className="text-gray-400">Собирайте оружие, доспехи, зелья и магические свитки.</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:transform hover:scale-105">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-xl font-bold text-white mb-2">Торговля</h3>
              <p className="text-gray-400">Покупайте и продавайте товары у торговцев. Торгуйтесь за лучшую цену!</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:transform hover:scale-105">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-white mb-2">Достижения</h3>
              <p className="text-gray-400">Открывайте новые локации, выполняйте квесты и повышайте уровень.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lore Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-300 mb-8">📜 Предание</h2>
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-amber-500/20 backdrop-blur-sm">
            <p className="text-gray-300 text-lg leading-relaxed italic">
              «Тысячу лет назад, когда драконы ещё парили над горами Эльдории, 
              великие маги запечатали Древнее Зло в недрах вулкана Крар'Тот. 
              Но печать слабеет... Тени сгущаются. И лишь один герой способен 
              восстановить равновесие. Этот герой — ты.»
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-800/30 rounded-xl">
              <div className="text-3xl mb-2">🗡️</div>
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-sm text-gray-400">Квеста доступно</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-xl">
              <div className="text-3xl mb-2">📍</div>
              <div className="text-2xl font-bold text-white">7</div>
              <div className="text-sm text-gray-400">Локаций</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-xl">
              <div className="text-3xl mb-2">🎭</div>
              <div className="text-2xl font-bold text-white">∞</div>
              <div className="text-sm text-gray-400">Вариантов</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-xl">
              <div className="text-3xl mb-2">🐉</div>
              <div className="text-2xl font-bold text-white">1</div>
              <div className="text-sm text-gray-400">Древний дракон</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
