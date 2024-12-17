import { signOut } from "firebase/auth";
import { AuthContext } from "../Context/ContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material"; // Import MUI Button

export const LogOut = () => {
  const { auth,email, setEmail, setPassword, setRepeatPassword } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setEmail("");
      setPassword("");
      setRepeatPassword("");
            localStorage.removeItem("email", email);
            localStorage.removeItem("showWelcome");

      navigate("/signUp");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleSignOut}
      sx={{
        padding: "0.5rem 1rem",
        fontSize: "1rem",
        textTransform: "none",
        borderRadius: "8px",
        minWidth: "102px",
      }}
    >
      Log Out
    </Button>
  );
};
