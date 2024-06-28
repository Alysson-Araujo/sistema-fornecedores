import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export function PrivateRoutes({ children } : { children: JSX.Element }) {
  const authContext = useContext(AuthContext);
  const signed = authContext?.signed;
  return signed ? children : <Navigate to="/" />;
}
