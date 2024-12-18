import App from "../App";
import { HomePage } from "./HomePage";
import { Cart } from "./Cart";
import { ProductList } from "./ProductList";
import Login from "./Login";
import SignUp from "./SignUp";
import ErrorPage from "../ErrorPage";
import { AuthWrapper } from "./AuthWrapper";


const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <AuthWrapper>
            <HomePage />
          </AuthWrapper>
        ),
      },
      {
        path: "homePage",
        element: (
          <AuthWrapper>
            <HomePage />
          </AuthWrapper>
        ),
      },

      ,
      {
        path: "productList",
        element: (
          <AuthWrapper>
            <ProductList />
          </AuthWrapper>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "signUp", element: <SignUp /> },
      {
        path: "cart",
        element: (
          <AuthWrapper>
            <Cart />
          </AuthWrapper>
        ),
      },
    ],
  },
];

export default routes;
