import React, { useEffect, useState } from 'react';
import MissionItem from './MissionItem';
import axios from 'axios';

const MissionList = ({ telegramId }) => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE}/user-missions/${telegramId}`);
        setMissions(res.data);
      } catch (err) {
        console.error('Lỗi khi lấy danh sách nhiệm vụ:', err);
      } finally {
        setLoading(false);
      }
    };

    if (telegramId) fetchMissions();
  }, [telegramId]);

  if (loading) return <p className="text-center mt-4">⏳ Đang tải nhiệm vụ...</p>;

  return (
    <div className="p-4">
      {missions.length === 0 ? (
        <p className="text-center text-gray-500">Chưa có nhiệm vụ nào</p>
      ) : (
        missions.map((m) => <MissionItem key={m.id} mission={m} />)
      )}
    </div>
  );
};

export default MissionList;
