import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LastWinnerPage from './pages/LastWinnerPage';
import PlayersPage from './pages/PlayersPage';

function App() {
  return (
    <Router>
      <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <h1>🎟️ Lottery DApp</h1>

        <nav style={{ marginBottom: '2rem' }}>
          <Link to="/" style={{ marginRight: '1rem' }}>🏠 Home</Link>
          <Link to="/players" style={{ marginRight: '1rem' }}>👥 Players</Link>
          <Link to="/last-winner">🥇 Last Winner</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/last-winner" element={<LastWinnerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

