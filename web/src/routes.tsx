import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
  Outlet,
} from 'react-router-dom';

import { useAuth } from './contexts/authContext';
import Home from './pages/Home';
import Login from './pages/Login';
import api from './services/api';

function Redirect() {
  const { shortUrlID } = useParams();

  async function handler() {
    try {
      const { data } = await api.get(`/${shortUrlID}`);

      window.location.href = data.url;
    } catch (error) {
      window.location.href = '/';
    }
  }

  useEffect(() => {
    handler();
  }, [shortUrlID]);

  return <Outlet />;
}

function PrivatedRoute() {
  const { signed } = useAuth();
  const location = useLocation();

  return signed ? (
    <Home />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

function RoutesContainer() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path=":shortUrlID" element={<Redirect />} />
        <Route path="*" element={<PrivatedRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesContainer;
