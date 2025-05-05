import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LeaderboardTable.css';

const LeaderboardTable = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('http://localhost:3000/scores');
        setLeaderboard(res.data);
      } catch (err) {
        console.error('Lỗi khi lấy bảng xếp hạng:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);
  const getRankDisplay = (index) => {
    const trophies = ["🏆", "🥈", "🥉"];
    return (
      <div className="rank-cell">
        {index < 3 ? trophies[index] : index + 1}
      </div>
    );
  };
  
  
  
  if (loading) return <p className="loading">⏳ Đang tải bảng xếp hạng...</p>;

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">🏆 Bảng xếp hạng</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Người chơi</th>
            <th>Điểm</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={user.telegram_id}>
              <td className="rank">{getRankDisplay(index)}</td>
              <td className="player">
                <img src={user.avatar} alt="avatar" />
                <span>{user.name}</span>
              </td>
              <td className="score">{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default LeaderboardTable;  