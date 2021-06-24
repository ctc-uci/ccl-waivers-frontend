import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../loadingSpinner/spinner';
import config from '../../../config';

const verifyEndpoint = `${config.apiUrl}/auth/verify`;
const signinEndpoint = `${config.apiUrl}/auth/signin`;

const verifyToken = async () => {
  try {
    const res = await axios.get(verifyEndpoint, { withCredentials: true });
    console.log(res);
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      return false;
    }
    // TODO: redirect to error page
  }
  return true;
};

const ProtectedRoute = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const verified = await verifyToken();
      console.log(verified);
      setIsAuthenticated(true); // temp: change to verified
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  if (isAuthenticated) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Route {...props} />;
  }
  window.location.replace(signinEndpoint);
  return <Spinner />;
};

export default ProtectedRoute;
