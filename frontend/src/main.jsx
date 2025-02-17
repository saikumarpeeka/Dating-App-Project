import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Mount the React app inside the root div
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

