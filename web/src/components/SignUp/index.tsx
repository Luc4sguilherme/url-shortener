import './style.css';

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/authContext';
import { useError } from '../../contexts/errorContext';

function SignUp() {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setError, clearError } = useError();
  const navigate = useNavigate();

  function clearInput() {
    setName('');
    setEmail('');
    setPassword('');
  }

  function handleSignUp() {
    if (name.trim().length === 0) {
      clearInput();
      return;
    }

    if (email.trim().length === 0) {
      clearInput();
      return;
    }

    if (password.trim().length === 0) {
      clearInput();
      return;
    }

    signUp({
      name,
      email,
      password,
    })
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
      <div className="signup-form">
        <div className="signup-form-group">
          <input
            type="text"
            name="name"
            id="name"
            onChange={event => {
              setName(event.target.value);
            }}
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="signup-form-group">
          <input
            type="email"
            name="email"
            id="email"
            onChange={event => {
              setEmail(event.target.value);
            }}
            placeholder="E-mail"
            value={email}
          />
        </div>
        <div className="signup-form-group">
          <input
            type="password"
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
      <button type="button" className="signup-btn" onClick={handleSignUp}>
        Sign Up
      </button>
    </>
  );
}

export default SignUp;
