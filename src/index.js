// index.js_ը ներսում պահում է App.js_ին, որը ներսում կկուտակի ամբողջ պռոյեկտնին;
// HTML_ային տեգեր չենք նշում;
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// render > Պատկերել;