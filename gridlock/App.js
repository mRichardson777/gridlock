import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import GameScreen from './src/screens/GameScreen';
import ResultsScreen from './src/screens/ResultsScreen';

export default function App() {
  const [screen, setScreen] = useState('game'); // 'game' | 'results'
  const [results, setResults] = useState([]);
  const [streak] = useState(1); // Placeholder — will be persisted in a later update

  const handleSessionEnd = (sessionResults) => {
    setResults(sessionResults);
    setScreen('results');
  };

  const handlePlayAgain = () => {
    setResults([]);
    setScreen('game');
  };

  return (
    <>
      <StatusBar style="dark" />
      {screen === 'game' ? (
        <GameScreen onSessionEnd={handleSessionEnd} />
      ) : (
        <ResultsScreen
          results={results}
          streak={streak}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </>
  );
}
