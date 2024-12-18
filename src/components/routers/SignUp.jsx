import { useContext, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext, GeneralContext } from "../Context/ContextProvider";
import { useViewport } from "react-viewport-hooks";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export function SignUp() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    repeatPassword,
    setRepeatPassword,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setShowWelcome } = useContext(GeneralContext);
  const { auth } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showRepeatPassword, setShowRepeatPassword] = useState(false); // State for repeat password visibility
  const { vw } = useViewport();

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const signUp = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please fill out all fields.");
      setOpenSnackbar(true);
      return;
    }

    if (password !== repeatPassword) {
      setErrorMessage("Passwords must match in both fields.");
      setOpenSnackbar(true);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up:", userCredential.user);
      setShowWelcome(true);
      localStorage.setItem("email", email);
      localStorage.setItem("showWelcome", "true");

      navigate("/homepage");
    } catch (error) {
      const firebaseErrorMessage =
        error.code === "auth/invalid-email"
          ? "Please enter a valid email address."
          : error.code === "auth/weak-password"
          ? "Password should be at least 6 characters."
          : "Failed to sign up. Please try again.";
      setErrorMessage(firebaseErrorMessage);
      setOpenSnackbar(true);
    }
  };

  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
        height: "70vh",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        padding: vw < 500 ? "1rem" : "2rem",
        maxWidth: vw < 500 ? "330px" : "444px",
        marginInline: vw < 500 && "30px",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", color: "#333", textAlign: "center" }}
      >
        Welcome to trend style & tech accessories
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#555", textAlign: "center", marginBottom: "1rem" }}
      >
        Create a free account
      </Typography>

      <form onSubmit={signUp} style={{ width: "100%" }}>
        <TextField
          label="Email address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={Boolean(errorMessage.includes("email"))}
          helperText={errorMessage.includes("email") ? errorMessage : ""}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={Boolean(errorMessage.includes("Password"))}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                aria-label="toggle password visibility"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
        <TextField
          label="Repeat password"
          type={showRepeatPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          margin="normal"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
          error={Boolean(errorMessage.includes("match"))}
          helperText={errorMessage.includes("match") ? errorMessage : ""}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                edge="end"
                aria-label="toggle password visibility"
              >
                {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            padding: "10px",
            backgroundColor: "#00CFFD",
            color: "#fff",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#00b0e0",
            },
          }}
        >
          Sign up
        </Button>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", marginTop: "1rem", color: "#555" }}
        >
          Already have an account? <NavLink to="/login">Login</NavLink>
        </Typography>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}



export default SignUp;
