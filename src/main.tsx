// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { getRouter } from './router'; // <-- Import the router instance

import './styles.css';
const rootElement = document.getElementById('app')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      {/* Provide the router to the application */}
      <RouterProvider router={getRouter()} />
    </React.StrictMode>,
  );
}
