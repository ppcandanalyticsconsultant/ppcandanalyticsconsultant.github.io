
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Note: To use React Router, you would typically run:
// npm install react-router-dom
// npm install --save-dev @types/react-router-dom

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
