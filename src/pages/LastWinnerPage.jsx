import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import getContract from '../utils/lottery';

function LastWinnerPage() {
  const [lastWinner, setLastWinner] = useState('');
  const [lastPrize, setLastPrize] = useState('');

  const loadWinnerInfo = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);

      const pot = await contract.getBalance();
      const winner = await contract.lastWinner();

      setLastWinner(winner);
      setLastPrize(ethers.formatEther(pot));
    } catch (err) {
      console.error('Failed to load last winner:', err);
    }
  };

  useEffect(() => {
    loadWinnerInfo();
  }, []);

  return (
    <div style={{
      backgroundColor: '#dff0d8',
      border: '2px solid #4caf50',
      padding: '1rem',
      borderRadius: '10px',
      boxShadow: '0 0 15px rgba(76, 175, 80, 0.5)',
      animation: 'pulse 1.5s infinite',
      maxWidth: '500px',
      margin: '2rem auto'
    }}>
      <h3>🎉 Last Winner</h3>
      <p><strong>Address:</strong> <code>{lastWinner}</code></p>
      <p><strong>Prize:</strong> {lastPrize} ETH</p>
    </div>
  );
}

export default LastWinnerPage;

