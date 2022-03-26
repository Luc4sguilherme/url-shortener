import './style.css';

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/authContext';
import { useError } from '../../contexts/errorContext';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const { setError, clearError } = useError();
  const navigate = useNavigate();

  function clearInput() {
    setEmail('');
    setPassword('');
  }

  function handleSignIn() {
    if (email.trim().length === 0) {
      clearInput();
      return;
    }

    if (password.trim().length === 0) {
      clearInput();
      return;
    }

    signIn({ email, password })
      .then(() => {
        clearInput();
        clearError();
        navigate('/');
      })
      .catch(error => {
        clearInput();

        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(error.response?.data.error);
          } else {
            setError(error.message);
          }
        } else if (error instanceof Error) {
          setError(error.message);
        }
      });
  }

  return (
    <>
      <div className="signin-form">
        <div className="signin-form-group">
          <input
            type="text"
            name="email"
            id="email"
            onChange={event => {
              setEmail(event.target.value);
            }}
            placeholder="E-mail"
            value={email}
          />
        </div>
        <div className="signin-form-group">
          <input
            type="text"
            name="password"
            id="password"
            onChange={event => {
              setPassword(event.target.value);
            }}
            placeholder="Password"
            value={password}
          />
        </div>
      </div>
      <button type="button" className="signin-btn" onClick={handleSignIn}>
        Sign In
      </button>
    </>
  );
}

export default SignIn;
