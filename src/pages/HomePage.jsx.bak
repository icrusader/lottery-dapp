import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import getContract from '../utils/lottery';

function HomePage() {
  const [account, setAccount] = useState('');
  const [manager, setManager] = useState('');
  const [balance, setBalance] = useState('0');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const [winnerAmount, setWinnerAmount] = useState('');
  const [winnerAddress, setWinnerAddress] = useState('');
  const [showWinnerModal, setShowWinnerModal] = useState(false);

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
      const userAccount = accounts[0];
      setAccount(userAccount);
      setIsConnected(true);

      const managerAddress = await contract.manager();
      const pot = await contract.getBalance();

      setManager(managerAddress);
      setBalance(ethers.formatEther(pot));
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

      const tx = await contract.enter({ value: ethers.parseEther("1") });
      await tx.wait();
      alert("🎉 You entered the lottery!");
      loadBlockchainData();
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

      const potBeforePicking = await contract.getBalance();
      const formattedPot = ethers.formatEther(potBeforePicking);
      setWinnerAmount(formattedPot);

      const tx = await contract.pickWinner();
      await tx.wait();

      const winner = await contract.lastWinner();
      setWinnerAddress(winner);

      setShowWinnerModal(true);
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
    <>
      {showWinnerModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '10px',
            textAlign: 'center',
            maxWidth: '450px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
          }}>
            <h2>🎉 Winner Picked!</h2>
            <p><strong>Address:</strong> {winnerAddress}</p>
            <p><strong>Amount:</strong> {winnerAmount} ETH</p>
            <button onClick={() => setShowWinnerModal(false)} style={{ marginTop: '1rem' }}>
              Close
            </button>
          </div>
        </div>
      )}

      {!isConnected ? (
        <>
          <p><strong>Account:</strong> Not connected</p>
          <p style={{ color: 'red' }}>{error}</p>
          <button onClick={loadBlockchainData}>🔌 Connect Wallet</button>
        </>
      ) : (
        <>
          <p><strong>Account:</strong> {account}</p>
          <p><strong>Pot:</strong> {balance} ETH</p>
          <button onClick={enterLottery}>💸 Enter Lottery (1 ETH)</button>
          {account.toLowerCase() === manager.toLowerCase() && (
            <button onClick={pickWinner} style={{ marginTop: '1rem', marginLeft: '1rem' }}>
              🏆 Pick Winner (Manager Only)
            </button>
          )}
        </>
      )}
    </>
  );
}

export default HomePage;

