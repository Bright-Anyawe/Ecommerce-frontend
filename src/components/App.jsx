import { initializeApp } from "firebase/app";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { QuantityContext } from "./Context/ContextProvider";
import { GeneralContext } from "./Context/ContextProvider";
import { AuthContext } from "./Context/ContextProvider";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const stripePromise = loadStripe(
  "pk_test_51QUlnZ1lUK5qdTQt8kqBLg6243PNUKkrSBALeBOX5bHYIZ9nbO1sEG61JA8xorR9TYIbdPfZbJA48PDKhEaVf9q200XlXu9gYb"
);

function App() {
  const [storageProduct, setStorageProduct] = useState();
  const [fetchedData, setFetchedData] = useState();
  const [loginData, setLoginData] = useState();
  const [registerUser, setRegisterUser] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [error, setError] = useState("");
  const [items, setItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [inputQuantity, setInputQuantity] = useState({});
  const [qtySummery, setQtySummery] = useState([]);
  const [qtySummeryObject, setQuantitySummeryObject] = useState({
    productUrl: "",
    productTitle: "",
    productPrice: "",
    QtySelected: "",
    qtySubTotal: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const storedCartCount = localStorage.getItem("cartCount");
    const storedQtySummery = JSON.parse(localStorage.getItem("qtySummery"));
    const storedInputQuantity = JSON.parse(
      localStorage.getItem("inputQuantity")
    );

    if (storedCartCount) {
      setCartCount(Number(storedCartCount));
    }
    if (storedQtySummery) {
      setQtySummery(storedQtySummery);
    }
    if (storedInputQuantity) {
      setInputQuantity(storedInputQuantity);
    }
  }, []);

  const firebaseConfig = {
    apiKey: "AIzaSyCwKsZHIYpZ7Z-i7akMIATKAF5ISmc5dVk",
    authDomain: "ecommerce-2d416.firebaseapp.com",
    projectId: "ecommerce-2d416",
    storageBucket: "ecommerce-2d416.firebasestorage.app",
    messagingSenderId: "206257658106",
    appId: "1:206257658106:web:bbc140bf448ab826f71143",
    measurementId: "G-B8XHERL3JH",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setEmail(user.email);
      } else {
        setIsAuthenticated(false);
        setEmail("");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Elements stripe={stripePromise}>
        <div className="rootLayout">
          <GeneralContext.Provider
            value={{
              storageProduct,
              setStorageProduct,
              fetchedData,
              setFetchedData,
              loginData,
              setLoginData,
              registerUser,
              setRegisterUser,
              db,
              items,
              setItems,
              showWelcome,
              setShowWelcome,
            }}
          >
            <QuantityContext.Provider
              value={{
                cartCount,
                setCartCount,
                inputQuantity,
                setInputQuantity,
                qtySummery,
                setQtySummery,
                qtySummeryObject,
                setQuantitySummeryObject,
              }}
            >
              <AuthContext.Provider
                value={{
                  username,
                  setUsername,
                  email,
                  setEmail,
                  password,
                  setPassword,
                  error,
                  setError,
                  app,
                  auth,
                  isAuthenticated,
                  setIsAuthenticated,
                  repeatPassword,
                  setRepeatPassword,
                }}
              >
                <Header />
                <main>
                  <Outlet />
                </main>
              </AuthContext.Provider>
            </QuantityContext.Provider>
          </GeneralContext.Provider>
        </div>
      </Elements>
    </>
  );
}

export default App;
