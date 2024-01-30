import React, { useState, useEffect } from 'react';
//import Dashboard from '../Dashboard/dashboard';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [action, setAction] = useState('Login');
  const [error, setError] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Check for login status on component mount
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus) {
      setLoggedIn(true);
    }
  }, []);

  const handleLoginClick = () => {
    // Make a POST request to the login API endpoint
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          // Registration or login successful
          setLoggedIn(true);
          onLoginSuccess();
          // Store login status in localStorage
          localStorage.setItem('isLoggedIn', true);
        }
      })
      .catch((error) => {
        console.error('Error during login/registration:', error);
        setError('An error occurred during login/registration');
      });
  };

  // Redirect to login page with login URL if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      // Assuming your login route is '/login'
      window.history.pushState( null,  null, 'dashboard');
       // window.location.href = '/login';
    }
  }, [isLoggedIn]);

  
 

  return (
    <div className='wrapper'>
      <div className='container'>
        <div className='login-header'>
          <h2>{action}</h2>
        </div>

        <form>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
            />
          </div>

          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
            />
          </div>

          {error && <div className='error'>{error}</div>}

          <div className='submit-container'>
           <button
              type='button'
              className={action === 'dashboard' ? 'submit gray' : 'submit'}
              onClick={() => {
                setAction('Login'); // This line was previously incorrect
                setError(''); // Clear previous error
                handleLoginClick();
              }}
>
  {action}
</button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
