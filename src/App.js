import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Board from './components/Board';
import Game from './components/Game';
import SignInUp from './components/SignInUp';
import Winner from './components/Winner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/game/:username" element={<Game />} />
        <Route path="/signInUp" element={<SignInUp />} />
        <Route path="/winner" element={<Winner />} />
      </Routes>
    </Router>
  );
}

export default App;
