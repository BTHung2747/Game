import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  return (
    <Router>
      <div className="App p-4">
        <h1 className="text-2xl font-bold mb-4">🐔 Game Bắn Gà MiniApp</h1>
        <nav className="mb-4">
          <Link to="/" className="mr-4">Trang chủ</Link>
          <Link to="/leaderboard">Bảng xếp hạng</Link>
        </nav>

        <Routes>
          <Route path="/" element={<p>Chào mừng bạn đến với trò chơi!</p>} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
