import React from 'react';

const MissionItem = ({ mission }) => {
  const { name, description, reward_gold, completed } = mission;

  return (
    <div className={`p-4 rounded-xl shadow mb-4 ${completed ? 'bg-green-100' : 'bg-white'}`}>
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-yellow-600 font-semibold">+{reward_gold} vàng</span>
        {completed ? (
          <span className="text-green-700 font-bold">✔ Hoàn thành</span>
        ) : (
          <span className="text-red-500 font-semibold">Chưa xong</span>
        )}
      </div>
    </div>
  );
};

export default MissionItem;
