import PropTypes from "prop-types";

import { useContext } from "react";
import { Navigate } from "react-router-dom"; 
import { AuthContext } from "../Context/ContextProvider";

export function AuthWrapper({ children }) {
  const { isAuthenticated, email } = useContext(AuthContext);

  if (!isAuthenticated || !email) {
    return <Navigate to="/login" />;
  }

  return children;
}

AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired, 
};
