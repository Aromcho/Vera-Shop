import React from 'react';
import ReactDOM from 'react-dom/client';
import  render  from 'react-dom'
import App from './App.jsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';


const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const onRedirectCallback = (appState) => {
  // Redirigir a la ubicación guardada en appState o a la raíz
  window.location.replace(appState?.returnTo || window.location.pathname);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin} onRedirectCallback={onRedirectCallback}>
      <App />
    </Auth0Provider>
</React.StrictMode>,
);