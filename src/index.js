import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HashRouter>
    <App />
  </HashRouter>
)

if ('serviceWorker' in navigator && process.env.NODE_ENV === "production") {
        window.addEventListener('load', async () => {
          try {
            // Use process.env.PUBLIC_URL to resolve the correct path
            const publicUrl = process.env.PUBLIC_URL || '';
            const reg = await navigator.serviceWorker.register(`${publicUrl}/serviceworker.js`);
            console.log('Service Worker Registered:', reg.scope);
          } catch (err) {
            console.error('Service Worker Registration Failed:', err);
          }
        });
      }
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
