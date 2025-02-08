
import { useContext } from "react";
import { signInWithPopup } from "firebase/auth";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { AuthContext, GeneralContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";

function Login() {
  const { setError, app } = useContext(AuthContext);
  const { setShowWelcome } = useContext(GeneralContext);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("email", result.user.email);
      localStorage.setItem("showWelcome", "true");
      setShowWelcome(true); 
      navigate("/homepage");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError("Failed to sign in. Try again.");
    }
    setLoading(false);
  };

  

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
        color: "#fff",
      }}
    >
      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          backgroundColor: "#1c1c1c",
          boxShadow: "0 4px 20px rgba(255, 255, 255, 0.1)",
          maxWidth: 400,
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Welcome Back
        </Typography>
        <Typography variant="body2" color="gray" gutterBottom>
          Sign in with your Google account
        </Typography>
        <Button
          onClick={signInWithGoogle}
          variant="contained"
          sx={{
            mt: 3,
            px: 4,
            py: 1.5,
            backgroundColor: "#4285F4",
            color: "#fff",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            gap: 1,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#357ae8",
            },
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : <GoogleIcon />} 
          {loading ? "Signing in..." : "Sign in with Google"}
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
