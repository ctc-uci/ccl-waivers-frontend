import React, { useEffect, useState } from 'react';
import './Logout.css';

const Logout = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('access_token='))) {
      setMessage('Logging out...');
      document.cookie = 'access_token=; max-age=0';
      setMessage('You have been logged out successfully.');
    } else {
      setMessage('You are not logged in.');
    }
  }, []);

  return (

    <div className="logged-out">
      {message}

      <div className="login-link">
        <a href="/">Login</a>
      </div>
    </div>
  );
};

export default Logout;
