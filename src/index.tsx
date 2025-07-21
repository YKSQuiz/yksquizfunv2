import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Performance monitoring
if (process.env.NODE_ENV === 'production') {
  const reportWebVitals = (onPerfEntry: any) => {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  };
  
  reportWebVitals(console.log);
}

// Service Worker Registration
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
