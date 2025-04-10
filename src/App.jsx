import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LastWinnerPage from './pages/LastWinnerPage';
import PlayersPage from './pages/PlayersPage';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        background: '#ffffff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <h1>🎟️ Lottery App</h1>
        <Navbar />

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

