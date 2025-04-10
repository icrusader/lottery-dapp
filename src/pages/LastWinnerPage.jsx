import { useLocation, useNavigate } from 'react-router-dom';

function LastWinnerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { winnerAddress, winnerAmount } = location.state || {};

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>🎉 Last Winner</h2>
      {winnerAddress && winnerAmount ? (
        <>
          <p><strong>Address:</strong> {winnerAddress}</p>
          <p><strong>Amount Won:</strong> {winnerAmount} ETH</p>
          <button onClick={() => navigate('/')}>🏠 Back to Home</button>
        </>
      ) : (
        <>
          <p>No winner data found.</p>
          <button onClick={() => navigate('/')}>🏠 Back to Home</button>
        </>
      )}
    </div>
  );
}

export default LastWinnerPage;

