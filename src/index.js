import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// This finds the empty "root" box in your HTML and injects the Hollow Realm engine into it
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
