import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

document.documentElement.removeAttribute('data-theme');
localStorage.removeItem('active_theme_palette');

createRoot(document.getElementById('root')!).render(<App />);
