import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import getContract from './utils/lottery';

function App() {
  const [account, setAccount] = useState('');
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('0');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const [lastWinner, setLastWinner] = useState('');
  const [lastPrize, setLastPrize] = useState('');

  const loadBlockchainData = async () => {
    if (!window.ethereum) {
      setError('MetaMask is not installed.');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);

      const accounts = await provider.send('eth_accounts', []);
      if (accounts.length === 0) {
        setError('Please connect your wallet.');
        return;
      }

      const userAccount = accounts[0];
      setAccount(userAccount);
      setIsConnected(true);

      const managerAddress = await contract.manager();
      const playersList = await contract.getPlayers();
      const pot = await contract.getBalance();
      const last = await contract.lastWinner();

      setManager(managerAddress);
      setPlayers(playersList);
      setBalance(ethers.formatEther(pot));
      setLastWinner(last);
    } catch (err) {
      console.error(err);
      setError('Error loading data. Check console.');
    }
  };

  const enterLottery = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);

      const tx = await contract.enter({ value: ethers.parseEther("0.01") });
      await tx.wait();
      alert("🎉 You entered the lottery!");
      loadBlockchainData(); // refresh info
    } catch (err) {
      console.error("Enter failed:", err);
      alert("❌ Error entering lottery.");
    }
  };

  const pickWinner = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);

      const currentPot = await contract.getBalance(); // 💰 pot before picking
      const tx = await contract.pickWinner();
      await tx.wait();

      const winner = await contract.lastWinner();
      setLastWinner(winner);
      setLastPrize(ethers.formatEther(currentPot));

      alert(`🎊 Winner picked! ${winner} won ${ethers.formatEther(currentPot)} ETH`);
      loadBlockchainData();
    } catch (err) {
      console.error("Error picking winner:", err);
      alert("❌ Only the manager can pick the winner.");
    }
  };

  useEffect(() => {
    loadBlockchainData();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        loadBlockchainData();
      });
    }
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎟️ Lottery DApp</h1>

      {!isConnected ? (
        <>
          <p><strong>Account:</strong> Not connected</p>
          <p><strong>Manager:</strong> Not available</p>
          <p><strong>Players:</strong> 0</p>
          <p><strong>Pot:</strong> 0 ETH</p>
          <p style={{ color: 'red' }}>{error}</p>
          <button onClick={loadBlockchainData}>🔌 Connect Wallet</button>
        </>
      ) : (
        <>
          <p><strong>Account:</strong> {account}</p>
          <p><strong>Manager:</strong> {manager}</p>
          <p><strong>Players:</strong> {players.length}</p>
          <ul style={{ paddingLeft: '1rem' }}>
            {players.map((player, i) => (
              <li key={i}><code>{player}</code></li>
            ))}
          </ul>
          <p><strong>Pot:</strong> {balance} ETH</p>

          {/* Winner Highlight Box */}
          {lastWinner && (
            <div style={{
              backgroundColor: '#dff0d8',
              border: '2px solid #4caf50',
              padding: '1rem',
              borderRadius: '10px',
              marginTop: '1rem',
              boxShadow: '0 0 15px rgba(76, 175, 80, 0.5)',
              animation: 'pulse 1.5s infinite'
            }}>
              <h3>🎉 Winner!</h3>
              <p><strong>Address:</strong> <code>{lastWinner}</code></p>
              <p><strong>Prize:</strong> {lastPrize} ETH</p>
            </div>
          )}

          <button onClick={enterLottery}>💸 Enter Lottery (0.01 ETH)</button>

          {account.toLowerCase() === manager.toLowerCase() && (
            <button onClick={pickWinner} style={{ marginTop: '1rem', marginLeft: '1rem' }}>
              🏆 Pick Winner (Manager Only)
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default App;


