import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

const verifyEndpoint = `${config.apiUrl}/auth/verify`;
const signinEndpoint = `${config.apiUrl}/auth/signin`;

const verifyToken = async () => {
  try {
    await axios.get(verifyEndpoint, { withCredentials: true });
  } catch (error) {
    if (error.response.status === 401) {
      console.error(`Error: ${error}`);
      return false;
    }
    // TODO: redirect to error page
    console.log('It broke');
  }
  return true;
};

const ProtectedRoute = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const verified = await verifyToken();
      setIsAuthenticated(verified);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <h1>LOADING...</h1>;
  }
  return isAuthenticated ? (
    /* eslint-disable react/jsx-props-no-spreading */
    <Route {...props} />
  ) : (
    window.location.replace(signinEndpoint)
  );
};

export default ProtectedRoute;
