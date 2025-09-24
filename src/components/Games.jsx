import { useState } from 'react';
import './Games.css';

const Games = () => {
  const [gameBoard, setGameBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameStats, setGameStats] = useState({ x: 0, o: 0, draws: 0 });

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (gameBoard[i] || winner) {
      return;
    }
    
    const newBoard = gameBoard.slice();
    newBoard[i] = isXNext ? 'X' : 'O';
    setGameBoard(newBoard);
    
    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameStats(prev => ({
        ...prev,
        [gameWinner.toLowerCase()]: prev[gameWinner.toLowerCase()] + 1
      }));
    } else if (newBoard.every(square => square !== null)) {
      setWinner('Draw');
      setGameStats(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
    
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setGameBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const resetStats = () => {
    setGameStats({ x: 0, o: 0, draws: 0 });
  };

  const renderSquare = (i) => {
    return (
      <button
        className={`game-square ${gameBoard[i] ? 'filled' : ''}`}
        onClick={() => handleClick(i)}
      >
        {gameBoard[i]}
      </button>
    );
  };

  const getStatus = () => {
    if (winner === 'Draw') {
      return "It's a draw!";
    } else if (winner) {
      return `Winner: ${winner}`;
    } else {
      return `Next player: ${isXNext ? 'X' : 'O'}`;
    }
  };

  const otherGames = [
    {
      id: 1,
      name: 'Memory Match',
      description: 'Test your memory with this classic card matching game',
      image: '🧠',
      status: 'Coming Soon'
    },
    {
      id: 2,
      name: 'Word Puzzle',
      description: 'Find words in this challenging word search game',
      image: '🔤',
      status: 'Coming Soon'
    },
    {
      id: 3,
      name: 'Number Game',
      description: 'Solve mathematical puzzles and challenges',
      image: '🔢',
      status: 'Coming Soon'
    },
    {
      id: 4,
      name: 'Color Match',
      description: 'Match colors in this fast-paced puzzle game',
      image: '🎨',
      status: 'Coming Soon'
    }
  ];

  return (
    <div className="games-page">
      <div className="games-header">
        <h1>Facebook Games</h1>
        <p>Play games and challenge your friends!</p>
      </div>

      <div className="games-content">
        <div className="featured-game">
          <div className="game-card main-game">
            <div className="game-header">
              <h2>🎯 Tic Tac Toe</h2>
              <div className="game-stats">
                <div className="stat">
                  <span className="stat-label">X Wins:</span>
                  <span className="stat-value">{gameStats.x}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">O Wins:</span>
                  <span className="stat-value">{gameStats.o}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Draws:</span>
                  <span className="stat-value">{gameStats.draws}</span>
                </div>
              </div>
            </div>

            <div className="game-status">
              <h3>{getStatus()}</h3>
            </div>

            <div className="game-board">
              <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
              </div>
              <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
              </div>
              <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
              </div>
            </div>

            <div className="game-controls">
              <button className="btn btn-primary" onClick={resetGame}>
                New Game
              </button>
              <button className="btn btn-secondary" onClick={resetStats}>
                Reset Stats
              </button>
            </div>

            <div className="game-rules">
              <h4>How to Play:</h4>
              <ul>
                <li>Players take turns placing X's and O's on the grid</li>
                <li>First player to get 3 in a row (horizontal, vertical, or diagonal) wins</li>
                <li>If all squares are filled with no winner, it's a draw</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="other-games">
          <h3>More Games Coming Soon</h3>
          <div className="games-grid">
            {otherGames.map(game => (
              <div key={game.id} className="game-card">
                <div className="game-icon">{game.image}</div>
                <div className="game-info">
                  <h4>{game.name}</h4>
                  <p>{game.description}</p>
                  <div className="game-status-badge">
                    {game.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="leaderboard">
          <h3>🏆 Your Game Stats</h3>
          <div className="leaderboard-content">
            <div className="total-games">
              <div className="total-number">
                {gameStats.x + gameStats.o + gameStats.draws}
              </div>
              <div className="total-label">Total Games Played</div>
            </div>
            
            <div className="win-rate">
              <div className="win-percentage">
                {gameStats.x + gameStats.o + gameStats.draws > 0 
                  ? Math.round(((gameStats.x + gameStats.o) / (gameStats.x + gameStats.o + gameStats.draws)) * 100)
                  : 0}%
              </div>
              <div className="win-label">Win Rate</div>
            </div>
          </div>
        </div>

        <div className="game-achievements">
          <h3>🎖️ Achievements</h3>
          <div className="achievements-grid">
            <div className={`achievement ${gameStats.x + gameStats.o >= 1 ? 'unlocked' : 'locked'}`}>
              <div className="achievement-icon">🎯</div>
              <div className="achievement-info">
                <div className="achievement-name">First Win</div>
                <div className="achievement-desc">Win your first game</div>
              </div>
            </div>
            
            <div className={`achievement ${gameStats.x + gameStats.o >= 5 ? 'unlocked' : 'locked'}`}>
              <div className="achievement-icon">🔥</div>
              <div className="achievement-info">
                <div className="achievement-name">On Fire</div>
                <div className="achievement-desc">Win 5 games</div>
              </div>
            </div>
            
            <div className={`achievement ${gameStats.x + gameStats.o >= 10 ? 'unlocked' : 'locked'}`}>
              <div className="achievement-icon">👑</div>
              <div className="achievement-info">
                <div className="achievement-name">Champion</div>
                <div className="achievement-desc">Win 10 games</div>
              </div>
            </div>
            
            <div className={`achievement ${gameStats.draws >= 3 ? 'unlocked' : 'locked'}`}>
              <div className="achievement-icon">🤝</div>
              <div className="achievement-info">
                <div className="achievement-name">Peacekeeper</div>
                <div className="achievement-desc">Draw 3 games</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;