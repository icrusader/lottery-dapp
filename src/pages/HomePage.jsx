import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import getContract from '../utils/lottery';

function HomePage() {
  const [account, setAccount] = useState('');
  const [manager, setManager] = useState('');
  const [balance, setBalance] = useState('0');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

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

      const tx = await contract.pickWinner();
      await tx.wait();

      const winner = await contract.lastWinner();

      // Navigate to LastWinnerPage with winner data
      navigate('/last-winner', {
        state: {
          winnerAddress: winner,
          winnerAmount: formattedPot,
        },
      });
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

