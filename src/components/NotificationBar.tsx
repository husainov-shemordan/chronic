import React from 'react';
import { useGame } from '../context/GameContext';

const NotificationBar: React.FC = () => {
  const { state } = useGame();

  if (state.notifications.length === 0) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 space-y-2">
      {state.notifications.map((msg, idx) => (
        <div
          key={idx}
          className="bg-gradient-to-r from-purple-900/90 to-indigo-900/90 text-white px-6 py-3 rounded-xl shadow-2xl shadow-purple-500/20 border border-purple-500/30 backdrop-blur-sm animate-fade-in text-center"
        >
          {msg}
        </div>
      ))}
    </div>
  );
};

export default NotificationBar;
