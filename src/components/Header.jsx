import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState, useEffect } from "react";
import { useViewport } from "react-viewport-hooks";
import {
  QuantityContext,
  AuthContext,
  GeneralContext,
} from "./Context/ContextProvider";
import { LogOut } from "./routers/LogOut";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Button,
  Snackbar,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";

export function Header() {
  const { vw } = useViewport();
  const { showWelcome, setShowWelcome } = useContext(GeneralContext);
  const { cartCount } = useContext(QuantityContext);
  const { email, setEmail } = useContext(AuthContext);
  const welcomeRef = useRef(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedShowWelcome = localStorage.getItem("showWelcome");
    const storedEmail = localStorage.getItem("email", email);

    if (storedShowWelcome === "true" && storedEmail) {
      setShowWelcome(true);
      setEmail(storedEmail)
    } else {
      setShowWelcome(false);
            setEmail('');

    }

    if (vw < 500) {
      welcomeRef.current.style.display = "none";
    } else if (vw > 500) {
      welcomeRef.current.style.display = "block";
    }
  }, [vw, setShowWelcome]);

  const handleProductIconClick = (e) => {
    if (!email) {
      setOpenSnackbar(true);
      e.preventDefault();
    }
  };

  // const handleMobileMenuToggle = () => {
  //   setMobileMenuOpen(!mobileMenuOpen);
  // };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 1fr",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            gap: "15px",
          }}
        >
          <Box>
            <Typography variant="h6" component="div" sx={{ textAlign: "left" }}>
              <NavLink
                to="/"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <span className="shopText">ShopRyt</span>
              </NavLink>
            </Typography>
          </Box>
          {
            <Box
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
              ref={welcomeRef}
            >
              {showWelcome && email && (
                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                    bgcolor: "secondary.main",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                  }}
                >
                  {console.log(email)}
                  Welcome,🤗🤗 {email}
                </Typography>
              )}
            </Box>
          }

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <IconButton
              component={NavLink}
              to="/productList"
              color="inherit"
              sx={{ marginRight: "1rem" }}
              onClick={handleProductIconClick}
            >
              <CategoryIcon />
            </IconButton>

            <IconButton
              component={NavLink}
              to="/cart"
              color="inherit"
              sx={{ marginRight: "1rem" }}
            >
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {email ? (
              <LogOut />
            ) : (
              <Button
                component={NavLink}
                to="/login"
                variant="outlined"
                color="inherit"
                onClick={() => setShowWelcome(false)}
              >
                Login
              </Button>
            )}
          </Box>
        </Box>
      </Toolbar>

      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message="Please sign in or sign up before viewing products"
        autoHideDuration={3000}
        severity="warning"
      />
    </AppBar>
  );
}
