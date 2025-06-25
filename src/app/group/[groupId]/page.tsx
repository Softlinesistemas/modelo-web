'use client';
import React, { useState } from 'react';
import GroupHeader from '@/components/groups/GroupHeader';
import GroupTabs from '@/components/groups//GroupTabs';
import ForumTopic from '@/components/groups//ForumTopic';
import ChatArea from '@/components/groups//ChatArea';
import MemberList from '@/components/groups//MemberList';

const GroupPage = () => {
  const [selectedTab, setSelectedTab] = useState<'forum' | 'chat' | 'members'>('forum');

  return (
    <div className="max-w-full justify-center items-center p-4">
      
      <GroupHeader
        name="Comunidade Inovadores"
        description="Discussões sobre ideias criativas"
        image="/grupo-capa.jpg"
      />

      <GroupTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />

      {selectedTab === 'forum' && <ForumTopic />}
      {selectedTab === 'chat' && <ChatArea />}
      {selectedTab === 'members' && <MemberList />}
    </div>
  );
};

export default GroupPage;
