import './style.css';

import { useEffect, useState } from 'react';

import Card from '../../components/Card';
import CopyAlert from '../../components/CopyAlert';
import ErrorAlert from '../../components/ErrorAlert';
import Header from '../../components/Header';
import { useAuth } from '../../contexts/authContext';
import { useError } from '../../contexts/errorContext';
import api from '../../services/api';

interface URL {
  full: string;
  user_id: string;
  short: string;
  clicks: number;
}

function Home() {
  const [urls, setUrls] = useState<URL[]>([]);
  const { user } = useAuth();
  const { setError } = useError();

  async function getAllUrls() {
    const response = await api.get<URL[]>('/');

    return response.data;
  }

  useEffect(() => {
    if (api.defaults.headers.common.Authorization) {
      getAllUrls()
        .then(url => {
          setUrls(url);
        })
        .catch(() => {
          setError('There was an error getting the URLs');
        });
    }
  }, [user]);

  return (
    <ErrorAlert>
      <CopyAlert>
        <div className="container">
          <Header urls={urls} setUrls={setUrls} />

          <main className="link-container">
            <div className="link-list">
              {urls.length
                ? urls.map(url => (
                    <Card
                      key={url.full}
                      short={url.short}
                      full={url.full}
                      clicks={url.clicks}
                      urls={urls}
                      setUrls={setUrls}
                    />
                  ))
                : ''}
            </div>
          </main>
        </div>
      </CopyAlert>
    </ErrorAlert>
  );
}

export default Home;
