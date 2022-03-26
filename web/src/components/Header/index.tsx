import './style.css';

import axios from 'axios';
import { useState } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';

import { useAuth } from '../../contexts/authContext';
import { useError } from '../../contexts/errorContext';
import api from '../../services/api';
import ThemeSwitcher from '../ThemeSwitcher';

interface URL {
  full: string;
  user_id: string;
  short: string;
  clicks: number;
}

type HeaderProps = {
  urls: URL[];
  setUrls: React.Dispatch<React.SetStateAction<URL[]>>;
};

function Header({ setUrls, urls }: HeaderProps) {
  const { signOut } = useAuth();
  const [url, setUrl] = useState('');
  const { setError } = useError();

  async function shortenUrl(fullUrl: string) {
    try {
      const response = await api.post('/shorten', {
        fullUrl,
      });

      if (!urls.find(item => item.full === fullUrl)) {
        setUrls(oldValue => [...oldValue, response.data]);
      }

      setUrl('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setError('Invalid link format');
        } else if (error.response?.status === 500) {
          setError('There was an error shortening the link');
        }
      } else if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <nav className="nav">
      <div className="controls-wrapper">
        <div className="logo">
          <a href="/">URL Shortener</a>
        </div>

        <ThemeSwitcher />

        <div className="logged-wrapper">
          <button type="button" className="logout-btn" onClick={signOut}>
            <LogoutIcon />
          </button>
        </div>
      </div>

      <div className="form-wrapper">
        <form>
          <input
            type="url"
            name="fullUrl"
            id="fullUrl"
            placeholder="Enter the link here"
            value={url}
            onChange={event => setUrl(event.target.value)}
          />

          <button
            type="submit"
            onClick={event => {
              event.preventDefault();
              shortenUrl(url);
            }}
          >
            Shorten URL
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Header;
