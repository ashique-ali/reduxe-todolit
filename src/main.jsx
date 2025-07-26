import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import { Store } from './app/reduxe/Store.jsx';
import { Provider } from "react-redux";
import { AuthProvider } from './Auth/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  // <AuthProvider>
    <Provider store={Store}>
      <App />
    </Provider>
  // </AuthProvider>
)
