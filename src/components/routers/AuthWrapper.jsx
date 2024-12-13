
import { AuthContext } from "../Context/ContextProvider";
import { useContext } from "react";
import { HomePage } from "./HomePage";
import { Auth } from "./Auth";

export function AuthWrapper() {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <HomePage />;
  }

  return <Auth />;
}
