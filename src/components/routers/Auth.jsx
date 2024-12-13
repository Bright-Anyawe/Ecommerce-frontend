import { useState } from "react";
// import { auth } from "../Services/fireBaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import app from "../Services/fireBaseConfig";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {  AuthContext } from "../Context/ContextProvider";
import { useContext } from "react";
import SignUp from "./SignUp";
import { LogOut } from "./LogOut";


export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {auth} = useContext(AuthContext)
  // const googleProvider = new GoogleAuthProvider()
  
  
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    }
     catch (error) {
      console.error("Error signing in:", error);
    }
    setEmail("");
    setPassword("");

  };

  return (
    <>
    <SignUp/>
      {/* <div>
        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password..."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="signIn" onClick={signIn}>
          Sign In
        </button>

        <button onClick={signInWithGoogle}>Sign In With Google</button>
      </div> */}
    </>
  );
};
