import './style.css';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { useTheme } from '../../contexts/themeContext';

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      id="theme"
      className="theme-btn btn"
      onClick={toggleTheme}
    >
      {theme === 'dark' ? (
        <LightModeIcon style={{ color: 'yellow' }} />
      ) : (
        <DarkModeIcon style={{ color: '#000' }} />
      )}
    </button>
  );
}

export default ThemeSwitcher;
