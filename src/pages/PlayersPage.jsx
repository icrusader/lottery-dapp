import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import getContract from '../utils/lottery';

function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  const loadPlayers = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);
      const list = await contract.getPlayers();
      setPlayers(list);
    } catch (err) {
      console.error('Failed to load players:', err);
    }
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  return (
    <div>
      <h2>👥 Current Players</h2>
      {players.length === 0 ? (
        <p>No one has entered the lottery yet.</p>
      ) : (
        <ul style={{ paddingLeft: '1rem' }}>
          {players.map((player, i) => (
            <li key={i}><code>{player}</code></li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/')}>🏠 Back to Home</button>
    </div>
  );
}

export default PlayersPage;

