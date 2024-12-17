import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const ErrorPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        bgcolor: "#f5f5f5",
        padding: "2rem",
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ color: "#d32f2f" }}>
        Oh no! This route doesn&apos;t exist!
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "2rem", color: "#555" }}>
        The page you&apos;re looking for couldn&apos;t be found.
      </Typography>
      <Button
        component={Link}
        to="homePage"
        variant="contained"
        color="primary"
        sx={{ textTransform: "none" }}
      >
        Go Back to Home Page
      </Button>
    </Box>
  );
};

export default ErrorPage;
