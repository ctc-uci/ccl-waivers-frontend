import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

const ProtectedRoute = ({ component, path }) => {
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
    <Route exact path={path} component={component} />
  ) : (
    window.location.replace(signinEndpoint)
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.element.isRequired,
  path: PropTypes.string.isRequired,
};

export default ProtectedRoute;
