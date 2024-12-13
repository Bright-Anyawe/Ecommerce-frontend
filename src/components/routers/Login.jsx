import { useEffect, useContext } from "react";
import { signInWithPopup } from "firebase/auth";
import { TextField, Button, Typography, Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../Context/ContextProvider";

function Login() {
  const { email, password, setEmail, setPassword, error, app } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    if (auth?.currentUser) {
      const userEmail = auth.currentUser.email || "";
      setEmail(userEmail);
    }
  }, [auth?.currentUser, setEmail]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/homepage");
    } catch (error) {
      console.error("Error signing in:", error);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgb(177, 171, 133)",
      }}
    >
      <Box
        sx={{
          width: 360,
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
        <form style={{ marginTop: "1rem" }}>
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
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{ style: { color: "#fff" } }}
            InputLabelProps={{ style: { color: "#bbb" } }}
          />
          <Link
            href="#"
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
            Forget password
          </Link>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              mb: 2,
              backgroundColor: "#9b7efc",
              color: "#fff",
              textTransform: "none",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#7a5ef8",
              },
            }}
          >
            Sign in
          </Button>
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
          {/* <Button
            onClick={signInWithGoogle}
            variant="contained"
            sx={{
              minWidth: 48,
              height: 48,
              backgroundColor: "#4285F4",
              color: "#fff",
              borderRadius: "50%",
              padding: 0,
              "&:hover": {
                backgroundColor: "#357ae8",
              },
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google logo"
              style={{ width: "24px", height: "24px" }}
            />
          </Button> */}
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
