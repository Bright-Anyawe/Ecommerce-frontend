import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Styles/index.css";
import "./Styles/App.css"
import "./Styles/Cart.css"



import routes from "./components/routers/routes.jsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
