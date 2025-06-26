import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GameLogic from './components/GameLogic';

// Displays the Monty Hall problem to the user.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameLogic />
  </React.StrictMode>
);

