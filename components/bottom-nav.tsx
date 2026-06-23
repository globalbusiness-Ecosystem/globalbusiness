'use client';

import { Home, LayoutDashboard, Bell, Map, User, Users } from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'map', label: 'Map', icon: Map },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'partners', label: 'Partners', icon: Users },
];

export function BottomNav() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t-2 border-yellow-500 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex justify-around items-center">
          {NAV_ITEMS.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'text-yellow-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <IconComponent className="w-6 h-6" />
                <span className="text-xs font-semibold">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
