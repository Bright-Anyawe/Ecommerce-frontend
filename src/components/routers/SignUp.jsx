import { useContext, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../Context/ContextProvider";

export function SignUp() {
  const { email, password, setEmail, setPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
      navigate("/homepage");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
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
      maxWidth="xs"
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
        padding: "2rem",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", color: "#333", textAlign: "center" }}
      >
        Welcome to our app
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
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={Boolean(errorMessage.includes("Password"))}
        />
        <TextField
          label="Repeat password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
          error={Boolean(errorMessage.includes("match"))}
          helperText={errorMessage.includes("match") ? errorMessage : ""}
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
