import { useEffect, useContext, useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import {
  TextField,
  Button,
  Typography,
  Box,
  Link,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { AuthContext, GeneralContext } from "../Context/ContextProvider";
import { useViewport } from "react-viewport-hooks";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const { email, password, setEmail, setPassword, error, setError, app } =
    useContext(AuthContext);
  const { setShowWelcome } = useContext(GeneralContext);
  const navigate = useNavigate();

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const { vw } = useViewport();

  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  useEffect(() => {
    if (auth?.currentUser) {
      const userEmail = auth.currentUser.email || "";
      setEmail(userEmail);
    }
  }, [auth?.currentUser, setEmail]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      localStorage.setItem("email", email);
      localStorage.setItem("showWelcome", "true");

      navigate("/homepage");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError("Failed to sign in with Google. Please try again.");
    }
    setShowWelcome(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!navigator.onLine) {
      setError(
        "No internet connection. Please check your network and try again."
      );
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("email", email);
      localStorage.setItem("showWelcome", "true");

      navigate("/homepage");
    } catch (error) {
      console.error("Error signing in with email and password:", error);
      setError("Failed to log in. Please try again.");
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      setError("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setError("Password reset email sent! Please check your inbox.");
      setIsResetPassword(false);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setError("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: vw < 500 ? "20vh" : "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          boxSizing: "border-box",
          margin: "20px",
          maxWidth: 360,
          padding: 4,
          borderRadius: 3,
          backgroundColor: "#1c1c28",
          color: "#fff",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}

        <form
          style={{ marginTop: "1rem" }}
          onSubmit={isResetPassword ? handlePasswordReset : handleLogin}
        >
          {isResetPassword ? (
            <>
              <TextField
                label="Enter your email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={resetEmail || ""}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#bbb" } }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  mb: 2,
                  backgroundColor: "#9b7efc",
                  color: "#ffff",
                  textTransform: "none",
                  fontSize: "16px",
                  "&:hover": { backgroundColor: "#7a5ef8" },
                }}
              >
                Send Reset Link
              </Button>
              <Link
                href="#"
                onClick={() => setIsResetPassword(false)}
                sx={{
                  display: "block",
                  textAlign: "center",
                  color: "#9c9c9c",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  mt: 1,
                }}
              >
                Back to Login
              </Link>
            </>
          ) : (
            <>
              <TextField
                label="User Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#bbb" } }}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                margin="normal"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  style: { color: "#ffff" },
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label="toggle password visibility"
                      sx={{ color: "white" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                InputLabelProps={{ style: { color: "#bbb" } }}
              />
              <Link
                href="#"
                onClick={() => setIsResetPassword(true)}
                sx={{
                  display: "block",
                  textAlign: "left",
                  color: "#9c9c9c",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  mt: 1,
                  mb: 2,
                }}
              >
                Forgot password?
              </Link>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  mb: 2,
                  backgroundColor: "#9b7efc",
                  color: "#ffff",
                  textTransform: "none",
                  fontSize: "16px",
                  "&:hover": {
                    backgroundColor: "#7a5ef8",
                  },
                }}
              >
                Sign in
              </Button>
            </>
          )}
        </form>

        <Typography align="center" sx={{ color: "#bbb", mt: 2, mb: 1 }}>
          Login with social accounts
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mt: 2,
          }}
        >
          <Button
            onClick={signInWithGoogle}
            variant="contained"
            sx={{
              minWidth: 48,
              height: 48,
              backgroundColor: "#333",
              color: "#fff",
              borderRadius: "50%",
              padding: 0,
              "&:hover": {
                backgroundColor: "#444",
              },
            }}
          >
            <Typography variant="h6">G</Typography>
          </Button>
          <Button
            variant="contained"
            sx={{
              minWidth: 48,
              height: 48,
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: "50%",
              padding: 0,
              "&:hover": {
                backgroundColor: "#111",
              },
            }}
          >
            <Typography variant="h6">X</Typography>
          </Button>
        </Box>

        <Typography
          align="center"
          sx={{ color: "#bbb", fontSize: "0.875rem", mt: 3 }}
        >
          Don’t have an account?{" "}
          <Link href="signUp" sx={{ color: "#9b7efc" }}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
