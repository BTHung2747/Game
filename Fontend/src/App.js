import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './style.css';

import LeaderboardPage from './pages/LeaderboardPage';
import GamePage from './pages/GamePage';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="mb-6 text-lg">Chào mừng bạn đến với trò chơi </p>
      <button
        onClick={() => navigate('/game')}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-xl shadow-lg transition"
      >
        Bắt đầu chơi
      </button>
    </div>
  );
}

function AppLayout() {
  const location = useLocation();
  const isGamePage = location.pathname === '/game';

  return (
    <div className="App p-4 min-h-screen bg-sky-100">
      {!isGamePage && (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center">Flappy Bird Mini App</h1>
          <nav className="mb-6 text-center">
            <Link to="/" className="mr-4 text-blue-600 hover:underline">Trang chủ</Link>
            <Link to="/leaderboard" className="text-blue-600 hover:underline">Bảng xếp hạng</Link>
          </nav>
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/game" element={<GamePage />} />
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
