import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './style.css';

import LeaderboardPage from './pages/LeaderboardPage';
import GamePage from './pages/GamePage';
import GameHomePage from './pages/GameHomePage'; // ✅ import GameHomePage

function AppLayout() {
  const location = useLocation();
  const isGamePage = location.pathname === '/game';
  const isHomePage = location.pathname === '/'; // ✅ kiểm tra nếu đang ở GameHome

  return (
    <div className="App min-h-screen bg-sky-100">
      {!(isGamePage || isHomePage) && ( // ✅ ẩn header nếu đang ở /game hoặc /
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Flappy Bird Mini App</h1>
          <nav className="mb-6 text-center">
            <Link to="/" className="mr-4 text-blue-600 hover:underline">Trang chủ</Link>
            <Link to="/leaderboard" className="text-blue-600 hover:underline">Bảng xếp hạng</Link>
          </nav>
        </div>
      )}

      <Routes>
        <Route path="/" element={<GameHomePage />} /> {/* ✅ hiển thị đầu tiên */}
        <Route path="/game" element={<GamePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="*" element={<GamePage />} /> {/* fallback */}
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
