'use client';

import React from 'react';

interface GroupTabsProps {
  selectedTab: 'forum' | 'chat' | 'members';
  onTabChange: (tab: 'forum' | 'chat' | 'members') => void;
}

const GroupTabs: React.FC<GroupTabsProps> = ({ selectedTab, onTabChange }) => {
  const tabs = [
    { label: 'Fórum', value: 'forum' },
    { label: 'Chat Rápido', value: 'chat' },
    { label: 'Membros', value: 'members' },
  ];

  return (
    <div className="flex border-b mb-2">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value as 'forum' | 'chat' | 'members')}
          className={`flex-1 text-center p-2 font-medium transition ${
            selectedTab === tab.value
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-blue-500'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default GroupTabs;
