import { NavLink } from "react-router-dom";
import { useRef, useState, useEffect, useContext } from "react";
import { useViewport } from "react-viewport-hooks";
import { QuantityContext } from "./Context/ContextProvider";
import { AuthContext } from "./Context/ContextProvider";
import { LogOut } from "./routers/LogOut";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export function Header() {
  const { vw } = useViewport();
  const { cartCount } = useContext(QuantityContext);
  const { email } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    if (vw <= 500) {
      // Add more responsive styling if needed for mobile
    }
  }, [vw]);

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <span className="shopText">ShopRyt</span>
            </NavLink>
          </Typography>

          {/* Cart Icon with Badge */}
          <IconButton
            component={NavLink}
            to="/cart"
            color="inherit"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* User Info */}
          <div>
            {email ? (
              <Typography variant="body1" color="inherit" sx={{ mr: 2 }}>
                Welcome, {email}
              </Typography>
            ) : (
              <NavLink
                to="login"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Login
              </NavLink>
            )}
            <LogOut />
          </div>

          {/* Mobile Menu Icon */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMobileMenuToggle}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={mobileMenuOpen}
        onClose={handleMenuClose}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <MenuItem onClick={handleMenuClose}>
          <NavLink to="/" style={{ color: "inherit", textDecoration: "none" }}>
            Home
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <NavLink
            to="/productList"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Shop
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <NavLink
            to="/cart"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Cart
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          {email ? (
            <span>Welcome, {email}</span>
          ) : (
            <NavLink
              to="login"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Login
            </NavLink>
          )}
        </MenuItem>
      </Menu>
    </>
  );
}
