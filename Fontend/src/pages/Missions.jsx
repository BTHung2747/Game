import React from 'react';
import MissionList from '../components/missions/MissionList';
import { useTelegram } from '../telegram';

export default function Missions() {
  const { user } = useTelegram(); // lấy telegram_id
  return (
    <div>
      <h2 className="text-xl font-bold p-4">🎯 Nhiệm vụ hôm nay</h2>
      <MissionList telegramId={user?.id} />
    </div>
  );
}
