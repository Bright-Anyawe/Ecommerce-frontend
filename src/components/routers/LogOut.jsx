import { signOut } from "firebase/auth";
import { AuthContext } from "../Context/ContextProvider";
import { useContext } from "react";

export const LogOut = () => {
  const { auth, setEmail } = useContext(AuthContext);


   const handleSignOut = async () => {
     try {
       await signOut(auth);
       setEmail(""); 
     } catch (error) {
       console.error("Error signing out:", error);
     }
   };
  return (
    <>
      <div>
        <button className="logOut" onClick={handleSignOut}>
          LogOut
        </button>
      </div>{" "}
    </>
  );
};
